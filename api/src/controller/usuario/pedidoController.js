import { Router } from "express";
import { buscarProduto } from "../../repository/admin/produtoRepository.js";
import { inserirNovoCartao } from "../../repository/usuario/cartaoRepository.js";
import { inserirPedidoItem, Pedidos } from "../../repository/usuario/pedidoRepository.js";
import { criarNovoPedido } from "../../service/novoProdutoService.js";

const server = Router();


server.post('/api/pedido/:usuario' , async (req , resp) =>{
    try {
        const { usuario } = req.params;
        const info = req.body;

        console.log(info)

        const IdPagamentoCriado = await inserirNovoCartao(usuario, info.cartao)

        const NovoPedido = criarNovoPedido(usuario, info, IdPagamentoCriado);
       
        const IdPedidoCriado = await Pedidos(NovoPedido);

        for(let i = 0; i < info.produto.length; i++){
            const prod= await buscarProduto(info.produto[i].id);
            console.log(prod)
            const idPedidoItemCriado = await inserirPedidoItem(IdPedidoCriado.id, prod.id, info.produto[i].qtd, prod.preco);
        }
        resp.status(204).send();
    } catch (err) {
        console.log(err)
        resp.status(400).send({
            erro: err.message
        })
    }

})



export default server;