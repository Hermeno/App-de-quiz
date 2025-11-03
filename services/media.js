import * as SecureStore from "expo-secure-store";
import api from "./api"; // Axios já configurado com baseURL

async function getAuthToken() {
  try {
    const token = await SecureStore.getItemAsync("token");
    return token;
  } catch (error) {
    console.error("Erro ao obter token:", error);
    return null;
  }
}

// 🔹 Busca média de acertos do usuário por exame
export const buscarMedia = async (exameId, tentativaId) => {
  const token = await getAuthToken();
  if (!token) throw new Error("Token não encontrado");

  try {
    console.log('Buscando média para:', { exameId, tentativaId });
    const response = await api.get(`/respostas/media/${exameId}/${tentativaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } 
  catch (error) {
    console.error("Erro ao buscar média:", error);
    throw error;
  }
};



export const totalCorrectas = async (exameId, tentativaId) => {
  const token = await getAuthToken();
  if (!token) throw new Error("Token não encontrado");

  try {
    console.log('Buscando total de corretas:', { exameId, tentativaId });
    const response = await api.get(`/respostas/exame/${exameId}/${tentativaId}/corretas`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.totalCorretas || 0;
  } catch (error) {
    console.error("Erro ao buscar total de corretas:", error.response?.data || error.message);
    return 0;
  }
};

export const totalErradas = async (exameId, tentativaId) => {
  const token = await getAuthToken();
  if (!token) throw new Error("Token não encontrado");

  try {
    console.log('Buscando total de erradas:', { exameId, tentativaId });
    const response = await api.get(`/respostas/exame/${exameId}/${tentativaId}/erradas`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.totalErradas || 0;
  } catch (error) {
    console.error("Erro ao buscar total de erradas:", error.response?.data || error.message);
    return 0;
  }
};




export default {
  salvarResposta,
  listarRespostasPorUsuario,
  listarRespostas,
  buscarMedia,
};














