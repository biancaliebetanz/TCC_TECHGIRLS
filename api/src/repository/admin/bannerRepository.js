import { con } from "../connection.js";


export async function InserirBanner(banner, id) {
    const comando = `
    UPDATE TB_BANNER
    SET IMG_BANNER = ?
    WHERE ID_BANNER = ?`;

    const resposta = await con.query(comando, [banner, id]);
    return resposta.status;
}

export async function AlterarBanner(banner) {
    const comando = `
    INSERT INTO TB_BANNER ( BT_DESTAQUE)
    VALUES ( ?)`;
    const [resp] = await con.query(comando, [banner.destaque
    ])
    banner.id = resp.insertId;
    return banner;
}


export async function listarTodosBanner() {
    const comando =
        `SELECT 
            ID_BANNER	    as	id,
            DS_LINK	        as	link,
            IMG_BANNER      as banner,
            BT_DESTAQUE     as destaque
           FROM TB_BANNER`;

    const [linhas] = await con.query(comando);
    return linhas;
}

export async function buscarBanner(id) {
    const comando =
        `SELECT 
            ID_BANNER	    as	id,
            DS_LINK	        as	link,
            IMG_BANNER      as banner,
            BT_DESTAQUE     as destaque
           FROM TB_BANNER
        WHERE ID_BANNER = ?`;

    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}


// não usado 

export async function alterarImagemBanner(banner, id) {
    const comando =
        `UPDATE TB_BANNER 
            SET IMG_BANNER     = ?
        WHERE ID_BANNER        = ? `;

    const [resposta] = await con.query(comando, [banner, id]);
    return resposta.affectedRows;
}

//

export async function alterarBanner(id, destaque) {
    const comando =
        `UPDATE TB_BANNER 
            SET BT_DESTAQUE     = ?
        WHERE ID_BANNER         = ? `;

    const [resposta] = await con.query(comando, [destaque, id]);
    return resposta.status;
}

export async function deletarBanner(id) {
    const comando = `
    DELETE FROM TB_BANNER
    WHERE ID_BANNER = ? `;

    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}


