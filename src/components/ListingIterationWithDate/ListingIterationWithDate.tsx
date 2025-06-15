"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ListingIterationWithDate.module.css";
import CriticalDate from "../CriticalDate/CriticalDate"; // ajuste o caminho se necessário
import ReportFaults from "../ReportFaults/ReportFaults";

export default function ListingIterationWithDate() {
    const [showCriticalDate, setShowCriticalDate] = useState(false);
    const [showReportFaults, setShowReportFaults] = useState(false);


    const items = [
        {
            label: "Reportar Datas Críticas",
            image: "/icons/due-date.png",
            onClick: () => setShowCriticalDate(true),
        },
        {
            label: "Reportar Avarias",
            image: "/icons/broken-bottle.png",
            onClick: () => setShowReportFaults(true),

        },
        {
            label: "Reportar Trocas",
            image: "/icons/recycle.png",
            onClick: () => console.log("Trocas"),
        },
        {
            label: "Relatórios",
            image: "/icons/relatorio.png",
            onClick: () => console.log("Relatórios"),
        },
    ];

    if (showCriticalDate) {
        return (
            <div className="p-4">
                <button
                    onClick={() => setShowCriticalDate(false)}
                    className="mb-4 text-blue-600 underline"
                >
                    ← Voltar
                </button>
                <CriticalDate />
            </div>
        );
    }

    if (showReportFaults) {
        return (
            <div className="p-4">
                <button
                    onClick={() => setShowReportFaults(false)}
                    className="mb-4 text-blue-600 underline"
                >
                    ← Voltar
                </button>
                <ReportFaults />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {items.map((item, index) => (
                <div key={index} className={styles.card} onClick={item.onClick}>
                    <Image
                        src={item.image}
                        alt={item.label}
                        width={128}
                        height={128}
                        className={styles.icon}
                        priority
                    />
                    <span className={styles.label}>{item.label}</span>
                </div>
            ))}
        </div>
    );
}
