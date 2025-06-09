import axios from "axios";

// Instância base do axios
const api = axios.create({
    baseURL: "http://localhost:5000", // ajuste se estiver em outro IP ou porta
});

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

    return api.post("/promotor/login", cleanedData);
}

export default api;
