import { con } from '../connection.js'

//inserir

export async function inserirProduto(produto) {
    const comando = `
    INSERT INTO TB_PRODUTO (NM_PRODUTO, ID_TEMA, ID_CATEGORIA, VL_PRECO, DS_DESCRICAO, DS_DISPONIVEL)
    VALUES ( ?, ?, ?, ?, ?, ?) `;
    const [resp] = await con.query(comando, [
                            produto.nome,
                            produto.tema,
                            produto.categoria,
                            produto.preco,
                            produto.descricao,
                            produto.disponivel
                        ])
                        
    produto.id = resp.insertId;
    return produto;
}


export async function inserirCor(cor) {
    const comando = `
    INSERT INTO TB_COR (ID_PRODUTO, NM_COR)
    VALUES(?, ?) `;
    const [resp] = await con.query(comando, [cor.produto, cor.nome])
    cor.id = resp.insertId;
    return cor;
}

export async function inserirTamanho(tamanho) {
    const comando = `
    INSERT INTO TB_TAMANHO (ID_PRODUTO, DS_TAMANHO)
    VALUES(?, ?) `;
    const [resp] = await con.query(comando, [tamanho.produto, tamanho.descricao]);
    tamanho.id = resp.insertId;
    return tamanho;
}

export async function salvarProdutoCategoria(categoria) {
    const comando = `
        insert into tb_produto_categoria (nm_categoria)
                                  values (?)
    `

    const [resp] = await con.query(comando, [categoria.nome]);
    categoria.id = resp.insertId;

}

export async function salvarTema(idProduto, idTema) {
    const comando = `
        insert into tb_produto_categoria (id_tema, id_produto)
                                  values (?, ?)
    `

    const [resp] = await con.query(comando, [idTema, idProduto])
}

export async function salvarImagem(id, imagem) {
    const comando = `
        insert into tb_imagem (id_produto, img_produto, img_destaque)
        values (?, ?, false)
        `;
        
    if (isNaN(id)) {
        throw new Error("id tem o valor =" + "'" + id + "'" + " e imagem tem o valor=" + imagem) // vai retornar o que estamos enviando na rota em :id
    }
    
    const [resposta] = await con.query(comando, [id, imagem]);

    return resposta;
}  

export async function salvarDestaque(id, imagem) {
    const comando = `
        insert into tb_imagem (id_produto, img_produto, img_destaque)
        values (?, ?, true)
        `;
        
    if (isNaN(id)) {
        throw new Error("id tem o valor =" + "'" + id + "'" + " e imagem tem o valor=" + imagem) // vai retornar o que estamos enviando na rota em :id
    }
    
    const [resposta] = await con.query(comando, [id, imagem]);

    return resposta;
}  


// buscar e listar

