CREATE DATABASE GEEK_DB;
USE GEEK_DB;

CREATE TABLE TB_ADM_LOGIN 
( 	ID_ADM_LOGIN 		INT PRIMARY KEY auto_increment,
	NM_ADM 				VARCHAR(100),
	DS_EMAIL 			VARCHAR(100),
	DS_SENHA 			VARCHAR(20)
);

CREATE TABLE TB_BANNER (
	ID_BANNER INT PRIMARY KEY AUTO_INCREMENT,
    IMG_BANNER  varchar(800),
    DS_LINK VARCHAR(200)
);

CREATE TABLE TB_TEMA (
	ID_TEMA INT PRIMARY KEY AUTO_INCREMENT,
    NM_TEMA VARCHAR(50),
    DS_COR  VARCHAR(20),
    IMG_TEMA  varchar(800),
    IMG_FUNDO	varchar(800)
);


CREATE TABLE TB_CATEGORIA (
	ID_CATEGORIA INT PRIMARY KEY AUTO_INCREMENT,
    NM_CATEGORIA VARCHAR(50)
);

CREATE TABLE TB_USUARIO (
        ID_USUARIO 	    INT PRIMARY KEY AUTO_INCREMENT,
        NM_USUARIO 	    VARCHAR(100),
        DS_TELEFONE	    VARCHAR(20),
        DS_CPF		    VARCHAR(20),
        DS_RG		    VARCHAR(22),
        DT_NASCIMENTO   DATE
);

CREATE TABLE TB_PRODUTO (
	ID_PRODUTO 		INT PRIMARY KEY AUTO_INCREMENT,
    ID_TEMA 		INT,
    ID_CATEGORIA	INT,
    NM_PRODUTO 		VARCHAR(100),
    VL_PRECO		decimal(10,2),
    DS_DESCRICAO	VARCHAR(500),
    DS_DISPONIVEL	BOOL,
    FOREIGN KEY (ID_TEMA) REFERENCES TB_TEMA (ID_TEMA),
	FOREIGN KEY (ID_CATEGORIA) REFERENCES TB_CATEGORIA (ID_CATEGORIA)
);


CREATE TABLE TB_TAMANHO(
	ID_TAMANHO INT PRIMARY KEY AUTO_INCREMENT,
    ID_PRODUTO INT,
    DS_TAMANHO VARCHAR(5),
    FOREIGN KEY (ID_PRODUTO) REFERENCES TB_PRODUTO (ID_PRODUTO)
);

CREATE TABLE TB_COR (
	ID_COR 			INT PRIMARY KEY AUTO_INCREMENT,
    ID_PRODUTO 		INT,
    NM_COR			VARCHAR(20),
    foreign key (id_produto) references tb_produto(id_produto)
);

CREATE TABLE TB_IMAGEM (
	ID_IMAGEM        INT PRIMARY KEY AUTO_INCREMENT,
    ID_PRODUTO       INT,
    IMG_PRODUTO      varchar(800),
    IMG_DESTAQUE	 BOOLEAN,
FOREIGN KEY (ID_PRODUTO) REFERENCES TB_PRODUTO (ID_PRODUTO)
);
 
 CREATE TABLE TB_USUARIO_LOGIN (
	ID_USUARIO_LOGIN   INT PRIMARY KEY AUTO_INCREMENT,
    ID_USUARIO         INT,
    DS_EMAIL           varchar(100),
    DS_SENHA           VARCHAR(100),
    FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO (ID_USUARIO)
    );
    
CREATE TABLE TB_USUARIO_ENDERECO (
	ID_USUARIO_ENDERECO  INT PRIMARY KEY AUTO_INCREMENT,
	ID_USUARIO           INT,
	DS_CEP               VARCHAR(15),
	NM_REFERENCIA   	 VARCHAR(50),
	DS_ENDERECO          VARCHAR(150),
	DS_BAIRRO            VARCHAR(100),
	DS_CIDADE            VARCHAR(50),
	DS_ESTADO            VARCHAR(100),
	NR_NUMERO            INT,
    FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO (ID_USUARIO)
    );
    
