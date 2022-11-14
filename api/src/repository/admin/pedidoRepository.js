import { con } from "../connection.js";

export async function listarPedidos() {
    const comando = `
    select
		id_pedido 			as id_pedido,
		nm_usuario 			as nome,
        vl_subtotal			as preco,
        ds_situacao			as situacao,
        ds_cep				as cep,
        dt_pedido 			as data
    from tb_pedido
    inner join tb_usuario on tb_usuario.id_usuario = tb_pedido.id_usuario
    inner join tb_usuario_endereco on tb_usuario_endereco.id_usuario = tb_pedido.id_usuario
    where tb_usuario_endereco.id_usuario_endereco = tb_pedido.id_usuario_endereco`;

    const [linhas] = await con.query(comando);
    return linhas;


}
export async function listarPedidoId(id) {
    const comando = `
    select
		id_pedido 			as id_pedido,
		nm_usuario 			as nome,
        vl_subtotal			as preco,
        ds_situacao			as situacao,
        ds_cep				as cep,
        dt_pedido 			as data
    from tb_pedido
    inner join tb_usuario on tb_usuario.id_usuario = tb_pedido.id_usuario
    inner join tb_usuario_endereco on tb_usuario_endereco.id_usuario = tb_pedido.id_usuario
    where tb_usuario_endereco.id_usuario_endereco = tb_pedido.id_usuario_endereco
    and id_pedido = ?`;

    const [linhas] = await con.query(comando, [id]);
    return linhas[0];


}


export async function AlterarSituacãoPedido(id, situacao){
    const comando = `
    UPDATE TB_PEDIDO
    SET DS_SITUACAO     = ?
    WHERE ID_PEDIDO = ? `;
    const [resp] = await con.query(comando, [situacao, id
    ]);
    return { id : id,
            situacao : situacao
        };
}

export async function DeletarPedidoItem(id){
    const comando = `
    DELETE FROM TB_PEDIDO_ITEM
    WHERE ID_PRODUTO = ?
    ` 
    const [resp] = await con.query(comando, [id]);
    return resp.affectedRows;
}