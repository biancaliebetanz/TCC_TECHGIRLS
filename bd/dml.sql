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

    
-- CATEGORIA 

INSERT INTO TB_CATEGORIA ( NM_CATEGORIA)
	VALUES ('Vestimenta');
    
INSERT INTO TB_CATEGORIA ( NM_CATEGORIA)
	VALUES ('Acessório');
    
INSERT INTO TB_CATEGORIA ( NM_CATEGORIA)
	VALUES ('Caneca');
    
INSERT INTO TB_CATEGORIA ( NM_CATEGORIA)
	VALUES ('Pelúcia');

INSERT INTO TB_CATEGORIA (nm_categoria)
	VALUES ('Colecionável');

INSERT INTO TB_CATEGORIA (nm_categoria)
    VALUES ('Funko');
    
INSERT INTO TB_CATEGORIA (nm_categoria)
    VALUES ('Decoração');


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


-- listar pedidos

select
		id_pedido 			as id_pedido,
		nm_usuario 			as nome,
        vl_subtotal			as preco,
        ds_situacao			as situacao,
        ds_cep				as cep,
        dt_pedido 			as data
from tb_pedido
inner join tb_usuario on tb_usuario.id_usuario = tb_pedido.id_usuario
inner join tb_usuario_endereco on tb_usuario_endereco.id_usuario = tb_pedido.id_usuario
where tb_usuario_endereco.id_usuario_endereco = tb_pedido.id_usuario_endereco;