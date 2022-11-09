import { Router } from "express";
import { buscarCorProduto, buscarDestaque, 
    buscarImagemProduto, buscarProduto, buscarTamanhoProduto } from "../../repository/admin/produtoRepository.js";
import { listarPorTema, listarPorTemaCategoria, ListarProdutosInicio } from "../../repository/usuario/produtoRepository.js";

const server = Router();

server.get('/usuario/produto', async (req,resp) => {
    try {
        const resposta = await ListarProdutosInicio();
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/api/produto/:id', async (req, resp) => {
    try{
        const id = req.params.id;

        const produto = await buscarProduto(id);
        const cor = await buscarCorProduto(id);
        const tamanho = await buscarTamanhoProduto(id);
        const imagens = await buscarImagemProduto(id);
        const destaque = await buscarDestaque(id);

        resp.send(
            {
                info : produto,
                cores : cor,
                tamanho : tamanho,
                imagens : imagens,
                destaque : destaque
            }
        )
    }
    catch (err){
        resp.status(400).send({
            erro: err.message
        })    
    }
})

server.get('/usuario/tema/:id', async (req,resp) => {
    try {
        const { id } = req.params;
        const resposta = await listarPorTema(id);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/usuario/tema/:id/categoria', async (req,resp) => {
    try {
        const { id } = req.params;
        const {categoria} = req.query;
        const resposta = await listarPorTemaCategoria(id, categoria);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default server;