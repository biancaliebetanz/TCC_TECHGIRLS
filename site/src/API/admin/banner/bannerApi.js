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