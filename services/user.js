import api from './api'; // api.js terá a configuração do axios com baseURL
import * as SecureStore from 'expo-secure-store';


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