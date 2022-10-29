import { API_URL } from '../config';

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})

export async function SalvarEndereco(id, cep, referencia, endereco, bairro, cidade, estado, numero) {
    const r = await api.post(`/api/usuario/${id}/endereco`, {
    cep: cep,
    referencia: referencia, 
    endereco: endereco,
    bairro: bairro,
    cidade: cidade,
    estado: estado,
    numero: numero    
})
    return r.data;
}

export async function ListarEnderecos(id) {
    const r = await api.get(`/api/usuario/endereco/${id}`);
    return r.data;
}

export async function deletarEnderecos(id){
    const r= await api.delete(`/api/usuario/endereco/${id}`);
    return r.data;
}
