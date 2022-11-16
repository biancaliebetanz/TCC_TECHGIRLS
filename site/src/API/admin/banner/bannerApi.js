import { API_URL } from "../../config";

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})

export async function inserirBanner(destaque) {
    const resposta= await api.post('/banner', {
        destaque: destaque
    });
    
    return resposta.data;
}

export async function inserirImagemBanner(id, imagem){
    const formData = new FormData();
    formData.append('banner', imagem);
    const resposta = await api.put(`/banner/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    });
    return resposta.status;
}

export async function listarBanner(){
    const resposta = await api.get('/banner');
    return resposta.data
}
export async function listarBannerDestaque(){
    const resposta = await api.get('/banner/destaque');
    return resposta.data
}

export async function buscarBanner(id){
    const resposta = await api.get(`/busca/banner/${id}`);
    return resposta.data
}

export async function deletarBanner(id){
    const resposta = await api.delete(`/banner/${id}`);
    return resposta.data
}


export async function editarBanner(id, destaque) {
    const resposta= await api.put(`/alterar/banner/${id}`, {
        destaque: destaque
    });
    
    return resposta.data;
}
