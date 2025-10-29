import * as SecureStore from "expo-secure-store";
import  api  from './api'; // api.js terá a configuração do axios com baseURL




async function getAuthToken() {
  try {
    const token = await SecureStore.getItemAsync("token");
    return token;
  } catch (error) {
    console.error("Erro ao obter token:", error);
    return null;
  }
}

export const cadastrarPergunta = async ({ pergunta, tipo, opcaoA, opcaoB, opcaoC, opcaoD, correta, exameId}) => {
    const dadosDePergunta = { pergunta, tipo, opcaoA, opcaoB, opcaoC, opcaoD, correta, exameId };
    try {
        const token = await getAuthToken();
        if (!token) throw new Error("Token não encontrado");
        if (!token) throw new Error("Token não encontrado");
        const response = await api.post('/perguntas', dadosDePergunta,
            {
            Headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export const listarPerguntas = async () => {
    try {
        const response = await api.get('/perguntas', {
            Headers: {
                Authorization: `Bearer ${await getAuthToken()}`,
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obterPerguntaPorId = async (id) => {
    try {
        const response = await api.get(`/perguntas/${id}`, {
            Headers: {
                Authorization: `Bearer ${await getAuthToken()}`,
            }
        });
        return response.data;
    }
    catch (error) {
        throw error;
    }
};


// listarperguntas por exameId
export const listarPerguntasPorExame = async (exameId) => {
    try {
        const response = await api.get(`/perguntas/exame/${exameId}`, {
            Headers: {
                Authorization: `Bearer ${await getAuthToken()}`,
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}




export const editarPergunta = async (id, { texto, opcoes, respostaCorreta }) => {
    const dadosDePergunta = { texto: texto, opcoes: opcoes, respostaCorreta: respostaCorreta}
    try {
        const response = await api.put(`/perguntas/${id}`, dadosDePergunta, {
            Headers: {
                Authorization: `Bearer ${await getAuthToken()}`,
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
}