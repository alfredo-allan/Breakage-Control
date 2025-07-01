"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Quagga from "quagga";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import { registerLocale } from "react-datepicker";
import { getPromotorLogado } from "@/components/LoginForm/api";
import ResponseModal from "@/components/ResponseModal/ResponseModal";
import { enviarDadosCriticos } from "./api";


registerLocale("pt-BR", ptBR);

type Produto = {
    codigoEAN: string;
    descricao: string;
};

type Cliente = {
    nome: string;
    endereco: {
        rua: string;
        bairro: string;
        cidade: string;
        estado: string;
    };
    produtos: Produto[];
};

export default function ReportExchanges() {
    const [nomeCliente, setNomeCliente] = useState("");
    const [endereco, setEndereco] = useState("");
    const [ean, setEan] = useState("");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState<Date | null>(new Date());
    const [quantidade, setQuantidade] = useState("");
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [scannerVisible, setScannerVisible] = useState(false);
    const [promotor, setPromotor] = useState<{ nome: string; promotor_id: number } | null>(null);
    const [clienteSelecionado, setClienteSelecionado] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState<"success" | "error">("success");
    const [tipoQuantidade, setTipoQuantidade] = useState<"unidade" | "caixa">("unidade");

    const scannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("/data/frutap.json")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.mercados)) {
                    setClientes(data.mercados);
                } else {
                    console.error("Formato inválido:", data);
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        const logado = getPromotorLogado();
        setPromotor(logado);
    }, []);

    useEffect(() => {
        if (!scannerVisible || !scannerRef.current) return;

        // Verifica se está rodando no browser e se getUserMedia está disponível
        if (typeof window === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error("getUserMedia não disponível neste ambiente");
            setScannerVisible(false);
            return;
        }

        Quagga.init(
            {
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: scannerRef.current,
                    constraints: {
                        facingMode: "environment",
                    },
                },
                decoder: {
                    readers: ["ean_reader"],
                },
            },
            (err: Error | null) => {
                if (err) {
                    console.error(err);
                    setScannerVisible(false);
                    return;
                }
                Quagga.start();
            }
        );

        const onDetected = (result: { codeResult: { code: string } }) => {
            const code = result.codeResult.code;
            setEan(code);
            const produto = clientes.flatMap((c) => c.produtos).find((p) => p.codigoEAN === code);
            if (produto) setDescricao(produto.descricao);
            setScannerVisible(false);
            Quagga.stop();
        };

        Quagga.onDetected(onDetected);

        return () => {
            Quagga.offDetected(onDetected);
            Quagga.stop();
        };

        Quagga.onDetected(onDetected);

        return () => {
            Quagga.offDetected(onDetected);
            Quagga.stop();
        };
    }, [scannerVisible, clientes]);

    const clientesFiltrados = useMemo(() => {
        if (!nomeCliente.trim() || clienteSelecionado) return [];

        const termo = nomeCliente.trim().toLowerCase();
        return clientes.filter((cliente) => cliente.nome.toLowerCase().includes(termo)).slice(0, 5);
    }, [nomeCliente, clientes, clienteSelecionado]);

    const handleClienteSelect = (cliente: Cliente) => {
        setNomeCliente(cliente.nome);
        setEndereco(
            `${cliente.endereco.rua}, ${cliente.endereco.bairro} - ${cliente.endereco.cidade}/${cliente.endereco.estado}`
        );
        setClienteSelecionado(true);
    };

    const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomeCliente(e.target.value);
        setClienteSelecionado(false);
        setEndereco("");
    };

    const handleScannerOpen = () => {
        setScannerVisible(true);
    };

    // Adicionei busca no input do EAN para preencher descrição automaticamente
    const handleEanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const codigo = e.target.value;
        setEan(codigo);

        const produto = clientes.flatMap((c) => c.produtos).find((p) => p.codigoEAN.trim() === codigo.trim());

        if (produto) {
            setDescricao(produto.descricao);
        } else {
            setDescricao("");
        }
    };

    const handleSubmit = async () => {
        const payload = {
            nomePromotor: promotor?.nome ?? "Desconhecido",
            nomeCliente,
            enderecoCliente: endereco,
            ean,
            descricaoProduto: descricao,
            dataVencimento: data?.toISOString().split("T")[0] ?? "",
            quantidadeProdutos: parseInt(quantidade),
            tipoQuantidade, // novo campo
        };

        try {
            const result = await enviarDadosCriticos(payload);

            setModalType("success");
            setModalMessage(result?.mensagem ?? "Dados salvos com sucesso!");
            setModalOpen(true);
        } catch (err: unknown) {
            let errorMessage = "Erro ao enviar os dados. Tente novamente.";

            if (err instanceof Error) {
                errorMessage = err.message;
            }

            setModalType("error");
            setModalMessage(errorMessage);
            setModalOpen(true);
        }
    };


    return (
        <div className="p-4 space-y-4 max-w-xl mx-auto">
            <h1 className="location-title">Reportar Trocas (Diárias)</h1>
            <div>
                Promotor: <strong>{promotor?.nome ?? "Carregando..."}</strong>
            </div>

            <div className="relative">
                <input
                    type="text"
                    placeholder="Nome do Cliente"
                    value={nomeCliente}
                    onChange={handleNomeChange}
                    className="p-2 border w-full"
                />

                {clientesFiltrados.length > 0 && (
                    <div className="absolute z-10 bg-white border w-full max-h-48 overflow-y-auto shadow-md rounded">
                        {clientesFiltrados.map((cliente, i) => (
                            <div
                                key={i}
                                onClick={() => handleClienteSelect(cliente)}
                                className="cursor-pointer hover:bg-gray-100 p-2"
                            >
                                {cliente.nome}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <input type="text" placeholder="Endereço" value={endereco} readOnly className="p-2 border w-full" />

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Código EAN"
                    value={ean}
                    onChange={handleEanChange}
                    className="p-2 border w-full"
                />
                <button onClick={handleScannerOpen} className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded">
                    Ler Código
                </button>
            </div>

            {scannerVisible && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
                        <div ref={scannerRef} className="w-full h-64 border rounded" />
                        <button
                            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
                            onClick={() => setScannerVisible(false)}
                        >
                            Fechar Câmera
                        </button>
                    </div>
                </div>
            )}

            <input type="text" placeholder="Descrição" value={descricao} readOnly className="p-2 border w-full" />

            <DatePicker
                selected={data}
                onChange={(date) => setData(date)}
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
                placeholderText="Selecionar Data"
                className="p-2 border w-full"
            />

            <input
                type="text"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="p-2 border w-full"
            />
            <select
                value={tipoQuantidade}
                onChange={(e) => setTipoQuantidade(e.target.value as "unidade" | "caixa")}
                className="p-2 border"
            >
                <option value="unidade">Unidade</option>
                <option value="caixa">Caixa</option>
            </select>

            <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
            >
                Salvar Dados
            </button>

            <ResponseModal
                isOpen={modalOpen}
                type={modalType}
                message={modalMessage}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}
