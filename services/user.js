import api from './api'; // api.js terá a configuração do axios com baseURL

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
        if (response.status === 200) { // Confirme se o token está aqui
            return response.data;
        } else {
            throw new Error('Falha no login');
        }
    } catch (error) {
        // console.error('Erro no login:', error.message);
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
export const atualizarPerfilUsuario = async (token, { nome, email }) => {
    try {
        const response = await api.put('/perfil', {
            nome: nome,
            email: email,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export default function DummyComponent() {
    return null;  // Isso faz o arquivo ter um `export default`, mas é gambiarra
}