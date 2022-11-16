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
    return info.affectedRows;

}

export async function Pedidos(pedido) {
    const comando = `
        INSERT INTO TB_PEDIDO(ID_USUARIO, ID_USUARIO_ENDERECO, ID_CARTAO, TP_FRETE, VL_SUBTOTAL, DS_SITUACAO, DT_PEDIDO, VL_FRETE)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const [info] = await con.query(comando, [
        pedido.usuario,
        pedido.endereco,
        pedido.cartao,
        pedido.tipoFrete,
        pedido.subtotal,
        pedido.situacao,
        pedido.data,
        pedido.frete
    ])
    pedido.id = info.insertId;
    return pedido;
}

export async function listarPedidosUsuario(id) {
    const comando = `
        select
		id_pedido 			as id_pedido,
		nm_usuario 			as nome,
        vl_subtotal			as preco,
        ds_situacao			as situacao,
        ds_cep				as cep,
        ds_endereco         as endereco,
        dt_pedido 			as data
    from tb_pedido
    inner join tb_usuario on tb_usuario.id_usuario = tb_pedido.id_usuario
    inner join tb_usuario_endereco on tb_usuario_endereco.id_usuario = tb_pedido.id_usuario
    where tb_usuario_endereco.id_usuario_endereco = tb_pedido.id_usuario_endereco
    and tb_pedido.id_usuario = ?
        `;

        const [resp] = await con.query(comando, id);
        return resp;
}