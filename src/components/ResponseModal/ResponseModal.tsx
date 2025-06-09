"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./ResponseModal.module.css";

interface ResponseModalProps {
    isOpen: boolean;
    type: "success" | "error";
    message: string;
    onClose: () => void;
}

export default function ResponseModal({ isOpen, type, message, onClose }: ResponseModalProps) {
    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", closeOnEsc);
        return () => document.removeEventListener("keydown", closeOnEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <Image
                        src="/icons/content-modal.png"
                        alt="Logo"
                        width={80}
                        height={80}
                    />
                    <h2 className={type === "success" ? styles.success : styles.error}>
                        {type === "success" ? "Sucesso!" : "Erro!"}
                    </h2>
                </div>
                <p className={styles.message}>{message}</p>
                <button onClick={onClose} className={styles.closeButton}>
                    Fechar
                </button>
            </div>
        </div>
    );
}
