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

// 🔹 Salva resposta de uma pergunta
export const salvarResposta = async (perguntaId, resposta, tentativaId) => {
  const token = await getAuthToken();
  if (!token) throw new Error("Token não encontrado");

  try {
    const response = await api.post(
      "/respostas",
      { perguntaId, resposta , tentativaId},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar resposta:", error);
    throw error;
  }
};

// 🔹 Lista todas as respostas do usuário atual
export const listarRespostasPorUsuario = async () => {
  const token = await getAuthToken();
  if (!token) throw new Error("Token não encontrado");

  try {
    const response = await api.get('/respostas/usuario', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar respostas do usuário:", error);
    throw error;
  }
};

// 🔹 Lista todas as respostas do sistema (admin)
export const listarRespostas = async () => {
  const token = await getAuthToken();
  if (!token) throw new Error("Token não encontrado");

  try {
    const response = await api.get("/respostas", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar respostas:", error);
    throw error;
  }
};


export default {
  salvarResposta,
  listarRespostasPorUsuario,
  listarRespostas,
  buscarMedia,
};














