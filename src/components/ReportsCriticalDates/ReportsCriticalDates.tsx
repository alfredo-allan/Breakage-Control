// components/ReportsCriticalDates.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const ReportsCriticalDates = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const fetchRelatorio = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/relatorios/geral");
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
            }
        };

        fetchRelatorio();
    }, []);

    if (erro) return <p className="text-red-600">{erro}</p>;

    return (
        <div className="p-8">
            <h2 className="text-xl font-bold mb-2">Relatório Geral</h2>
            {imageSrc ? (
                <div className="relative w-full max-w-3xl h-[500px]">
                    <Image
                        src={imageSrc}
                        alt="Relatório de Registros"
                        fill
                        className="object-contain rounded shadow"
                        priority
                    />
                </div>
            ) : (
                <p>Carregando gráfico...</p>
            )}
        </div>
    );
};

export default ReportsCriticalDates;
