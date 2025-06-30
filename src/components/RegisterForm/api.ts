import axios from "axios";

// Instância base do axios
const api = axios.create({
    baseURL: "http://localhost:5000", // ajuste se estiver em outro IP ou porta
});

// Tipos
export interface LoginResponse {
    promotor_id: number;
    nome: string;
    email?: string; // caso queira retornar isso da API no futuro
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

// Função para mapear LoginResponse para o formato usado no AuthContext
export function mapLoginResponseToAuthUser(data: LoginResponse): AuthUser {
    return {
        id: data.promotor_id,
        name: data.nome,
        email: data.email || "", // fallback vazio se não tiver email
    };
}

// Função para registrar promotor
export async function registerPromotor(data: {
    nome: string;
    telefone: string;
    email: string;
    empresa: string;
    senha: string;
}) {
    const cleanedData = {
        nome: data.nome.trim(),
        telefone: data.telefone.replace(/\D/g, ""), // remove tudo que não for número
        email: data.email.trim().toLowerCase(),
        empresa: data.empresa.trim(),
        senha: data.senha.trim(),
    };

    return api.post("/promotor/register", cleanedData);
}

// Função para login de promotor
export async function loginPromotor(data: {
    telefone: string;
    senha: string;
}) {
    const cleanedData = {
        telefone: data.telefone.replace(/\D/g, ""),
        senha: data.senha.trim(),
    };

    return api.post<LoginResponse>("/promotor/login", cleanedData);
}

export default api;