export async function listarProduto () {
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
    `;

    const [linhas] = await con.query (comando);
    return linhas;

}

export async function exibirProduto(){
    const comando= `
    select 	
        tb_produto.id_produto	as id,
		nm_produto 				as nome,
		vl_preco				as preco,
		img_produto				as imagem
    from tb_produto
    inner join tb_imagem on tb_imagem.id_produto = tb_produto.id_produto
    where img_destaque = true
    `;

    // caso tenhamos que criar um novo campo para mostrar os produtos em destaque

    const [linhas] = await con.query(comando);
    return linhas;
}

export async function alterarProduto (id, produto) {
	const comando = 
            `UPDATE TB_PRODUTO 
			SET NM_PRODUTO     = ?,
			    ID_TEMA        = ?,
			    ID_CATEGORIA   = ?,
			    VL_PRECO       = ?,
			    DS_DESCRICAO   = ?,
			    DS_DISPONIVEL  = ?,
                BT_DESTAQUE    = TRUE
			WHERE 
                ID_PRODUTO     = ?
            `;

const [resposta] = await con.query(comando, [produto.nome, produto.tema, produto.categoria, produto.preco, produto.descricao, produto.disponivel, id])
resposta.id = id;
return resposta;
}

export async function removerProduto (id) {
	const comando = `DELETE FROM TB_PRODUTO 
			 WHERE ID_PRODUTO = ?`;

	const [resposta] = await con.query (comando,[id]);
	return resposta.affectedRows;
}

export async function buscarPorNome(nome) {
    const comando =
    `SELECT ID_PRODUTO   id,
        ID_TEMA    tema,
        ID_CATEGORIA categoria,
        NM_PRODUTO   nome,
        VL_PRECO     preco,
        DS_DESCRICAO descricao,
        DS_DISPONIVEL disponivel
        FROM TB_PRODUTO
    WHERE NM_PRODUTO like ? `;
        
    const [linhas] = await con.query(comando, [ `%${nome}%` ]);
    return linhas;
}

export async function buscarPorCategoria(nome) {
    const comando =
       `SELECT ID_CATEGORIA   ID,
            NM_CATEGORIA  NOME
        FROM TB_CATEGORIA
        WHERE NM_CATEGORIA like ? `;
    
    const [linhas] = await con.query(comando, [ `%${nome}%` ]);
    return linhas;
}
export async function buscarPorTema(nome) {
    const comando =`
    select ID_TEMA  id,
           NM_TEMA  nome,
           DS_COR   cor
    FROM TB_TEMA
    WHERE NM_TEMA like ? `;
    
    const [linhas] = await con.query(comando, [ `%${nome}%` ]);
    return linhas;
}
export async function filtrarPorTema(nome){
    const comando = 
    `SELECT ID_TEMA  id,
            NM_TEMA  nome,
            DS_COR   cor
        FROM TB_TEMA
        WHERE NM_TEMA like ?`;

        const [linhas] = await con.query(comando, [ `%${nome}%` ]);
        return linhas;
    }

    export async function filtrarPorCategoria(nome){
        const comando = `
                SELECT ID_CATEGORIA   ID,
                NM_CATEGORIA  NOME
                FROM TB_CATEGORIA
                WHERE NM_CATEGORIA like ?`;
    
            const [linhas] = await con.query(comando, [ `%${nome}%` ]);
            return linhas;
        };
        
// deletar

export async function deletarProdutoFavorito(id){
    const comando= `
    DELETE FROM TB_USUARIO_FAVORITO
    WHERE ID_PRODUTO = ?
    `;
    const [resp] = await con.query(comando, [id]);
    return resp.affectedRows;
}

export async function deletarCor(idProduto) {
    const comando =`
        delete from tb_cor 
        where id_produto = ?
    `;

    const [resp] = await con.query(comando, [idProduto]);
    return resp.affectedRows;
}

export async function deletarTamanho(idProduto) {
    const comando =`
    delete from tb_tamanho 
    where id_produto= ?
    `;

    const [resp] = await con.query(comando, [idProduto]);
    return resp.affectedRows;
}

export async function deletarProduto(idProduto) {
    const comando =`
        delete from tb_produto 
        where id_produto = ?
    `;

    const [resp] = await con.query(comando, [idProduto]);
    return resp.affectedRows;
}

    export async function deletarImagem(idProduto) {
        const comando =`
            delete from tb_imagem 
            where id_produto = ?
        `;
    
        const [resp] = await con.query(comando, [idProduto]);
        return resp.affectedRows;
}

export async function deletarImagensDiferentes(idProduto, imagens) {
    const comando =`
        delete from tb_imagem 
        where id_produto = ?
        and img_destaque = false
        and img_produto NOT IN (?)
    `;

    const resp = await con.query(comando, [idProduto, imagens]);
    return resp.affectedRows;
}

// ALTERAR PRODUTO

export async function buscarProduto(id) {
    const comando=`
        select 
        id_produto      as id,
        nm_produto      as nome,
        vl_preco        as preco,
        tb_produto.id_categoria    as categoria,
        tb_produto.id_tema         as tema,
        ds_descricao    as descricao,
        ds_disponivel   as disponivel,
        nm_categoria     as NomeCategoria,
        nm_tema             as NomeTema
        from tb_produto
        inner join tb_categoria on tb_categoria.id_categoria = tb_produto.id_categoria
        inner join tb_tema on tb_tema.id_tema = tb_produto.id_tema
        where id_produto = ?
    `;
    //talvez precise arrumar

    const [registros] = await con.query(comando, [id]);
    return registros[0];
}

export async function buscarCorProduto(id) {
    const comando = `
    select
    nm_cor as nome_cor
    from tb_cor
    where id_produto = ?
    `;

    const [registros] = await con.query(comando, [id]);
    return registros.map(item => item.nome_cor);
}

export async function buscarTamanhoProduto(id) {
    const comando = `
    select 
    ds_tamanho  as tamanho
    from tb_tamanho
    where id_produto = ?
    `;

    const [registros] = await con.query(comando, [id]);
    return registros.map(item => item.tamanho);
}


export async function buscarImagemProduto(id){
    const comando = `
    select
    img_produto as url
    from tb_imagem
    where id_produto = ?
    and img_destaque = false
    `;

    const [registros] = await con.query(comando, [id]);
    return registros.map(item => item.url);
}

export async function buscarDestaque(id) {
    const comando= `
    select img_produto as url
    from tb_imagem 
    where 
        img_destaque = true 
    and 
        id_produto = ?;
    `;

    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}


export async function alterarCor(id, cor) {
    const comando = `
    INSERT INTO TB_COR (ID_PRODUTO, NM_COR)
    VALUES(?, ?) `;
    const resp = await con.query(comando, [id, cor])
    return resp.affectedRows;
}

export async function alterarTamanho(id, tamanho) {
    const comando = `
    INSERT INTO TB_TAMANHO (ID_PRODUTO, DS_TAMANHO)
    VALUES(?, ?) `;
    const [resp] = await con.query(comando, [id, tamanho]);
    return resp.affectedRows;
}


//

export async function Resposta(resposta){
    const comando = `
    INSERT INTO TB_RESPOSTA(ID_PRODUTO_AVALIACAO, DS_RESPOSTA)
VALUES(?, ?);
`;
    const[resp] = await con.query(comando, [
        resposta.avaliacao,
        resposta.resposta
    ])   
    resposta.id = resp.insertId;
    return resposta;
}


// tema

export async function alterarTemaProduto(novoId, id){
    const comando = `
    update tb_produto 
    set id_tema = ?
    where id_tema = ?
    `;

    const r = await con.query(comando, [novoId, id]);
    return r.affectedRows;
}
