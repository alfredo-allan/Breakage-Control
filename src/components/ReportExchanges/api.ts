const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

export async function enviarDadosCriticos(payload: {
    nomePromotor: string;
    nomeCliente: string;
    enderecoCliente: string;
    ean: string;
    descricaoProduto: string;
    dataVencimento: string;
    quantidadeProdutos: number;
    tipoQuantidade: "unidade" | "caixa";
}) {
    const response = await fetch(`${API_BASE_URL}/trocas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...payload,
            tipoRegistro: "trocas", // 🆕 adiciona campo novo
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Erro ao enviar dados");
    }

    return response.json();
}
