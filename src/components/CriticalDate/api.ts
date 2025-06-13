import axios from "axios";


const API_BASE_URL = "http://localhost:5000";

export async function enviarDadosCriticos(payload: {
    nomePromotor: string;
    nomeCliente: string;
    enderecoCliente: string;
    ean: string;
    descricaoProduto: string;
    dataVencimento: string;
    quantidadeProdutos: number;
}) {
    const response = await axios.post(`${API_BASE_URL}/salvar-dados`, payload);
    return response.data;
}
