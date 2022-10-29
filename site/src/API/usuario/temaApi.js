import { API_URL } from '../config';

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})


export async function listarPorTema(id){
    const resp = await api.get(`/usuario/tema/${id}`);
    return resp.data;
}