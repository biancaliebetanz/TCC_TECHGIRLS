import { Router } from "express";
import { listarPedidos } from "../../repository/admin/pedidoRepository.js";
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

export default server;