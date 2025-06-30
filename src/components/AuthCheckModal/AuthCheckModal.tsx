"use client";
import { useEffect } from "react";
import styles from "./AuthCheckModal.module.css"; // reutilizando estilos
import Image from "next/image";

interface AuthCheckModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (target: "login" | "cadastrar-se") => void;
}

export default function AuthCheckModal({
    isOpen,
    onClose,
    onNavigate,
}: AuthCheckModalProps) {
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
                    <Image src="/icons/content-modal.png" alt="Logo" width={60} height={60} />
                    <h2 className={styles.error}>Atenção!</h2>
                </div>
                <p className={styles.message}>
                    Para continuar, você precisa estar logado ou se cadastrar. 😊
                </p>
                <div className="flex flex-col gap-4">
                    <button className={styles.closeButton} onClick={() => onNavigate("login")}>
                        Fazer Login
                    </button>
                    <button className={styles.closeButton} onClick={() => onNavigate("cadastrar-se")}>
                        Cadastrar-se
                    </button>
                </div>
            </div>
        </div>
    );
}
