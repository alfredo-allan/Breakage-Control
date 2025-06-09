"use client";

import Image from "next/image";
import styles from "./ListingIterationWithDate.module.css";

const items = [
    { label: "Reportar Datas Críticas", image: "/icons/due-date.png", onClick: () => console.log("Registar Datas Críticas") },
    { label: "Reportar Avarias", image: "/icons/broken-bottle.png", onClick: () => console.log("Avarias") },
    { label: "Reportar Trocas", image: "/icons/recycle.png", onClick: () => console.log("Avarias") },

    { label: "Relatórios", image: "/icons/relatorio.png", onClick: () => console.log("Relatórios") },
];

export default function ListingIterationWithDate() {
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
