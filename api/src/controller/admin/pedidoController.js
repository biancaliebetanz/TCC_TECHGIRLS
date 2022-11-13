import { Router } from "express";
import { AlterarSituacãoPedido, listarPedidoId, listarPedidos } from "../../repository/admin/pedidoRepository.js";
const server = Router();

server.get('/pedido', async (req,resp) => {
    try {
        const resposta = await listarPedidos();
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/pedido/:id', async (req,resp) => {
    try {
        const { id } = req.params;
        const resposta = await listarPedidoId(id);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/pedido/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const { situacao } = req.query;

        const resposta= await AlterarSituacãoPedido(id, situacao);

        resp.send(resposta);

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

export default server;