"use client";

import { useEffect, useMemo, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import { registerLocale } from "react-datepicker";
import { getPromotorLogado } from "@/components/LoginForm/api";
import { isMobile } from "react-device-detect";

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

export default function CriticalDate() {
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

    // Carrega clientes do JSON
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

    // Lê promotor logado
    useEffect(() => {
        const logado = getPromotorLogado();
        setPromotor(logado);
    }, []);

    // Scanner de QRCode (mobile only)
    useEffect(() => {
        if (!scannerVisible || !isMobile) return;

        const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);

        scanner.render(
            (decodedText: string) => {
                setEan(decodedText);
                const produto = clientes.flatMap((c) => c.produtos).find((p) => p.codigoEAN === decodedText);
                if (produto) setDescricao(produto.descricao);
                scanner.clear().then(() => setScannerVisible(false));
            },
            (error) => {
                console.warn("Erro na leitura:", error);
            }
        );

        return () => {
            scanner.clear().catch(() => { });
        };
    }, [scannerVisible, clientes]);

    const clientesFiltrados = useMemo(() => {
        if (!nomeCliente.trim() || clienteSelecionado) return [];

        const termo = nomeCliente.trim().toLowerCase();
        return clientes.filter((cliente) => cliente.nome.toLowerCase().includes(termo)).slice(0, 5);
    }, [nomeCliente, clientes, clienteSelecionado]);

    const handleClienteSelect = (cliente: Cliente) => {
        setNomeCliente(cliente.nome);
        setEndereco(`${cliente.endereco.rua}, ${cliente.endereco.bairro} - ${cliente.endereco.cidade}/${cliente.endereco.estado}`);
        setClienteSelecionado(true);
    };

    const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomeCliente(e.target.value);
        setClienteSelecionado(false);
        setEndereco("");
    };

    const handleScannerOpen = () => {
        if (!isMobile) {
            alert("O leitor de QRCode só está disponível em dispositivos móveis.");
            return;
        }
        setScannerVisible(true);
    };

    const handleSubmit = () => {
        const payload = {
            promotor: promotor?.nome ?? "Desconhecido",
            cliente: nomeCliente,
            endereco,
            ean,
            descricao,
            data: data?.toISOString().split("T")[0],
            quantidade,
        };

        console.log("Enviando dados:", payload);

        fetch("/api/salvar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    };

    return (
        <div className="p-4 space-y-4 max-w-xl mx-auto">
            <div>Promotor: <strong>{promotor?.nome ?? "Carregando..."}</strong></div>

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

            <input
                type="text"
                placeholder="Endereço"
                value={endereco}
                readOnly
                className="p-2 border w-full"
            />

            <input
                type="text"
                placeholder="Código EAN"
                value={ean}
                onClick={handleScannerOpen}
                readOnly
                className="p-2 border w-full cursor-pointer"
            />

            {scannerVisible && isMobile && (
                <div id="reader" className="w-full h-64 border rounded" />
            )}

            <input
                type="text"
                placeholder="Descrição"
                value={descricao}
                readOnly
                className="p-2 border w-full"
            />

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

            <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
            >
                Salvar Dados
            </button>
        </div>
    );
}
