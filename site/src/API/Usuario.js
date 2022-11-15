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

export async function EditarUsuario(nome, telefone, cpf, rg, nascimento, id) {
    const r = await api.put(`/usuario/${id}`, {
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
export async function buscarUsuarioId(id){
    const resp = await api.get(`/api/usuario/${id}`);
    return resp.data;
}

export async function buscarLoginId(id){
    const resp = await api.get(`/api/usuarioLogin/${id}`);
    return resp.data;
}

export async function Favoritar(usuario, produto) {
const r = await api.post(`/favorito/` + usuario + `?produto=` + produto)
    return r.data;
}

export async function listarFavoritos(id){
    const r = await api.get(`/usuario/favorito/${id}`);
    return r.data;
}

export async function RemoverFavoritos(id){
    const r = await api.delete(`/usuario/favorito/${id}`);
    return r.status;
}

