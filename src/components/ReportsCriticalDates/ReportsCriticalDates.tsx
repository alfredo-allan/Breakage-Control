"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ReportsCriticalDates.module.css";

const ReportsCriticalDates = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState<boolean>(true);

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
        </div>
    );
};

export default ReportsCriticalDates;
