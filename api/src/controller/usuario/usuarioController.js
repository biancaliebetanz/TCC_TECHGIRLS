import { Router } from "express"; 
import { alterarEndereco, AlterarInfosUsuarios, AlterarSenha, Avaliacao,  Favoritos, inserirEndereco,  inserirUsuario, 
    listarAvaliacoes, listarEnderecos, listarFavoritos, removerProdutoFavoritos } from "../../repository/usuario/usuarioRepository.js";

const server = Router(); 

server.post('/usuario', async (req, resp) => {
    try{
        const usuario = req.body;

        const novoUsuario = await inserirUsuario(usuario);
        if( !novoUsuario.id )
            throw new Error('Não foi possível inserir as informações do usuário - id');
        if( !novoUsuario.nome )
            throw new Error('Não foi possível inserir as informações do usuário - nome');
        if( !novoUsuario.telefone )
            throw new Error('Não foi possível inserir as informações do usuário - telefone');
        if( !novoUsuario.cpf )
            throw new Error('Não foi possível inserir as informações do usuário - cpf');
        if( !novoUsuario.rg )
            throw new Error('Não foi possível inserir as informações do usuário - rg');
        if( !novoUsuario.nascimento )
        throw new Error('Não foi possível inserir as informações do usuário - nascimento');
        
        resp.send(novoUsuario);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
   
})

server.post('/endereco', async (req, resp) => {
            try {
              
                const endereco= req.body;
                
                const novoEndereco= await inserirEndereco(endereco);
                if(!novoEndereco.cep) {
                    throw new Error('Id não registrado');
                    };
                    if(!novoEndereco.residencia) {
                        throw new Error('Nome não registrado');
                    };
                    if(!novoEndereco.endereco) {
                        throw new Error('Tema não registrado');
                    };
                    if(!novoEndereco.bairro) {
                        throw new Error('Categoria não registrada');
                    };
                    if(!novoEndereco.estado) {
                        throw new Error('Preço não registrado')
                    }
                    if(!novoEndereco.uf) {
                            throw new Error('Descrição não registrada')
                    }
                    if(!novoEndereco.complemento) {
                        throw new Error('Descrição não registrada')
                }

            
                    resp.send(novoEndereco);

            } catch (err) {
                resp.status(404).send({
                    erro: err.message
                })
            }

})

server.get('/endereco', async (req, resp) => {
    try {
        const resposta = await listarEnderecos();
        resp.send(resposta);
    
    } catch (err) {
            resp.status(404).send ({
                erro: err.message
            })    
    }
})

server.put('/endereco/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const endereco = req.body;

        const resposta = await alterarEndereco(id, endereco);

        resp.send(resposta);

    } catch (err) {
        resp.status(404).send({
            err: err.message
        })
    }
})

server.post('/usuario/avaliacao', async (req, resp) => {
    try {
        const novaAvaliacao = req.body;
        const avaliacao = await Avaliacao(novaAvaliacao);
        
        if(!avaliacao.produto) {
            throw new Error('produto não registrado');
            };
            if(!avaliacao.usuario) {
                throw new Error('Usuario não registrado');
            };
            if(!avaliacao.nota) {
                throw new Error('Nota não registrada');
            };
            if(!avaliacao.comentario) {
                throw new Error('Comentario não registrado');
            };
            if(!avaliacao.data) {
                throw new Error('data não registrado')
            }

        resp.send(avaliacao);

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.get('/usuario/avaliacao', async (req, resp) => {
    try {
        const resposta = await listarAvaliacoes();
        resp.send(resposta)
    } catch (err) {
        resp.status(404).send({
            erro: err.menssage
        })
    }
})

server.post('/favorito/:usuario', async (req, resp) => {
    try {
        const usuario = req.params.usuario;
        const produto = req.query.produto;
        console.log(produto)
        const favorito = await Favoritos(usuario, produto);
        resp.send(favorito);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.delete('/usuario/favorito/:id', async (req,resp) => {

    try {
        const { id } = req.params;
        const resposta = await removerProdutoFavoritos(id);
        
        if (resposta !=1)
            throw new Error('Favorito não pode ser removido');

        resp.status(204).send();
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
}
})

server.get('/usuario/favorito/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta= await listarFavoritos(id);
        resp.send(resposta);
    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})

server.put('/usuario/senha/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const senha= req.body;
        const resposta = await AlterarSenha(id, senha);

        resp.send(resposta);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.put('/usuario/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const usuario = req.body;

        const resposta = await AlterarInfosUsuarios(id, usuario);

        resp.send(resposta);

    } catch (err) {
        resp.status(404).send({
            err: err.message
        })
    }
})

server.post('/pedido/item', async (req, resp) =>{
   try {
    const item = req.body;
    const novoItem = await InserirItem(item);

    resp.send(novoItem);
   } catch (err) {
        resp.status(404).send({
            erro: err.menssage
        })
   }

})

export default server;