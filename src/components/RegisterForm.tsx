"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState("");

    function formatPhone(value: string) {
        const cleaned = value.replace(/\D/g, ""); // remove tudo que não é número

        if (cleaned.length <= 2) return cleaned;
        if (cleaned.length <= 7)
            return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
        if (cleaned.length <= 11)
            return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;

        return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }

    return (
        <div className={styles.container}>
            <form className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Nome</label>
                    <input
                        type="text"
                        className={`w-full border p-2 rounded-md ${styles.inputFocus}`}
                        placeholder="Seu nome"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Telefone</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        className={`w-full border p-2 rounded-md ${styles.inputFocus}`}
                        placeholder="11 91234-5678"
                    />
                </div>


                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        className={`w-full border p-2 rounded-md ${styles.inputFocus}`}
                        placeholder="seu@email.com"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Empresa</label>
                    <input
                        type="text"
                        className={`w-full border p-2 rounded-md ${styles.inputFocus}`}
                        placeholder="Nome da empresa"
                    />
                </div>

                <div className="relative">
                    <label className="block mb-1 font-semibold">Senha</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className={`w-full border p-2 rounded-md ${styles.inputFocus} pr-10`}
                        placeholder="Digite uma senha segura"
                    />
                    <div
                        className="absolute top-9 right-3 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            src={showPassword ? "/icons/eye-off.png" : "/icons/eye.png"}
                            alt="Ver senha"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`w-full text-white p-2 rounded-md font-semibold transition ${styles.buttonCustom}`}
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
