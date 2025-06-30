import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export interface LoginPayload {
    nome: string;
    telefone: string;
    senha: string;
}

export interface LoginResponse {
    nome: string;
    promotor_id: number;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

/**
 * Mapeia a resposta do login para o formato do usuário do contexto Auth.
 * @param data LoginResponse
 * @returns AuthUser
 */
export function mapLoginResponseToAuthUser(data: LoginResponse): AuthUser {
    return {
        id: data.promotor_id.toString(),
        name: data.nome,
        email: "", // email não vem do backend, fica vazio
    };
}

/**
 * Realiza login do promotor.
 * @param data LoginPayload
 * @returns Promise<LoginResponse>
 */
export async function loginPromotor(data: LoginPayload): Promise<LoginResponse> {
    const cleanedData = {
        nome: data.nome.trim(),
        telefone: data.telefone.replace(/\D/g, ""),
        senha: data.senha.trim(),
    };

    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/promotor/login`, cleanedData);

    // Armazena no localStorage para persistência
    localStorage.setItem("promotorLogado", JSON.stringify(response.data));

    return response.data;
}

/**
 * Recupera o promotor logado do localStorage (se houver).
 * @returns LoginResponse | null
 */
export function getPromotorLogado(): LoginResponse | null {
    if (typeof window === "undefined") return null; // Evita erro no SSR

    const data = localStorage.getItem("promotorLogado");
    return data ? JSON.parse(data) : null;
}
