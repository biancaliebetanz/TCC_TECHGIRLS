import { con } from "../connection.js";

export async function listarTemas() {
    const comando = `
        select id_tema         as id,
               nm_tema         as nome,
               ds_cor          as cor,
               img_tema        as imagem
        from tb_tema
    `;

    const [linhas] = await con.query(comando);
    return linhas;
}

export async function EditarTema(id, tema){
    const comando= `
    UPDATE TB_TEMA
        SET NM_TEMA    = ?,
        DS_COR          =?
        WHERE   ID_TEMA =?`;

        const [resposta] = await con.query(comando, [
            tema.nome,
            tema.cor,
            id
        ])
        tema.id = id;
        return tema;
}

export async function inserirTema(tema){
    const resp = `
    INSERT INTO TB_TEMA (NM_TEMA, DS_COR) 
    VALUES (? , ?)
`;
    const [resposta] = await con.query(resp ,[tema.nome, tema.cor])
    
    tema.id = resposta.insertId;
    return tema;  
}


export async function DeletarTema(id){
    const comando = `DELETE FROM TB_TEMA
        WHERE ID_TEMA = ?`;
    
        const [resposta] = await con.query(comando, [id]);
        return resposta.affectedRows;
    }

    export async function listarImagemTema(id) {
        const comando = `
            select img_tema     as imagem
              from tb_tema
            where id_tema = ?
        `;
    
        const r = await con.query(comando, [id]);
        return r[0];
}

    export async function buscarIdTema(id) {
        const comando = `
        SELECT ID_TEMA 			ID,
        NM_TEMA			NOME,
        DS_COR			COR,
        IMG_TEMA AS IMAGEM
        FROM TB_TEMA
        WHERE ID_TEMA = ?
        `;
    
        const [registros] = await con.query(comando, [id]);
        return registros[0];
    }

    export async function inserirImagemTema(id, imagem){
        const comando= `
        UPDATE TB_TEMA
        SET IMG_TEMA    = ?
        WHERE ID_TEMA   = ?
        `;

        const r = await con.query(comando, [imagem, id]);
        return r.affectedRows;

    }
