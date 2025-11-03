import api from './api'; // api.js terá a configuração do axios com baseURL
import * as SecureStore from 'expo-secure-store';

export const  cadastroUsuario = async ({ nome, email, password }) => {
    try {
        const response = await api.post('/auth/register', {
            nome: nome,
            email: email,
            senha: password,
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

// profile 
export const obterPerfilUsuario = async (token) => {
    try {
        const response = await api.get('/perfil', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Atualizar perfil
export const atualizarPerfilUsuario = async (token, { nome, email, numero, cidade, classe }) => {
    if (!token) {
        throw new Error('Token de autenticação não fornecido');
    }

    try {
        const response = await api.put('/usuarios/atualizar', {
            nome,
            email,
            numero,
            cidade,
            classe
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro na requisição de atualização:', error.response?.data || error.message);
        if (error.response?.data?.error) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
};



export const obterUsuarioPorId = async (token) => {
    try {
        if (!token) {
            throw new Error('Token não fornecido');
        }
        
        console.log('Fazendo requisição com token:', token.substring(0, 10) + '...');
        const response = await api.get(`/usuarios/obterUsuario`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro detalhado:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
}





export default function DummyComponent() {
    return null;  // Isso faz o arquivo ter um `export default`, mas é gambiarra
}