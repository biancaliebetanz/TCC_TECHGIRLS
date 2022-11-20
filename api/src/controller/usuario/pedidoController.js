import { Router } from "express";
import { buscarProduto } from "../../repository/admin/produtoRepository.js";
import { inserirNovoCartao } from "../../repository/usuario/cartaoRepository.js";
import { buscarAvaliacao, inserirAvaliacao, inserirPedidoItem, ListarPedidoItens, listarPedidosUsuario, Pedidos } from "../../repository/usuario/pedidoRepository.js";
import { criarNovoPedido } from "../../service/novoProdutoService.js";

const server = Router();

server.get('/pedido/usuario/:id', async (req,resp) => {
    try {
        const { id } = req.params;
        const resposta = await listarPedidosUsuario(id);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/pedido/itens/:id', async (req,resp) => {
    try {
        const { id } = req.params;
        const resposta = await ListarPedidoItens(id);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/pedido/avaliacao/:id', async (req,resp) => {
    try {
        const { id } = req.params;
        const resposta = await buscarAvaliacao(id);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.post('/api/pedido/:usuario' , async (req , resp) =>{
    try {
        const { usuario } = req.params;
        const info = req.body;

        console.log(info)

        const IdPagamentoCriado = await inserirNovoCartao(usuario, info.cartao)

        const NovoPedido = criarNovoPedido(usuario, info, IdPagamentoCriado);
       
        const IdPedidoCriado = await Pedidos(NovoPedido);

        const produto = info.produto;

        console.log(produto)

        for(let item of produto){
            const prod= await buscarProduto(item.id);
            const idPedidoItemCriado = await inserirPedidoItem(IdPedidoCriado.id, prod.id, item.qtd, prod.preco);
        }
        resp.status(204).send();
    } catch (err) {
        console.log(err)
        resp.status(400).send({
            erro: err.message
        })
    }

})

server.post('/pedido/avaliacao/:pedido' , async (req , resp) =>{
    try {
        const info = req.body;
        const { pedido } = req.params;

        const avaliar = await inserirAvaliacao(pedido, info.usuario, info.nota, info.comentario) 

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

})

server.put('/pedido/avaliacao/:pedido', async (req, resp) => {
    try{

        const {pedido} = req.params;

        const avaliar = await inserirAvaliacao(pedido, info.usuario, info.nota, info.comentario); 

        resp.status(204).send();
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default server;