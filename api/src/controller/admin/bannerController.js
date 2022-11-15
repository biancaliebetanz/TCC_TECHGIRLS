import { Router } from "express";
import { AlterarBanner, alterarImagemBanner, deletarBanner, InserirBanner, listarTodosBanner } from '../../repository/admin/bannerRepository.js';
import multer from 'multer';

const server = Router();
const up = multer({dest:'./storage/banner'});

server.post('/banner', async (req, resp) => {
    try {
        const banner = req.body;

        const resposta = await AlterarBanner(banner);

        resp.send(resposta);

    } catch (err) {
        resp.status(404).send({
            err: err.message
        })
    }
})

server.put('/banner/:id', up.single('banner'), async (req, resp) => {
    try {
        const { id } = req.params
        const novoBanner= req.file.path;
        const banner= await InserirBanner(novoBanner, id);

        resp.status(204).send(banner);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.put('/banner/:id/capa', up.single('banner'), async (req, resp) => {
    try {
        if (!req.file)
            throw new Error('Escolha o banner.');

        
        const { id } = req.params;
        const banner = req.file.path;

        const resposta = await alterarImagemBanner(banner, id);
        if (resposta != 1)
            throw new Error('A imagem não pode ser salva.');

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/banner', async (req, resp) => {
    try {
        const banner= await listarTodosBanner();
        resp.send(banner);

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
        }
})


server.delete('/banner/:id', async (req,resp) => {

    try {
        const { id } = req.params;
        const resposta = await deletarBanner(id);
        
        if (resposta !=1)
            throw new Error('Favorito não pode ser removido');

        resp.status(204).send();
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
}
})

export default server;