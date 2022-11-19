import { con } from "../connection.js";

export async function buscarUsuario(id){ 
    const comando= `
    select 
    id_usuario as id,
    nm_usuario as nome,
    ds_telefone as telefone,
    ds_cpf as cpf,
    ds_rg as rg,
    date_format(dt_nascimento, "%d/%m/%Y") as nascimento
    from tb_usuario
    where id_usuario = ?`;

    const [r] = await con.query(comando, [id]);
    return r[0];
}


export async function BuscarInfoLogin(id) {
    const comando =
        `
        select
                ID_USUARIO_LOGIN    as idUserLogin,
                DS_EMAIL	        as email,
                DS_SENHA	        as senha
        FROM TB_USUARIO_LOGIN
        WHERE id_usuario = ?;    
    `
    const [resposta] = await con.query(comando, [id])
    return resposta[0]
}


export async function inserirUsuario(usuario){
    
    const comando = `
    insert into tb_usuario(nm_usuario, ds_telefone, ds_cpf, ds_rg, dt_nascimento) 
    values( ?, ?, ?, ?, ?)
    `;

    const [resposta] = await con.query(comando, [usuario.nome, usuario.telefone, usuario.cpf, usuario.rg, usuario.nascimento]);
    usuario.id = resposta.insertId;
    
    return usuario;
}

export async function AlterarInfosUsuarios(id, usuario){
    const resposta = `
    UPDATE TB_USUARIO
        SET
            NM_USUARIO        = ?, 
            DS_TELEFONE       =  ?,
            DS_CPF            =  ?, 
            DS_RG             =  ?, 
            DT_NASCIMENTO     =  ?
            WHERE ID_USUARIO    = ?`

    const [comando] = await con.query (resposta, [
                usuario.nome,
                usuario.telefone,
                usuario.cpf,
                usuario.rg,
                usuario.nascimento,
                id]);
    usuario.id = id;
    return usuario;
}



