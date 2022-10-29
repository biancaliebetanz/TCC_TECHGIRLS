import { Router } from "express";
import { deletarEndereco, inserirEndereco, listarEndereco } from "../../repository/usuario/enderecoRepository.js";
const server = Router();


server.get('/api/usuario/endereco/:id', async (req, resp) => {
    try{
    const id = req.params.id;
    const r = await listarEndereco(id);
    
    resp.send(r)
        
    }
    catch (err){
        resp.status(400).send({ erro: err.message})
    }
})


server.post('/api/usuario/:id/endereco', async (req, resp) => {
    try{
        const id = req.params.id;
        const endereco = req.body;

        const r = await inserirEndereco(id, endereco);
        resp.status(204).send();
        
    }
    catch (err){
        resp.status(400).send({ erro: err.message})
    }
})


server.delete('/api/usuario/endereco/:id', async (req,resp) => {
    try {
        const {id} = req.params;

        const resposta = await deletarEndereco(id);
        if(resposta != 1)
            throw new Error('Endereço não pode ser removido');
            resp.status(204).send();
        }

        catch (err) {
        resp.status(400).send ({
          erro: err.message
            })
           }
})

export default server;