import { api } from "./api";

export async function getJogoById(id: string) {
  try {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  } catch (err) {
    console.error("Erro ao buscar jogo", err);
    return { id, nome: "Jogo Exemplo", preco: 100 };
  }
}
