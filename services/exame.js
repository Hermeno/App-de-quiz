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


export const cadastroExame = async ({ titulo, descricao, duracao, preco, numeroPerguntas, estado, criadorId }) => {
    const dadosDeExame = {
        titulo,
        descricao,
        duracao,
        preco: preco || 0,
        numeroPerguntas: numeroPerguntas || 20,
        estado: estado || "ativo",
        criadorId: criadorId || 1
    };
    try {
        const token = await getAuthToken();
        if (!token) throw new Error("Token não encontrado");
        const response = await api.post('/exames', dadosDeExame, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


// list all axame
export const listarExames = async () => {
    try {
        const response = await api.get('/exames', {
            Headers: {
                Authorization: `Bearer ${await getAuthToken()}`,
            }
        });
        console.log("Resposta dos exames:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
// get exame by id
export const obterExamePorId = async (id) => {
    try {
        const response = await api.get(`/exames/${id}`, {
            Headers: {
                Authorization: `Bearer ${await getAuthToken()}`,
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }   
}

// edit
export const editarExame = async (id, { titulo, descricao, data, duracao }) => {
    const dadosDeExame = { titulo: titulo, descricao: descricao, data: data, duracao: duracao};
    try {
        const response = await api.put(`/exames/${id}`, dadosDeExame, {
            Headers: {
                Authorization: `Bearer ${await getAuthToken()}`,
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// delete
export const deletarExame = async (id) => {
    try {
        const response = await api.delete(`/exames/${id}`, {
            Headers: {
                Authorization: `Bearer ${await getAuthToken()}`,
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}








export default function DummyComponent() {
    return null;  // Isso faz o arquivo ter um `export default`, mas é gambiarra
}