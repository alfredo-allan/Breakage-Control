"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./RegisterForm.module.css";
import { registerPromotor } from "./api";
import ResponseModal from "../ResponseModal/ResponseModal";

interface FormData {
    nome: string;
    telefone: string;
    email: string;
    empresa: string;
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

export default function RegisterForm() {
    const [formData, setFormData] = useState<FormData>({
        nome: "",
        telefone: "",
        email: "",
        empresa: "",
        senha: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [modal, setModal] = useState<ModalState>({
        isOpen: false,
        type: "success",
        message: "",
    });

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

        const { nome, telefone, email, empresa, senha } = formData;
        if (!nome || !telefone || !email || !empresa || !senha) {
            setModal({
                isOpen: true,
                type: "error",
                message: "Por favor, preencha todos os campos.",
            });
            return;
        }

        try {
            const response = await registerPromotor(formData);
            if (response.status === 201 || response.status === 200) {
                setModal({
                    isOpen: true,
                    type: "success",
                    message: "Cadastro realizado com sucesso!",
                });
                setFormData({ nome: "", telefone: "", email: "", empresa: "", senha: "" });
            } else {
                setModal({
                    isOpen: true,
                    type: "error",
                    message: response.data?.error || "Erro ao cadastrar promotor.",
                });
            }
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
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        className={`w-full border p-2 rounded-md ${styles.inputFocus}`}
                        placeholder="seu@email.com"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Empresa</label>
                    <input
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        type="text"
                        className={`w-full border p-2 rounded-md ${styles.inputFocus}`}
                        placeholder="Nome da empresa"
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

            <ResponseModal
                isOpen={modal.isOpen}
                type={modal.type}
                message={modal.message}
                onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
}
