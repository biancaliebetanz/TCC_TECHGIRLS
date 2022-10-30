import { API_URL } from './config';

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})

export async function UsuarioCadastro(nome, telefone, cpf, rg, nascimento) {
    const r = await api.post('/usuario', {
        nome: nome,
        telefone: telefone,
        cpf: cpf,
        rg: rg,
        nascimento: nascimento
    })
    return r.data;
}

export async function ListarProdutosInicio() {
    const r = await api.get('/usuario/produto');
    return r.data;
}

export async function buscarPorId(id){
    const resp = await api.get('/api/produto/'+ id);
    return resp.data;
}

export async function Favoritar(usuario, produto) {
    const r = await api.post('/usuario/favorito', {
        usuario: usuario,
        produto: produto,

    })
    return r.data;
}

export async function listarFavoritos(){
    const r = await api.get('/usuario/favorito');
    return r.data;
}