CREATE TABLE TB_CARTAO (
	ID_CARTAO         INT PRIMARY KEY AUTO_INCREMENT,
    ID_USUARIO_LOGIN  INT,
    NM_NOME_CARTAO	  VARCHAR(100),
    DS_NUMERO         VARCHAR(20),
    DT_VALIDADE       DATE,
    DS_CODIGO        VARCHAR(20),
    DS_CPF           VARCHAR(14),
    NR_PARCELAS        INT,
    FOREIGN KEY (ID_USUARIO_LOGIN) REFERENCES TB_USUARIO_LOGIN (ID_USUARIO_LOGIN)
    );
    
CREATE TABLE TB_PEDIDO (
	ID_PEDIDO           INT PRIMARY KEY AUTO_INCREMENT,
    ID_USUARIO          INT,
    ID_USUARIO_ENDERECO INT,
    ID_CARTAO           INT,
    TP_FRETE			VARCHAR(100),
    VL_SUBTOTAL			DECIMAL(10, 2),
    DS_SITUACAO        VARCHAR(200),
    DT_PEDIDO          DATE,
    VL_FRETE           DOUBLE,
    FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO (ID_USUARIO),
    FOREIGN KEY (ID_USUARIO_ENDERECO) REFERENCES TB_USUARIO_ENDERECO (ID_USUARIO_ENDERECO),
    FOREIGN KEY (ID_CARTAO) REFERENCES TB_CARTAO (ID_CARTAO)
    );

    create table tb_pedido_item(
    id_pedido_item 		int primary key auto_increment,
    id_produto 			int,
    id_pedido			int,
    qtd_itens			int,
    vl_produto			decimal(10, 2),
    foreign key (id_produto) references tb_produto (id_produto),
    foreign key (id_pedido) references tb_pedido (id_pedido)
);
    
CREATE TABLE TB_USUARIO_FAVORITO (
	ID_USUARIO_FAVORITO      INT PRIMARY KEY AUTO_INCREMENT,
    ID_USUARIO               INT,
    ID_PRODUTO               INT,
    FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO (ID_USUARIO),
    FOREIGN KEY (ID_PRODUTO) REFERENCES TB_PRODUTO (ID_PRODUTO)
);

CREATE TABLE TB_PRODUTO_AVALIACAO (
	ID_PRODUTO_AVALIACAO      INT PRIMARY KEY AUTO_INCREMENT,
    ID_PRODUTO                INT,
    ID_USUARIO                INT,
    VL_NOTA                   DOUBLE,
    DS_COMENTARIO             VARCHAR(300),
    DT_AVALIACAO              DATE,
    FOREIGN KEY (ID_PRODUTO) REFERENCES TB_PRODUTO (ID_PRODUTO),
    FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO (ID_USUARIO)
    );
    
CREATE TABLE TB_RESPOSTA (
	ID_RESPOSTA                   INT PRIMARY KEY AUTO_INCREMENT,
    ID_PRODUTO_AVALIACAO          INT,
    DS_RESPOSTA                   VARCHAR(100),
    FOREIGN KEY (ID_PRODUTO_AVALIACAO) REFERENCES TB_PRODUTO_AVALIACAO (ID_PRODUTO_AVALIACAO)
    );

CREATE TABLE TB_CARRINHO (
	ID_CARRINHO           INT PRIMARY KEY AUTO_INCREMENT,
    ID_PEDIDO             INT,
    ID_PRODUTO            INT,
    ID_COR        INT,
    ID_TAMANHO    INT,
    FOREIGN KEY (ID_PEDIDO) REFERENCES TB_PEDIDO (ID_PEDIDO),
    FOREIGN KEY (ID_PRODUTO) REFERENCES TB_PRODUTO (ID_PRODUTO),
    FOREIGN KEY (ID_COR) REFERENCES TB_COR (ID_COR),
    FOREIGN KEY (ID_TAMANHO) REFERENCES TB_TAMANHO (ID_TAMANHO)
    );
    
    create table tb_produto_categoria (
	id_produto_categoria	int primary key auto_increment,
    id_categoria			int,
    id_produto				int,
    foreign key (id_categoria) references tb_categoria (id_categoria),
    foreign key (id_produto) references tb_produto (id_produto)
);