export async function inserirEndereco(endereco) {
    const comando = `
    INSERT INTO TB_USUARIO_ENDERECO (ID_USUARIO, DS_CEP, NM_NOME_RESIDENCIA, DS_ENDERECO, DS_BAIRRO, DS_ESTADO, DS_UF, NR_NUMERO, DS_COMPLEMENTO_REF)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [resp] = await con.query(comando, [
                                                        endereco.usuario,
                                                        endereco.cep,
                                                        endereco.residencia,
                                                        endereco.endereco,
                                                        endereco.bairro,
                                                        endereco.estado,
                                                        endereco.uf,
                                                        endereco.numero,
                                                        endereco.complemento
            ])
        
    endereco.id = resp.insertId;
    return endereco;
}

export async function listarEnderecos(){
    const resposta = `
    SELECT 
    ID_USUARIO_ENDERECO         id, 
    ID_USUARIO                  usuario,
    DS_CEP                      cep,
    DS_ENDERECO                 endereco,
    DS_BAIRRO                   bairro,
    DS_ESTADO                   estado,
    NR_NUMERO                   numero,
    DS_COMPLEMENTO_REF          complemento
    FROM TB_USUARIO_ENDERECO
    `;

    const [linhas] = await con.query (resposta);
    return linhas;
}

export async function alterarEndereco(id, endereco) {
    const comando =
            `UPDATE TB_USUARIO_ENDERECO
            SET
                ID_USUARIO           = ?,
                DS_CEP               = ?,
                NM_NOME_RESIDENCIA   = ?,
                DS_ENDERECO          = ?,
                DS_BAIRRO            = ?,
                DS_ESTADO            = ?,
                DS_UF                = ?,
                NR_NUMERO            = ?,
                DS_COMPLEMENTO_REF   = ?
            WHERE ID_USUARIO_ENDERECO = ?`
            
        const [resposta] = await con.query(comando, [
            endereco.usuario,
            endereco.cep,
            endereco.residencia,
            endereco.endereco,
            endereco.bairro,
            endereco.estado,
            endereco.uf,
            endereco.numero,
            endereco.complemento,
            id
])
        endereco.id = id;
        return endereco;
}





export async function Avaliacao(avaliacao){
    const comando= `
    insert into TB_PRODUTO_AVALIACAO(ID_PRODUTO, ID_USUARIO, VL_NOTA, DS_COMENTARIO, DT_AVALIACAO)
VALUES (?, ?, ?, ?, ?);
`;
    const [resp] = await con.query(comando, [
                avaliacao.produto,
                avaliacao.usuario,
                avaliacao.nota,
                avaliacao.comentario,
                avaliacao.data
    ])
    avaliacao.id = resp.insertId;
    return avaliacao;
}

export async function listarAvaliacoes(){
        const resposta = `
        SELECT 
	ID_PRODUTO_AVALIACAO		ID, 
    ID_PRODUTO					PRODUTO, 
    ID_USUARIO					USUARIO, 
    VL_NOTA						NOTA,
    DS_COMENTARIO				COMENTARIO,
    DT_AVALIACAO				AVALIACAO
FROM TB_PRODUTO_AVALIACAO`;
        const [linhas] = await con.query(resposta);
        return linhas;
        
}

export async function Favoritos(usuario, produto){
    const comando= `
    insert into tb_usuario_favorito (id_usuario, id_produto)
values (?, ?)`;
    const resp = await con.query(comando, [
        usuario,
        produto
    ])
    return resp.affectedRows;
}


export async function removerProdutoFavoritos (id, produto) {
	const comando = `DELETE FROM TB_USUARIO_FAVORITO 
			 WHERE ID_USUARIO = ?
             AND ID_PRODUTO = ?`;

const [resp] = await con.query(comando, [id, produto]);
return resp.affectedRows;
}

export async function listarFavoritos(id){
    const comando= `
    select 
	tb_produto.id_produto 	as id,
	nm_produto 				as nome, 
	ds_descricao 			as descricao, 
	vl_preco 				as preco, 
	ds_disponivel 			as disponivel, 
	nm_categoria		 	as categoria,
	nm_tema 				as tema,
	img_produto 			as imagem
    from TB_USUARIO_FAVORITO
inner join tb_produto on tb_produto.id_produto = TB_USUARIO_FAVORITO.id_produto
inner join tb_categoria on tb_produto.id_categoria = tb_categoria.id_categoria
inner join tb_tema on tb_produto.id_tema = tb_tema.id_tema
inner join tb_imagem on tb_imagem.id_produto = tb_produto.id_produto
    where id_usuario = ?
    and img_destaque = true
`
    const [linhas] = await con.query(comando, [id]);
    return linhas;
}

export async function buscarFavorito(id, produto){
    const comando= `
    select 
	tb_produto.id_produto 	as id,
	nm_produto 				as nome, 
	ds_descricao 			as descricao, 
	vl_preco 				as preco, 
	ds_disponivel 			as disponivel, 
	nm_categoria		 	as categoria,
	nm_tema 				as tema,
	img_produto 			as imagem
    from TB_USUARIO_FAVORITO
inner join tb_produto on tb_produto.id_produto = TB_USUARIO_FAVORITO.id_produto
inner join tb_categoria on tb_produto.id_categoria = tb_categoria.id_categoria
inner join tb_tema on tb_produto.id_tema = tb_tema.id_tema
inner join tb_imagem on tb_imagem.id_produto = tb_produto.id_produto
    where id_usuario = ?
    and tb_usuario_favorito.id_produto = ?
    and img_destaque = true
`
    const [linhas] = await con.query(comando, [id, produto]);
    return linhas[0];
}






export async function AlterarSenha(id, senha){
    const resposta= `
    UPDATE TB_USUARIO_LOGIN
    SET
        DS_SENHA = ?
        WHERE ID_USUARIO_LOGIN =?`;
        
        const [resp] = await con.query(resposta, [senha.senha, id])
        
        senha.id = id;
        return senha;
}
export async function ListarPedidos(){
    const resposta =`
    select
	ID_PEDIDO				id,
    ID_USUARIO				usuario,
    ID_USUARIO_ENDERECO		endereco,
    ID_CARTAO				cartao,
    TP_FRETE                tipoFrete,
    VL_SUBTOTAL				subtotal,
    DS_SITUACAO				situacao,
    DT_PEDIDO				pedido,
    VL_FRETE				frete
    FROM TB_PEDIDO`;

    const [linhas] = await con.query(resposta);
    return linhas
}
