import { con } from "../connection.js";

export async function ListarProdutosInicio(){ 
    const comando= `
    select 	tb_produto.id_produto	as id,
		nm_produto 				as nome,
		vl_preco				as preco,
		img_produto				as imagem
    from tb_produto
    inner join tb_imagem on tb_imagem.id_produto = tb_produto.id_produto
    where img_destaque = true`;

    const [r] = await con.query(comando);
    return r;
}

export async function listarPorTema(idTema) {
  const comando = 
  `select 
tb_produto.id_produto 	as id,
nm_produto 				as nome, 
ds_descricao 			as descricao, 
vl_preco 				as preco, 
ds_disponivel 			as disponivel, 
nm_categoria		 	as categoria,
nm_tema 				as tema,
img_produto 			as imagem
from tb_produto
inner join tb_categoria on tb_produto.id_categoria = tb_categoria.id_categoria
inner join tb_tema on tb_produto.id_tema = tb_tema.id_tema
inner join tb_imagem on tb_imagem.id_produto = tb_produto.id_produto
where img_destaque = true
and tb_produto.id_tema = ?
  `;

  const [linhas] = await con.query (comando, [idTema]);
  console.log(linhas)
  return linhas;
}


export async function listarPorTemaCategoria(idTema, categoria) {
  const comando = 
  `select 
tb_produto.id_produto 	as id,
nm_produto 				as nome, 
ds_descricao 			as descricao, 
vl_preco 				as preco, 
ds_disponivel 			as disponivel, 
nm_categoria		 	as categoria,
nm_tema 				as tema,
img_produto 			as imagem
from tb_produto
inner join tb_categoria on tb_produto.id_categoria = tb_categoria.id_categoria
inner join tb_tema on tb_produto.id_tema = tb_tema.id_tema
inner join tb_imagem on tb_imagem.id_produto = tb_produto.id_produto
where img_destaque = true
and tb_produto.id_tema = ?
and tb_categoria.nm_categoria like ?
  `;

  const [linhas] = await con.query (comando, [idTema, categoria]);
  console.log(linhas)
  return linhas;

}