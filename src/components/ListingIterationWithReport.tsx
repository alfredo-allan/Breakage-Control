"use client";

import Image from "next/image";
import styles from "./ListingIterationWithReport.module.css";

const items = [
    { label: "Enviar Notas", image: "/icons/invoice.png", onClick: () => console.log("Enviar Notas") },
    { label: "Consultar Notas", image: "/icons/money.png", onClick: () => console.log("Consultar Notas") },
    { label: "Listar Datas Do Cliente", image: "/icons/period.png", onClick: () => console.log("Listar Datas do Cliente") },
    { label: "Listar Enviar Registros", image: "/icons/shop.png", onClick: () => console.log("Listar Registros") },


];

export default function ListingIterationWithReport() {
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
