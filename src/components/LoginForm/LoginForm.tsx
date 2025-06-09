"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./LoginForm.module.css";
import ResponseModal from "../ResponseModal/ResponseModal";
import { loginPromotor } from "./api";

interface LoginData {
    nome: string;
    telefone: string;
    senha: string;
}

type ModalType = "success" | "error";

interface ModalState {
    isOpen: boolean;
    type: ModalType;
    message: string;
}

interface AxiosErrorLike {
    response?: {
        data?: {
            error?: string;
        };
    };
}

export default function LoginForm() {
    const [formData, setFormData] = useState<LoginData>({
        nome: "",
        telefone: "",
        senha: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [modal, setModal] = useState<ModalState>({
        isOpen: false,
        type: "success",
        message: "",
    });

    const [userName, setUserName] = useState<string>("");

    function formatPhone(value: string) {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length <= 2) return cleaned;
        if (cleaned.length <= 7) return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
        if (cleaned.length <= 11)
            return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (name === "telefone") {
            setFormData((prev) => ({ ...prev, telefone: formatPhone(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { nome, telefone, senha } = formData;

        if (!nome || !telefone || !senha) {
            setModal({
                isOpen: true,
                type: "error",
                message: "Por favor, preencha todos os campos, inclusive o nome.",
            });
            return;
        }

        try {
            const data = await loginPromotor(formData);

            setUserName(data.nome);

            setModal({
                isOpen: true,
                type: "success",
                message: `Bem-vindo, ${data.nome}! Login realizado com sucesso.`,
            });

            // Aqui pode salvar token, user, redirecionar, etc.
        } catch (error: unknown) {
            const err = error as AxiosErrorLike;
            const message = err.response?.data?.error ?? "Erro na conexão com o servidor.";

            setModal({
                isOpen: true,
                type: "error",
                message,
            });
        }
    }

    return (
        <div className={styles.container}>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-4"
            >
                <div>
                    <label className="block mb-1 font-semibold">Nome</label>
                    <input
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        type="text"
                        className={`w-full border p-2 rounded-md ${styles.inputFocus}`}
                        placeholder="Seu nome"
                        autoComplete="name"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Telefone</label>
                    <input
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        type="tel"
                        className={`w-full border p-2 rounded-md ${styles.inputFocus}`}
                        placeholder="11 91234-5678"
                        autoComplete="tel"
                    />
                </div>

                <div className="relative">
                    <label className="block mb-1 font-semibold">Senha</label>
                    <input
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        className={`w-full border p-2 rounded-md ${styles.inputFocus} pr-10`}
                        placeholder="Digite sua senha"
                        autoComplete="current-password"
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
                    Entrar
                </button>
            </form>

            {/* Mensagem de boas-vindas */}
            {userName && (
                <p className={`mt-4 font-semibold ${styles.responseText}`}>
                    Bem-vindo, {userName}!
                </p>
            )}

            <ResponseModal
                isOpen={modal.isOpen}
                type={modal.type}
                message={modal.message}
                onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
}
