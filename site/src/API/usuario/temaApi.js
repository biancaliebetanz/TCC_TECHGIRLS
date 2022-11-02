import { API_URL } from '../config';

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})


export async function listarPorTema(id){
    const resp = await api.get(`/usuario/tema/${id}`);
    return resp.data;
}

export async function Temas() {
    const resp = await api.get('/api/tema');
    return resp.data;
}