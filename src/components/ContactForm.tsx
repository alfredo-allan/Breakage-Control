"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const message = `Olá! Me chamo ${name}, com o e-mail ${email}, e estou entrando em contato para obter informações sobre o projeto Breakage Control.`;

        const encodedMessage = encodeURIComponent(message);

        // Substitua com seu número do WhatsApp (somente números, com DDD e país)
        const phoneNumber = "5511994102660"; // exemplo: 55 + DDD + número

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Entre em Contato</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Entrar em contato
                </button>
            </form>
        </section>
    );
}
