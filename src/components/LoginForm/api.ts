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

export async function loginPromotor(data: LoginPayload): Promise<LoginResponse> {
    const cleanedData = {
        nome: data.nome.trim(),
        telefone: data.telefone.replace(/\D/g, ""),
        senha: data.senha.trim(),
    };

    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/promotor/login`, cleanedData);

    // Armazenar no localStorage
    localStorage.setItem("promotorLogado", JSON.stringify(response.data));

    return response.data;
}

export function getPromotorLogado(): LoginResponse | null {
    if (typeof window === "undefined") return null; // Next.js SSR check

    const data = localStorage.getItem("promotorLogado");
    return data ? JSON.parse(data) : null;
}
