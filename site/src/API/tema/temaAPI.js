import axios from 'axios'
import { API_URL } from '../config';

const api = axios.create({
    baseURL: API_URL
})

export async function inserirTema(nome, cor) {
    const resposta= await api.post('/api/tema', {
        nome: nome,
        cor: cor
    }); 

    return resposta.data;
}

    
    export async function Temas() {
        const resp = await api.get('/api/tema');
        return resp.data;
    }

    export async function CadastrarImgTema(id, imagem){
        const formData = new FormData();
        formData.append('img', imagem);
        const resposta = await api.put(`/tema/${id}/imagem`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        return resposta.status;
    }

    export async function CadastrarImgTemaFundo(id, imagem){
        const formData = new FormData();
        formData.append('img', imagem);
        const resposta = await api.put(`/tema/${id}/imagemFundo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        return resposta.status;
    }

    
    export async function buscarTemaId(id){
        const resp = await api.get(`/api/${id}/tema`);
        return resp.data;
    }
    
export async function alterarTema(id, nome, cor){
    
    const r = await api.put(`/api/tema/${id}`, {
            nome: nome,
            cor: cor
        })

    return r.data;
}

export async function deletarTema(id){
    const r = await api.delete(`/api/tema/${id}`);
    return r.data;
}