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

        const IdPagamentoCriado = await inserirNovoCartao(usuario, info.cartao)

        const NovoPedido = criarNovoPedido(usuario, info, IdPagamentoCriado);
       
        const IdPedidoCriado = await Pedidos(NovoPedido);

        for(let item of info.produto){
            const prod= await buscarProduto(item.id);
            const idPedidoItemCriado = await inserirPedidoItem(IdPedidoCriado.id, prod.id, item.qtd, prod.preco);
        }
        resp.status(204).send();
    } catch (err) {
        console.log(err)
        resp.status(400).send({
            erro: err.menssage
        })
    }

})



export default server;