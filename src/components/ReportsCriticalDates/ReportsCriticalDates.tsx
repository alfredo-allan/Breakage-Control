"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import styles from "./ReportsCriticalDates.module.css";

type Cliente = {
    nome: string;
    endereco: {
        rua: string;
        bairro: string;
        cidade: string;
        estado: string;
    };
};

interface Registro {
    id: number;
    nomePromotor: string;
    nomeCliente: string;
    enderecoCliente: string;
    ean: string;
    descricaoProduto: string;
    dataVencimento: string;
    quantidadeProdutos: number;
    dataCriacao: string;
}

const ReportsCriticalDates = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState<boolean>(true);

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [nomeCliente, setNomeCliente] = useState("");
    const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
    const [clienteSelecionado, setClienteSelecionado] = useState(false);
    const [registros, setRegistros] = useState<Registro[]>([]);
    const [carregandoRegistros, setCarregandoRegistros] = useState(false);
    const [erroRegistros, setErroRegistros] = useState<string | null>(null);

    // Carrega gráfico ao iniciar
    const fetchRelatorio = async () => {
        setCarregando(true);
        setErro(null);
        try {
            const response = await fetch("http://127.0.0.1:5000/relatorios/geral", {
                cache: "no-store",
            });

            if (!response.ok) throw new Error("Erro ao buscar relatório");

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setImageSrc(imageUrl);
        } catch (err) {
            if (err instanceof Error) {
                setErro(err.message);
            } else {
                setErro("Erro desconhecido");
            }
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        fetchRelatorio();
    }, []);

    // Carrega lista de clientes do JSON
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

    const clientesFiltrados = useMemo(() => {
        if (!nomeCliente.trim() || clienteSelecionado) return [];
        const termo = nomeCliente.toLowerCase();
        return clientes
            .filter((cliente) => cliente.nome.toLowerCase().includes(termo))
            .slice(0, 5);
    }, [nomeCliente, clientes, clienteSelecionado]);

    const handleClienteSelect = (cliente: Cliente) => {
        const enderecoFormatado = `${cliente.endereco.rua}, ${cliente.endereco.bairro} - ${cliente.endereco.cidade}/${cliente.endereco.estado}`;
        setNomeCliente(cliente.nome);
        setEnderecoSelecionado(enderecoFormatado); // Aqui atualiza corretamente
        setClienteSelecionado(true);
        buscarRegistros(enderecoFormatado); // Faz a busca automaticamente
    };


    const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomeCliente(e.target.value);
        setClienteSelecionado(false);
    };

    const formatarData = (dataStr: string): string => {
        const data = new Date(dataStr);
        const dia = String(data.getDate()).padStart(2, "0");
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const buscarRegistros = async (enderecoCliente: string) => {
        setCarregandoRegistros(true);
        setErroRegistros(null);
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/dados/filtro/endereco?enderecoCliente=${encodeURIComponent(enderecoCliente)}`
            );
            if (!response.ok) throw new Error("Erro ao buscar registros.");
            const data = await response.json();
            setRegistros(data);
        } catch (err) {
            if (err instanceof Error) {
                setErroRegistros(err.message);
            } else {
                setErroRegistros("Erro desconhecido.");
            }
        } finally {
            setCarregandoRegistros(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Relatório Geral</h2>

            {erro && <p className={styles.error}>{erro}</p>}

            {carregando ? (
                <p className={styles.loading}>Carregando gráfico...</p>
            ) : (
                imageSrc && (
                    <div className={styles.imageWrapper}>
                        <Image
                            src={imageSrc}
                            alt="Relatório de Registros"
                            layout="fill"
                            className={styles.image}
                            priority
                        />
                    </div>
                )
            )}

            <div className={styles.actions}>
                <button onClick={fetchRelatorio} className={styles.reloadButton}>
                    🔄 Atualizar Gráfico
                </button>
                <a
                    href="http://127.0.0.1:5000/relatorios/geral?formato=excel"
                    className={styles.downloadButton}
                    download
                >
                    📥 Baixar Excel
                </a>
            </div>

            {/* Campo de busca por cliente */}
            <div className="mt-6 relative">
                <input
                    type="text"
                    placeholder="Digite o nome do cliente"
                    className="p-2 border w-full"
                    value={nomeCliente}
                    onChange={handleNomeChange}
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

                {enderecoSelecionado && (
                    <input
                        type="text"
                        className="p-2 border w-full mt-2 bg-gray-100 text-gray-600"
                        value={enderecoSelecionado}
                        readOnly
                    />
                )}
            </div>

            {/* Listagem de registros */}
            {carregandoRegistros && (
                <p className="text-blue-500 mt-4">Carregando registros...</p>
            )}
            {erroRegistros && (
                <p className="text-red-500 mt-4">{erroRegistros}</p>
            )}
            {registros.length > 0 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {registros.map((registro) => (
                        <div
                            key={registro.id}
                            className="border p-4 rounded-lg shadow hover:shadow-md transition"
                        >
                            <p><strong>Produto:</strong> {registro.descricaoProduto}</p>
                            <p><strong>EAN:</strong> {registro.ean}</p>
                            <p><strong>Vencimento:</strong> {formatarData(registro.dataVencimento)}</p>                            <p><strong>Qtd:</strong> {registro.quantidadeProdutos}</p>
                            <p><strong>Promotor:</strong> {registro.nomePromotor}</p>
                            <p><strong>Data de criação:</strong> {formatarData(registro.dataCriacao)}</p>                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReportsCriticalDates;
