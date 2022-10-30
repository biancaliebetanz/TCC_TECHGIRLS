import { Router } from "express";
import { alterarDadosCartao, deletarCartao, inserirNovoCartao, listarTodosCartoes } from "../../repository/usuario/cartaoRepository.js";
const server = Router();

server.post('/cartao', async (req, resp) => {
    try {
        const cartao= req.body;
        
        const novoCartao= await inserirNovoCartao(cartao);
        if(!novoCartao.numero) {
            throw new Error('Id não registrado');
            };
            if(!novoCartao.validade) {
                throw new Error('Nome não registrado');
            };
            if(!novoCartao.codigo) {
                throw new Error('Tema não registrado');
            };
            if(!novoCartao.cpf) {
                throw new Error('Categoria não registrada');
            };


    
            resp.send(novoCartao);

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }

})

server.get('/cartao', async (req, resp) => {
try {
const resposta = await listarTodosCartoes();
resp.send(resposta);

} catch (err) {
resp.status(404).send({
erro: err.message
})
}
})

server.put('/cartao/:id', async (req, resp) => {
try {
const {id} = req.params;
const cartao = req.body;

const resposta = await alterarDadosCartao(id, cartao);

resp.send(resposta);

} catch (err) {
resp.status(404).send({
err: err.message
})
}
})

server.delete('/cartao/:id', async (req, resp) => {
try {
const {id} = req.params;

const resposta = await deletarCartao(id);
if(resposta != 1)
throw new Error('Cartão não pode ser removido');
resp.status(204).send();

} catch (error) {
resp.status(400).send ({
erro: err.message
})
}
})


export default server;