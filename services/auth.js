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



export const  cadastroUsuario = async ({ nome, email, password }) => {
    const tipo = "aluno"
    try {
        const response = await api.post('/auth/register', {
            nome: nome,
            email: email,
            senha: password,
            tipo: tipo,
        });
        console.log('Resposta do cadastro:', response.data);
        return response;
    } catch (error) {
        throw error;
    }
};


export const loginUsuario = async ({ email, password }) => {
    try {
        const response = await api.post('/auth/login', {
            email: email,
            senha: password,
        });

        if (response.status === 200) {
            const { token, usuario } = response.data;

            try {
                await SecureStore.setItemAsync('token', token);
                await SecureStore.setItemAsync('nome', usuario?.nome || "");
                await SecureStore.setItemAsync('email', usuario?.email || "");
                await SecureStore.setItemAsync('usuarioId', usuario?.id.toString() || "");
                await SecureStore.setItemAsync('tipo', usuario?.tipo || "");
                await SecureStore.setItemAsync('avatar', usuario?.avatar || "");

                console.log("Dados do usuário salvos:", usuario);
            } catch (storeErr) {
                console.error('Erro ao salvar dados no SecureStore:', storeErr);
            }

            return response.data;
        } else {
            throw new Error('Falha no login');
        }
    } catch (error) {
        console.error('Erro no login:', error);
        throw error;
    }
};




// recuperar senha verificando token pra envio de email

export const recuperarSenha = async (email) => {
    try {
        const response = await api.post('/auth/recuperar-senha', {
            email: email,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
 