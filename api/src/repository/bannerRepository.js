import { con } from "./connection.js";


export async function InserirBanner(banner){
    const comando = `
    INSERT INTO TB_BANNER(IMG_BANNER)
    VALUES(?)`;

    const resposta = await con.query(comando, [banner]);
    return resposta.status;
}

export async function AlterarBanner(id, banner){
    const comando = `
    UPDATE TB_BANNER
    SET DS_LINK     = ?
    WHERE ID_BANNER =?`;
    const [resp] = await con.query(comando, [banner.link, id
])
    banner.id = id;
    return banner;
}


export async function listarTodosBanner() {
    const comando =
        `SELECT ID_BANNER		id,
                DS_LINK		link
           FROM TB_BANNER`;
    
    const [linhas] = await con.query(comando);
    return linhas;
}



export async function alterarImagemBanner(banner, id) {
    const comando =
        `UPDATE TB_BANNER 
            SET IMG_BANNER     = ?
        WHERE ID_BANNER        = ? `;
    
    const [resposta] = await con.query(comando, [banner, id]);
    return resposta.affectedRows;
}

export async function deletarBanner (id){
    const comando = `
    DELETE FROM TB_BANNER
    WHERE ID_BANNER = ? `;

    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}


