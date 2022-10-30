import { con } from "../connection.js";

    
    export async function inserirPedidoItem(idPedido, idProduto, qtd, preco) {
        const comando = `
            INSERT INTO tb_pedido_item (
                id_pedido,
                id_produto,
                qtd_itens,
                vl_produto
            )
            VALUES (?, ?, ?, ?)
        `;
    
        const [info] = await con.query(comando, [idPedido, idProduto, qtd, preco]);
        return  info.affectedRows;

    }   
    
    export async function Pedidos(pedido){
        const comando = `
        INSERT INTO TB_PEDIDO(ID_USUARIO, ID_USUARIO_ENDERECO, ID_CARTAO, TP_FRETE, DS_SITUACAO, DT_PEDIDO, VL_FRETE)
        VALUES(?, ?, ?, ?, ?, ?, ?)
        `;
        const [info] = await con.query(comando, [
                                    pedido.usuario,
                                    pedido.endereco,
                                    pedido.cartao,
                                    pedido.tipoFrete,
                                    pedido.situacao,
                                    pedido.data,
                                    pedido.frete
        ])
        pedido.id = info.insertId;
        return pedido;
    }