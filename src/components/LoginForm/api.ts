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
        nome: data.nome.trim(), // remove espaços antes/depois
        telefone: data.telefone.replace(/\D/g, ""), // remove tudo que não for número
        senha: data.senha.trim(),
    };

    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/promotor/login`, cleanedData);
    return response.data;
}
