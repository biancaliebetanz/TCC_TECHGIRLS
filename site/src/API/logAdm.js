import { API_URL } from './config';

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})

export async function LoginAdm(email, senha){
        const r= await api.post('/admin/login', {email, senha});
        return r.data;
}

export async function loginUsuario(email, senha) {
    const r = await api.post('/login/usuario', {
        email: email,
        senha: senha
    });
    console.log(r);
    return r;
}

export async function InserirUsuarioLogin(id_usuario, email, senha){
    const r= await api.post('/usuario/login', {
        id_usuario: id_usuario, 
        email: email, 
        senha: senha
    });
    return r.status;
}