import { CriptografarSenha, login, loginUsuario } from '../repository/loginRepository.js';
import { inserirUsuarioLogin } from '../repository/loginRepository.js';
import { Router } from "express";

const server = Router();

server.post('/admin/login', async (req, resp) => {
     try {
          const { email, senha } = req.body;
          const resposta = await login(email, senha);
          if (!resposta) {
               throw new Error('Credenciais inválidas')
          }

          resp.send(resposta);
     } catch (err) {
          resp.status(401).send({
               erro: err.message
          })
     }
})

server.post('/login/usuario', async (req, resp) => {
     try {
          const { email, senha } = req.body;
          const realizarLogin = await loginUsuario(email, senha);

          if (!realizarLogin) {
               throw new Error('Credenciais inválidas')
          }
          resp.send({
               id: realizarLogin.id,
               nome: realizarLogin.nome
          });
     }
     catch (err) {
          resp.status(401).send({
               erro: err.message
          })
     }
})

server.post('/usuario/login', async (req, resp) => {
     try {
          const usuariologin = req.body;

          const novoUsuarioLogin = await inserirUsuarioLogin(usuariologin);

          if (!novoUsuarioLogin.id)
               throw new Error('Não foi possível inserir as informações de login do usuário')

          const senhaCriptografada = await CriptografarSenha(novoUsuarioLogin);
          console.log(senhaCriptografada);
          resp.send(novoUsuarioLogin);
     }
     catch (err) {
          resp.status(400).send({
               erro: err.message
          })

     }
})

export default server;