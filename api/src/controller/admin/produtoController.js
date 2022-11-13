import { 
        inserirCor, inserirProduto, inserirTamanho, salvarImagem, 
        salvarDestaque, listarProduto,  
        buscarPorNome, buscarPorCategoria, buscarPorTema, alterarProduto, removerProduto,
        deletarCor, deletarTamanho, deletarProduto, deletarImagem,
        buscarDestaque, buscarProduto, buscarCorProduto, 
        buscarTamanhoProduto, buscarImagemProduto, Resposta, AlterarSituacãoPedido, 
        alterarCor, alterarTamanho, deletarImagensDiferentes, alterarTemaProduto 
}       from '../../repository/admin/produtoRepository.js';

import multer from 'multer';
import { Router } from 'express';

const server = Router();
const upload = multer({dest:'./storage/produto'}); //bia adiciona o storage/banner aqui please

//inserir Produto

server.post('/produto', async (req,resp) => {
    try {
        const novoProduto = req.body;
        
        const produtoInserido = await inserirProduto(novoProduto);

        if(!produtoInserido.id) {
        throw new Error('Id não registrado');
        };
        if(!produtoInserido.nome) {
            throw new Error('Nome não registrado');
        };
        if(!produtoInserido.tema) {
            throw new Error('Tema não registrado');
        };
        if(!produtoInserido.categoria) {
            throw new Error('Categoria não registrada');
        };
        if(!produtoInserido.preco) {
            throw new Error('Preço não registrado')
        }
        if(!produtoInserido.descricao) {
                throw new Error('Descrição não registrada')
        }
        if(produtoInserido.disponivel == undefined) {
            throw new Error('Disponibilidade não registrada')
        }

        resp.send(produtoInserido);
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message 
        })
    }
})


server.put('/produto/destaque/:id', upload.single("img"), async (req, resp) => {
    try {
        const { id } = req.params;

        const img = req.file.path;

        const resposta = await salvarDestaque(id, img);

        resp.status(204).send();
    }
    catch (err) {
        resp.send({
            erro:err.message
        })
    }
})

server.put('/produto/imagem/:id', upload.array('imagens'), async (req, resp) => {
    try{
        const id = req.params.id;
        const imagens = req.files;

        for( const imagem of imagens) {
            await salvarImagem(id, imagem.path);
        }

        resp.status(204).send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.post('/produto/cor', async (req,resp) => {
    try {
        const novaCor = req.body;

        if(!novaCor.produto)
            throw new Error('Produto (cor) não especificado!');
        if(!novaCor.nome)
            throw new Error('Nome da cor é obrigatório!');

        const corInserida = await inserirCor(novaCor);

        resp.send(corInserida);
    
    } catch (err) {
        resp.status(400).send({
            erro: err.message 
        })
    }
})

server.post('/produto/tamanho', async (req,resp) => {
    try {
        const novoTamanho = req.body;

        if (!novoTamanho.produto)
            throw new Error('Produto (tamanho) não especificado!')
        if(!novoTamanho.descricao)
            throw new Error('Tamnaho do produto é obrigatório!');

        const tamanhoInserido = await inserirTamanho(novoTamanho);

        resp.send(tamanhoInserido);
    } catch (err) {
        resp.status(400).send({
            erro: err.message 
        })
    }
})

// buscar e listar

server.get('/produto', async (req,resp) => {
    try {
        const resposta = await listarProduto();
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// ALTERAR (SEM IMAGENS)

 server.put('/admin/produto/:id', async (req,resp) => {

	try {
		const { id } = req.params;
		const produto = req.body;

        // alterando tabela principal tb_produto
        const resposta = await alterarProduto(id, produto.info);
        
         // remover antigas informações  das tabelas
         const a = await deletarCor(id);
         const b = await deletarTamanho(id);

        // inserindo novas cores
         for(let i=0; i<produto.cores.length; i++){
        const c = await alterarCor(id, produto.cores[i]);
        }

        // inserindo novos tamanhos
        for(let i=0; i<produto.tamanho.length; i++){
            await  alterarTamanho(id, produto.tamanho[i])
        }
        
        console.log('ok')
        resp.send(resposta);

    } catch (err) { 
        resp.status(400).send({
	        erro: err.message 
        })
    }
})


server.put('/produto/alterar/imagem/:id', upload.array('imagens'), async (req, resp) => {
    try{

        const id = req.params.id;
        const imagens = req.files;

        const imagensPermanecem = req.body.imagens.filter(item => item != 'undefined');

        await deletarImagensDiferentes(id, imagensPermanecem);

        for(const imagem of imagens) {
          await salvarImagem(id, imagem.path);
         }

        resp.status(204).send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// buscar produto (função alterar)

server.get('/produto/:id', async (req, resp) => {
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

server.get('/produto/nome', async (req, resp) => {
        try {
            const { nome } = req.query;
                
            const resposta = await buscarPorNome(nome);
        
           
                resp.send(resposta);
        } catch (err) {
            resp.status(400).send({
                erro: err.message
            })
        }
    })


server.get('/filtro/tema', async (req,resp) => {

    try{
        const { nome } = req.query;
        const x = await buscarPorTema(nome);
        resp.send(x)
        
    } catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filtro/categoria', async (req,resp) => {

    try{
        const { nome } = req.query;
        const x = await buscarPorCategoria(nome);
        resp.send(x)
        
    } catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/produto/tema', async (req,resp) => {

    try{
        const { nome } = req.query;
        const x = await filtrarPorTema(nome);
        resp.send(x)
        
    } catch(err) {
        resp.status(400).send({
        erro: err.message
    })
               
    }
})


server.get('/produto/categoria', async (req,resp) => {

    try{
        const { nome } = req.query;
        const y = await filtrarPorCategoria(nome);
        resp.send(y)
        
    } catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



server.get('/produto/destaque/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const r = await buscarDestaque(id);
        console.log(r.destaque)
        resp.send(r.destaque);
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})


// DELETAR


//server.delete('/produto/:id', async (req,resp) => {
//	try {
//		const {id} = req.params;
//
//		const resposta = await removerProdutor(id);
//		if(resposta != 1)
//			throw new Error('Produto não pode ser removido');
//			resp.status(204).send();
//		}
//
//		catch (err) {
//		resp.status(400).send ({
//		  erro: err.message
//			})
//		   }
//		})


server.delete('/produto/:id', async (req, resp) => {
    try {

        const  id  = req.params.id;
        await deletarCor(id);
        await deletarTamanho(id);
        await deletarImagem(id);
        await deletarProduto(id);
        resp.status(204).send();

    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.post('/resposta', async (req, resp) => {
    try {
        const novaResposta = req.body;
        const resposta = await Resposta(novaResposta);

        if(!resposta.resposta){
            throw new Error('Resposta não registrada')
        }
        resp.send(resposta);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})



server.put('/pedido/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const pedido = req.body;

        const resposta= await AlterarSituacãoPedido(id, pedido);

        resp.send(resposta);

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.put('/produto/tema/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const novoId = req.query.novoId;
        const produto = await alterarTemaProduto(novoId, id);
        resp.send(produto);
    }
    catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})




export default server;