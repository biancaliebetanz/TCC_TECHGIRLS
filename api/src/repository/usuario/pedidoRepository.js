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

    console.log(qtd)
    const [info] = await con.query(comando, [idPedido, idProduto, qtd, preco]);
    return info.affectedRows;
}


export async function inserirAvaliacao(idPedido, idUsuario, nota, comentario) {
    let hoje = new Date();
    const comando = `
    insert into tb_pedido_avaliacao(id_pedido, id_usuario, vl_nota, ds_comentario, dt_avaliacao)
    values(?, ?, ?, ?, ?);
        `;
    const [info] = await con.query(comando, [idPedido, idUsuario, nota, comentario, hoje]);
    return info.affectedRows;
}

export async function alterarAvaliacao(idPedido, idUsuario, nota, comentario) {
    let hoje = new Date();
    const comando = `
    update tb_pedido_avaliacao
    set vl_nota = ?,
    ds_comentario = ?,
    dt_avaliacao =?
    where id_pedido = ? 
    and id_usuario = ?
        `;
    const [info] = await con.query(comando, [nota, comentario, hoje, idPedido, idUsuario]);
    return info.affectedRows;
}

export async function buscarAvaliacao(id) {
    const comando = `
    select 
    id_pedido_avaliacao as id_avaliacao,
    id_pedido as pedido,
    id_usuario as usuario,
    vl_nota as nota,
    ds_comentario as comentario, 
    dt_avaliacao as data
    from tb_pedido_avaliacao
    where id_pedido = ?;
        `;

    const [resp] = await con.query(comando, id);
    return resp[0];
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


export async function ListarPedidoItens(id) {
    const comando = `
    select 
    id_pedido as pedido,
    id_pedido_item as id_item,
    nm_produto	as nome,
    vl_preco as preco,
    nm_tema as tema,
    qtd_itens as qtd,
    img_produto as imagem,
    img_destaque as destaque,
    (qtd_itens * vl_preco) as subtotal
    from tb_pedido_item 
    inner join tb_produto on tb_produto.id_produto = tb_pedido_item.id_produto
    inner join tb_tema on tb_produto.id_tema = tb_tema.id_tema
    inner join tb_imagem on tb_produto.id_produto = tb_imagem.id_produto
    where id_pedido = ? 
    and img_destaque = true
    order by (tb_pedido_item.id_produto)
        `;

    const [resp] = await con.query(comando, [id]);
    return resp;
}