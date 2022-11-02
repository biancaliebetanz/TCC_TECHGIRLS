USE geek_db;

-- LOGIN ADM
    INSERT INTO TB_ADM_LOGIN (ID_ADM_LOGIN , NM_ADM , DS_EMAIL , DS_SENHA ) 
        VALUES ( 1,'admin','admin@admin.com.br', '1234');
    
select ID_ADM_LOGIN id,
     NM_ADM nome,
     DS_EMAIL  email
	FROM TB_ADM_LOGIN
    WHERE DS_EMAIL = 'admin@admin.com.br'
    AND DS_SENHA  = '1234';


 -- TEMA
    INSERT INTO TB_TEMA (ID_TEMA, NM_TEMA, DS_COR) 
        VALUES (1,'stranger', '#FFFF');

    select ID_TEMA  id,
           NM_TEMA  nome,
           DS_COR   cor
    FROM TB_TEMA
    WHERE NM_TEMA = 'NARUTO'
    AND DS_COR = '#FFF30';
    


-- CATEGORIA 

    INSERT INTO TB_CATEGORIA (ID_CATEGORIA, NM_CATEGORIA)
        VALUES (1,'Roupa');
    
    SELECT ID_CATEGORIA   ID,
			NM_CATEGORIA  NOME
    FROM TB_CATEGORIA
    WHERE NM_CATEGORIA = 'Roupa';

SELECT
		ID_PRODUTO		ID, 
		ID_TEMA			TEMA, 
		ID_CATEGORIA 	CATEGORIA,
		NM_PRODUTO 		NOME,
		VL_PRECO 		PRECO,
		DS_DESCRICAO 	DESCRICAO,
		BT_DISPONIVEL	DISPONIVEL
FROM TB_PRODUTO
WHERE NM_PRODUTO = 'Faixa NARUTO';


SELECT * FROM TB_COR;

-- CADASTAR NOVO PRODUTO 

INSERT INTO TB_PRODUTO ( ID_TEMA , ID_CATEGORIA, NM_PRODUTO, VL_PRECO, DS_DESCRICAO, ds_DISPONIVEL)
VALUES ( 1, 1,'Camisa naruto',  30.00, 'camisa super confortável', true);

SELECT * FROM TB_PRODUTO;


-- ADICIONAR TAMANHO 
INSERT INTO TB_TAMANHO (ID_PRODUTO, DS_TAMANHO)
VALUES(1, 'P');

-- ADICIONAR COR
INSERT INTO TB_COR (ID_COR, ID_PRODUTO, NM_COR)
VALUES(1, 1, 'Laranja');


insert into tb_produto_categoria (id_categoria, id_produto)
values (1, 1);       

-- inserir usuario
insert into TB_USUARIO(ID_USUARIO, NM_USUARIO, DS_TELEFONE, DS_CPF, DS_RG)
values(1, 'Giovana', '5522-5522', '678.765,876-12', '123.456.34'); 

-- inserir login usuario
  insert into tb_usuario_login( id_usuario, ds_email, ds_senha)
    values(1, 'user@user.com', '1234' );
    
-- inserir endereço
INSERT INTO TB_USUARIO_ENDERECO(ID_USUARIO_ENDERECO, ID_USUARIO, DS_CEP, NM_REFERENCIA, DS_ENDERECO, DS_BAIRRO, DS_CIDADE, DS_ESTADO, NR_NUMERO, DS_COMPLEMENTO_REF)
    VALUES(1, 1, '04852-401', 'CASA', 'RUA JJJJJ', 'JD. NNNN', 'Embu-Guaçu', 'São Paulo - SP', 5, 'PERTO DO MERCAADINHO');

        insert into TB_CARTAO (ID_CARTAO, ID_USUARIO_LOGIN, DS_NUMERO, DT_VALI    DADE, DS_CODIGO, DS_CPF)
    VALUES(1, 1, '000 000 000 000', '2023-09-12', '401', '000.000.000-00');


select 
tb_produto.id_produto as id,
nm_produto as nome, 
ds_descricao as descricao, 
vl_preco as preco, 
ds_disponivel as disponivel, 
nm_categoria as categoria, 
nm_tema as tema, 
nm_cor as cores,
img_produto as destaque
from tb_produto
inner join tb_categoria on tb_produto.id_categoria = tb_categoria.id_categoria
inner join tb_tema on tb_produto.id_tema = tb_tema.id_tema
inner join tb_cor on tb_cor.id_produto = tb_produto.id_produto
inner join tb_tamanho on tb_tamanho.id_produto = tb_produto.id_produto
inner join tb_imagem on tb_imagem.id_produto = tb_produto.id_produto
where img_destaque = true
and tb_produto.id_produto = 5;

-- endereco
    select id_usuario 			as id,
			ds_cep	  			as cep,
			nm_referencia	    as referencia,
            ds_endereco			as endereco,
			ds_bairro			as bairro,
            ds_cidade			as cidade,
            ds_estado			as estado,
            nr_numero			as numero
from tb_usuario_endereco
where id_usuario = ?;

select * from tb_usuario;
select * from tb_pedido_item where id_pedido =11;
select * from tb_cartao;
delete from tb_pedido where id_pedido != 0;
delete from tb_usuario where id_usuario != 1;

select
		id_pedido 			as id_pedido,
		nm_usuario 			as nome,
        vl_subtotal			as preco,
        ds_situacao			as situacao,
        ds_cep				as cep,
        dt_pedido 			as data
from tb_pedido
inner join tb_usuario on tb_usuario.id_usuario = tb_pedido.id_usuario
inner join tb_usuario_endereco on tb_usuario_endereco.id_usuario = tb_pedido.id_usuario;