import './index.scss'

import Tema from '../../../components/tema/tema.js';
import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { buscarPorId } from '../../../API/Usuario.js';
import Storage from 'local-storage';
import { API_URL } from '../../../API/config';
import { toast } from 'react-toastify';
import Legendas from '../../../components/cabLegenda';
import Rodape from '../../../components/rodape';

export default function Index(){
    const[produto, setProduto]= useState({cores:[], tamanho:[], imagens:[] , destaque:{}, info:{} });
    const[imagemPrincipal, setImagemPrincipal] = useState(0);
    
    const { id } = useParams();
    
    async function carregarPagina(){
        const resposta= await buscarPorId(id);
        setProduto(resposta);
        buscarDestaque();
    }


    //function ExibirImagemPrincipal(){
     //   if(produto.imagens.length > 0){
     //       return API_URL + '/' + produto.destaque.url[imagemPrincipal];
     //   }
      //  else{
      //      return '/produto-padrao.png';
     //   }
    //}

    function exibirDestaque(dest) {
        if(!imagemPrincipal)
        return API_URL + '/' + produto.destaque.url;
        else
        return imagemPrincipal;
    }

    function buscarDestaque(){
        return API_URL + '/' + produto.destaque.url;
    }

    function exibirImagensProduto(imagem){
        return API_URL + '/' + imagem;

    }

    function adicionarAoCarrinho(){
        let carrinho = [];
        if(Storage('carrinho')){
            carrinho = Storage('carrinho');
        }
        if(!carrinho.find(item => item.id === id )){
            carrinho = [...carrinho, {id: id, qtd : 1}]
        }
        Storage('carrinho', carrinho);
        toast.dark('Produto adicionado ao carrinho')
    }
    
    useEffect(() => {
        carregarPagina();
    }, [])


    return(
        <main className="main">
            <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
            <Legendas nome={produto.info.NomeTema} />  

            <section className='alinhamento-pag'>
                <article className='detalhes'>
                 <div className='info esp'>
                    <h1 className='nome'> {produto.info.nome} </h1>
                    <div>
                        <h3> Descrição </h3>
                        <p className='descricao'> {produto.info.descricao} </p>
                    </div>
                    <div className='categoria'>  
                        <h3> Categoria: </h3>
                        <p className='descricao'>{produto.info.NomeCategoria} </p> 
                    </div>
                </div>

                <div className='imgs esp'>
                    <img className="img" src={exibirDestaque()} />
                
                    <div>
                        <img className='img-mini' src={buscarDestaque()} onClick={() => setImagemPrincipal()}/>
                        {produto.imagens.map((item, pos) =>
                            <img className="img-mini" src={exibirImagensProduto(item)} onClick={() => setImagemPrincipal(exibirImagensProduto(item))}/>
                            )}
                    </div>
                </div>
               
                <div className='preco esp'>
                        <h1 className='nome'> R$ {produto.info.preco}</h1>
                        <div>
                            <h4> Cor </h4>
                            <div>
                                
                            {produto.cores.map(item => 
                                <span  className='itemzinho'> {item} </span>
                            )}
                            </div>
                        </div>
                        <div>
                            <h4> Tamanho</h4>
                            <div>
                            {produto.tamanho.map(item => 
                                <span  className='itemzinho'> {item} </span>
                            )}
                            </div>
                        </div>
                        <button className='botaozinhodetalhe' onClick={adicionarAoCarrinho}> Adicionar ao carrinho </button> 
                </div>

            </article>
            </section>

            <div>
                <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png'  logo='./../../../images/logo.png'></Rodape>

            </div>
                
            
            

        </main>

    )
}