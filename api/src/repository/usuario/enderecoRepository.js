import { con } from "../connection.js";

export async function listarEndereco(id){
    const comando = `
    select id_usuario 			as id,
			ds_cep	  			as cep,
			nm_referencia 	    as referencia,
            ds_endereco			as endereco,
			ds_bairro			as bairro,
            ds_cidade           as cidade,
            ds_estado			as estado,
            nr_numero			as numero
from tb_usuario_endereco
where id_usuario = ? `;

const [registros] = await con.query(comando, [id]);
return registros;
}

export async function inserirEndereco(id, endereco){
    const comando = `
    insert into tb_usuario_endereco (id_usuario, ds_cep, nm_referencia, ds_endereco, ds_bairro, ds_cidade, ds_estado, nr_numero)
    values(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [registros] = await con.query(comando, [id, endereco.cep, endereco.referencia, endereco.endereco, endereco.bairro, 
    endereco.cidade, endereco.estado, endereco.numero])

    return registros;
}

export async function deletarEndereco (id){
    const comando = `
    DELETE FROM TB_USUARIO_ENDERECO
    WHERE ID_USUARIO = ? `;

    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}