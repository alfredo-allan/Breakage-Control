"use client";

import Image from "next/image";
import styles from "./ListingIterationWithStock.module.css";

const items = [
    { label: "Produtos (Giro)", image: "/icons/registro.png", onClick: () => console.log("Giro") },
    { label: "Reportar Quebras", image: "/icons/quebras.png", onClick: () => console.log("Quebras") },
    { label: "Saída", image: "/icons/notas.png", onClick: () => console.log("Notas") },
    { label: "Relatórios", image: "/icons/relatorio.png", onClick: () => console.log("Relatórios") },
];

export default function ListingIterationWithStock() {
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
