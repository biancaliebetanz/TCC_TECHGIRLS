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

export async function listarAvaliacoes() {
    const comando = `
        select
        id_pedido as pedido,
        tb_pedido_avaliacao.id_usuario as usuario,
        nm_usuario as nome,
        vl_nota as nota,
        ds_comentario as comentario,
        dt_avaliacao as data
        from tb_pedido_avaliacao
        inner join tb_usuario on tb_usuario.id_usuario = tb_pedido_avaliacao.id_usuario;`;

    const [linhas] = await con.query(comando);
    return linhas;
}


export async function listarPedidoId(id) {
    const comando = `
    select
		id_pedido 			as id_pedido,
        tb_pedido.id_usuario          as id_usuario,
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


export async function AlterarSituac√£oPedido(id, situacao) {
    const comando = `
    UPDATE TB_PEDIDO
    SET DS_SITUACAO     = ?
    WHERE ID_PEDIDO = ? `;
    const [resp] = await con.query(comando, [situacao, id
    ]);
    return {
        id: id,
        situacao: situacao
    };
}
export async function DeletarPedido(id) {
    const comando = `DELETE FROM TB_PEDIDO
        WHERE ID_PEDIDO = ?`;

    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}

export async function DeletarPedidoItem(id) {
    const comando = `
    DELETE FROM TB_PEDIDO_ITEM
    WHERE ID_PRODUTO = ?
    `
    const [resp] = await con.query(comando, [id]);
    return resp.affectedRows;
}
