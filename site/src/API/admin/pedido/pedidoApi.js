import { API_URL } from '../../config';

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})

export async function listarPedidos() {
    const resp = await api.get('/pedido')
    return resp.data;
}

export async function listarPedidoId(id) {
    const resp = await api.get(`/pedido/${id}`)
    return resp.data;
}

export async function alterarSituacaoPedido(id, situacao) {
    const resp = await api.put(`/pedido/${id}?situacao=${situacao}`)
    return resp.data;
}

export async function DeletarPedido(id) {
    const resposta = await api.delete(`/api/pedido/${id}`)
    return resposta.status;
}


export async function DeletarPedidoItem(id) {
    const resposta = await api.delete(`/pedido/produto/${id}`)
    return resposta.status;
}