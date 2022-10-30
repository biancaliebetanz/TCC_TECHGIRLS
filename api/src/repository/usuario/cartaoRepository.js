import { con } from "../connection.js";

export async function inserirNovoCartao(idUsuario, cartao) {
    const comando = `
    INSERT INTO TB_CARTAO (ID_USUARIO_LOGIN, NM_NOME_CARTAO, DS_NUMERO, DT_VALIDADE, DS_CODIGO, DS_CPF, NR_PARCELAS)
    VALUES( ?, ?, ?, ?, ?, ?, ?)`;
    const [resposta] = await con.query(comando , [
        idUsuario,
        cartao.nomeCartao,
        cartao.numero,
        cartao.validade,
        cartao.codigo,
        cartao.cpf,
        cartao.parcelas
    ])

    cartao.id = resposta.insertId;
    return cartao;
}

export async function deletarCartao (id){
    const comando = `
    DELETE FROM TB_CARTAO
    WHERE ID_CARTAO = ? `;

    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}

export async function alterarDadosCartao(id, cartao){
    const resp= `
    UPDATE TB_CARTAO
    SET
        ID_USUARIO_LOGIN   = ?,
        DS_NUMERO          = ?,
        DT_VALIDADE        = ?,
        DS_CODIGO          = ?,
        DS_CPF             = ?
    WHERE ID_CARTAO = ?`

    const [resposta] = await con.query(resp , [
        cartao.usuario,
        cartao.numero,
        cartao.validade,
        cartao.codigo,
        cartao.cpf,
        id
    ])
    cartao.id = id;
    return cartao;
}

export async function listarTodosCartoes(){
    const resposta = `
    SELECT
    ID_CARTAO           id,
    ID_USUARIO_LOGIN    usuario,
    DS_NUMERO           numero,
    DT_VALIDADE         validade,
    DS_CODIGO           codigo,
    DS_CPF              cpf
    FROM TB_CARTAO`;
   
    const [linhas] = await con.query(resposta);
    return linhas;
}