import {buscarIdTema, DeletarTema, EditarTema, inserirImagemTema, inserirTema, listarTemas} from '../../repository/admin/tema.js' 
import { Router } from "express";
import multer from 'multer';
const server = Router();

const upload = multer({dest:'./storage/tema'});

server.get('/api/tema', async (req, resp) => {
    try {
        const linhas = await listarTemas();
        resp.send(linhas);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/api/tema/:id', async (req, resp) => {
    try {
        const id  = req.params.id;
        const tema = req.body;

        const resposta = await EditarTema(id, tema);
        resp.send(resposta);

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.post('/api/tema', async (req, resp) => {
    try {
        const novoTema= req.body;
        const tema = await inserirTema(novoTema);

        resp.send(tema);

    } catch (err) {
        resp.status(404).send({
            erro: err.menssage
        })
        
    }
})

server.delete('/api/tema/:id', async (req, resp) => {
    try {
        const {id} = req.params;

        const resposta= await DeletarTema(id);
        
            resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/api/:id/tema', async (req, resp) => {
    try {
        const { id } = req.params;
        const r = await buscarIdTema(id);
        resp.send(r);
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/tema/:id/imagem', upload.single("img"), async (req, resp) => {
    try{
        const {id} = req.params;
        const imagem = req.file.path;

        const r = inserirImagemTema(id, imagem);
        resp.status(204).send();
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server;