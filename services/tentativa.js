import * as SecureStore from "expo-secure-store";
import api from "./api";

async function getAuthToken() {
  try {
    const token = await SecureStore.getItemAsync("token");
    return token;
  } catch (error) {
    console.error("Erro ao obter token:", error);
    return null;
  }
}

// Cria uma nova tentativa
export const criarTentativa = async (exameId: number) => {
  const dadosDeTentativa = { exameId };
  try {
    const token = await getAuthToken();
    if (!token) throw new Error("Token não encontrado");

    const response = await api.post("/tentativas", dadosDeTentativa, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Resposta da criação da tentativa:", response.data);
    return response.data; // { tentativaId, numero }
  } catch (error) {
    throw error;
  }
};

// Busca tentativa existente do usuário para um exame
export const buscarTentativa = async (exameId: number) => {
  try {
    const token = await getAuthToken();
    if (!token) throw new Error("Token não encontrado");

    const response = await api.get(`/tentativas/${exameId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // Lista de tentativas do usuário para esse exame
  } catch (error) {
    console.error("Erro ao buscar tentativa:", error);
    throw error;
  }
};

export default {
  criarTentativa,
  buscarTentativa,
};
