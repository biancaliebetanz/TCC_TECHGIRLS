import { Router } from "express";
import { listarImagemTema } from "../../repository/tema.js";

const server = Router(); 


server.get('/usuario/tema/:id/imagem', async (req,resp) => {
    try {
        const {id} = req.params;
        const resposta = await listarImagemTema(id);
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


export default server;