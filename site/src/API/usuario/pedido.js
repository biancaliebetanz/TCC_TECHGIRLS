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

