import {con} from './connection.js'

export async function login (email, senha) {
    const comando = 
    `
    select ID_ADM_LOGIN as id,
           NM_ADM	 as nome,
           DS_EMAIL	as		email
      from TB_ADM_LOGIN
     where DS_EMAIL 		= ?
       and DS_SENHA			= ?
        `;
    
        const [respostas] = await con.query (comando, [email, senha]);
        return respostas [0];
    }

    export async function loginUsuario(email, senha) {
      const comando = `
      select 
            tb_usuario.id_usuario     as id,
            nm_usuario                as nome
      from tb_usuario_login
            inner join tb_usuario   
            on tb_usuario_login.id_usuario = tb_usuario.id_usuario
      where ds_email    = ?
      and ds_senha      = md5(?)`;

      const [resposta] = await con.query(comando, [email, senha]);
      return resposta[0];
    }

  export async function inserirUsuarioLogin(usuariologin){
    
    const comando= `
    insert into tb_usuario_login(id_usuario, ds_email, ds_senha)
    values( ?, ?, ?)
    `;
    
  
    const [r] = await con.query(comando, [ usuariologin.id_usuario, usuariologin.email, usuariologin.senha]);
    usuariologin.id= r.insertId;

    return usuariologin;
  }

  export async function CriptografarSenha(usuarioLogin){
    const comando = `
    update tb_usuario_login
    set ds_senha = md5(?)
    where id_usuario = ?
    `;

    const [r] = await con.query(comando, [usuarioLogin.senha, usuarioLogin.id_usuario]);
    return r[0];

  }