import { API_URL } from '../config';

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})


export async function salvarNovoPedido(idUsuario, idEndereco, frete, valorTotal, cartao, produto) {
    const r = await api.post(`/api/pedido/${idUsuario}`, {
        endereco: idEndereco,
                tipoFrete: frete,
                subtotal: valorTotal,
                cartao: {
                    usuario: idUsuario,
                    nomeCartao: cartao.nome,
                    numero: cartao.numero,
                    validade: cartao.validade,
                    codigo: cartao.cvv,
                    cpf: cartao.cpf,
                    parcelas: cartao.parcelas
                },
                produto: produto
    });
    return r.data;
}

export async function avaliarPedido(idPedido, idUsuario, nota, comentario) {
    const r = await api.post(`/pedido/avaliacao/${idPedido}`, {
                    usuario: idUsuario,
                    nota: nota,
                    comentario: comentario
    });
    return r.data;
}

export async function alterarAvaliacaoPedido(idPedido, idUsuario, nota, comentario) {
    const r = await api.put(`/pedido/avaliacao/${idPedido}`, {
                    usuario: idUsuario,
                    nota: nota,
                    comentario: comentario
    });
    return r.data;
}


export async function listarPedidosUser(id){
    const resposta = await api.get(`/pedido/usuario/${id}`);
    return resposta.data;
}


export async function listarAvaliacaoPedido(id){
    const resposta = await api.get(`/pedido/avaliacao/${id}`);
    return resposta.data;
}
export async function listarPedidoItens(id){
    const resposta = await api.get(`/pedido/itens/${id}`);
    return resposta.data;
}
