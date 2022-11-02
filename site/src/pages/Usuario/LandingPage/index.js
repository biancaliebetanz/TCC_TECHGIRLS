import { Link, useParams } from "react-router-dom";
import Storage from 'local-storage'
import "../../../common/common.scss"
import CabecalhoPrincipal from "../../../components/cabecalhoPrincipal/cabecalhoPrinc.js";
import CardProduto from "../../../components/cardProduto/cardProduto.js";
import BoxProdutoTema from "../../../components/boxProduto/boxProdutoTema.js";
import "./index.scss"
import { buscarPorId,  ListarProdutosInicio } from "../../../API/Usuario";
import { useEffect, useState, useRef } from "react";
import Rodape from "../../../components/rodape";

export default function Index(){
    const [produtos, setProdutos] = useState([]);
    const [itens, setItens] = useState([]);
    const carousel = useRef(null); 

    const handleLeftClick= (e) =>{
        e.preventDefault();
        console.log(carousel.current.offsetWidth);
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }

    const handleRightClick= (e) =>{
        e.preventDefault();
        console.log(carousel.current.offsetWidth);
        carousel.current.scrollLeft += carousel.current.offsetWidth;

    }
   

    async function listar(){
        const r = await ListarProdutosInicio();
        setProdutos(r);
    }

    async function CarregarCarrinho(){
        let carrinho= Storage('carrinho')
        if(carrinho){
            let temp= [];
            for(let produto of carrinho){
               let p = await buscarPorId(produto.id);
                temp.push({
                    produto: p,
                    qtd: produto.qtd,

                })
            }
            console.log(temp)
            setItens(temp)
        }}

    useEffect(() => {
        listar();
        CarregarCarrinho();
    }, [])

    return(
        <main className="main">

            <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
                user='../../../images/user.png' sacola='../../../images/sacola.png'/>

            <section className="landing-conteudo">
                <div>
                <Link to='/strangerThings'>
                    <img className="banner" src='../../../images/Stranger things 1.png'/> 
                </Link>  
                </div>

                <div className="faixa">
                    <img className="icons-1" src="../../../images/image 69.png"></img>
                    <p>Frete fixo de R$20,00 para todo território brasileiro</p>
                    <hr className="linha-vertical"></hr>
                    <img className="icons-2" src="../../../images/cartao.png"></img>
                    <p>Parcele em até 10x sem juros nas compras acima de R$599</p>
                    <hr className="linha-vertical"></hr>
                    <img className="icons-3" src="../../../images/image 22.png"></img>
                    <p>Troque ou devolva suas compras com facilidade no site</p>
                </div>

                        
               
                    <div>
                        
               <div className="div-astro">
                    <img className="astronauta" src="./../../../images/astronauta.png"></img>


               </div>

                    <div className="app">
                       
                       <div className="bts">
                                    <button onClick={handleLeftClick}> <img src="./../../../images/Vector.png"/></button>
   
                       </div>
                       <div className="container">
                           
                                            <h3 className="titulo-h3">Produtos mais buscados</h3>
       
                    
                    <div className="carousel" ref={carousel}>
                        <div className="item">
                            {produtos.map(item => 
                                <div className="item">
                                    <BoxProdutoTema nome={item.nome} imagem={item.imagem} preco={item.preco} id={item.id}/>
                                </div>
                                )}
                        </div>
                        
                                
                     </div>
                     
   
                </div>
                <div className="bts">
                                    <button onClick={handleRightClick}><img src="./../../../images/Vector2.png"/></button>
   
                       </div>
   
           </div>
                    </div>
                    
                
                <div>
                    
                <div className="sessaoTemas">
                        
                <h2 className="encontre">Encontre produtos incríveis!</h2>

                <div className="sessao">

                    <div className="card">
                        <img src="../../../images/card narutooo.png"></img>
                        <Link to='/Naruto' className="Tema1" >Naruto</Link>
                    </div>

                    <div className="card">
                        <img src="../../../images/card marvel.png"></img>
                        <Link to='/Marvel' className="Tema2" >Marvel</Link>
                    </div>

                    <div className="card">
                        <img src="../../../images/card harry potter.png"></img>
                        <Link to='/HarryPotter' className="Tema3" >Harry Potter</Link>
                    </div>

                    <div className="card">
                        <img src="../../../images/card queen.png"></img>
                        <Link to='/Queen' className="Tema4" >Queen</Link>
                    </div>

                </div>

                <div className="sessao">
                    <div className="card">
                        <img src="../../../images/cardBts.png"></img>
                        <Link to='/BTS' className="Tema3" >BTS</Link>
                    </div>
                    
                    <div className="card">
                        <img src="../../../images/card rick e morty.png"></img>
                        <Link to='/RickMorty' className="Tema5" >Rick e Morty</Link>
                    </div>
                    
                    <div className="card">
                        <img src="../../../images/card dragon ball.png"></img>
                        <Link to='/DragonBall' className="Tema1" >Dragon Ball</Link>
                    </div>
                    
                    <div className="card">
                        <img src="../../../images/card dc.png"></img>
                        <Link to='/DC' className="Tema6" >DC</Link>
                    </div>
                </div>
                </div>
                </div>
                <div className="Bem-vindo">
                    <img className="galaxia" src="../../../images/galaxia.png"></img>
                                <h3 className="h3">Bem-vindo a GeekPlanet, a Maior Loja Geek do Brasil!</h3>

                    <p className="texto">A ideia de criar uma loja virtual voltada para a cultura pop veio de um grupo de amigas nerds. Nosso objetivo é trazer produtos com qualidade, buscando valorizar as obras que os estampam.</p>
                </div>
                <Rodape></Rodape>

            </section>
           

            
        </main>
    )
}