import { Link } from "react-router-dom";
import Storage from 'local-storage'
import "../../../common/common.scss"
import CabecalhoPrincipal from "../../../components/cabecalhoPrincipal/cabecalhoPrinc.js";
import BoxProdutoTema from "../../../components/boxProduto/boxProdutoTema.js";
import "./index.scss"
import { buscarPorId, ListarProdutosInicio } from "../../../API/Usuario.js";
import { useEffect, useState, useRef } from "react";
import Rodape from "../../../components/usuario/rodape"
import { API_URL } from "../../../API/config";
import { Temas } from "../../../API/tema/temaAPI.js";

export default function Index() {
    const [produtos, setProdutos] = useState([]);
    const [itens, setItens] = useState([]);
    const carousel = useRef(null);
    const carrossel = useRef();
    const [widht, setWidht] = useState(0);

    const [temas, setTemas] = useState([]);

    useEffect(() => {
        console.log(carrossel.current?.scrollWidth, carrossel.current?.offsetWidth);
        setWidht(carrossel.current?.scrollWidth - carrossel.current?.offsetWidth)
    }, [])

    const handleLeftClick = (e) => {
        e.preventDefault();
        console.log(carousel.current.offsetWidth);
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        console.log(carousel.current.offsetWidth);
        carousel.current.scrollLeft += carousel.current.offsetWidth;

    }


    async function listar() {
        const r = await ListarProdutosInicio();
        setProdutos(r);
    }

    async function listarTemas() {
        const r = await Temas();
        setTemas(r);
        console.log(r)
    }

    async function CarregarCarrinho() {
        let carrinho = Storage('carrinho')
        if (carrinho) {
            let temp = [];
            for (let produto of carrinho) {
                let p = await buscarPorId(produto.id);
                temp.push({
                    produto: p,
                    qtd: produto.qtd,

                })
            }
            console.log(temp)
            setItens(temp)
        }
    }

    function exibir(imagem) {
        return `${API_URL}/${imagem}`;
    }

    useEffect(() => {
        listar();
        if(Storage('cliente-logado')){
        CarregarCarrinho();
        }
        listarTemas();
    }, [])

    return (
        <main className="main">

            <div>
            <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png' fav='../../../images/favoritos.png'
                user='../../../images/user.png' sacola='../../../images/sacola.png' />

            </div>
            <section className="landing-conteudo">
                <div className="container-banner">
                    <Link to='/strangerThings'>
                        <img className="banner" src='../../../images/Stranger things 1.png' />
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
                            <button onClick={handleLeftClick}> <img src="./../../../images/Vector.png" /></button>

                        </div>
                        <div className="container">

                            <h3 className="titulo-h3">Produtos mais buscados</h3>


                            <div className="carousel" ref={carousel}>
                                <div className="item">
                                    {produtos.map(item =>
                                        <div className="item">
                                            <BoxProdutoTema nome={item.nome} imagem={item.imagem} preco={item.preco} id={item.id} />
                                        </div>
                                    )}
                                </div>


                            </div>


                        </div>
                        <div className="bts">
                            <button onClick={handleRightClick}><img src="./../../../images/Vector2.png" /></button>

                        </div>

                    </div>
                </div>

                <div className="sessaoTemas">

                    <h2 className="encontre">Encontre produtos incríveis!</h2>

                    <div className="sessao">

                        {temas.map(item =>
                            <div className="card">
                                <img className="imagem-tema" alt='' src={exibir(item.imagem)} />
                                <div style={{ backgroundColor: item.cor }}>
                                    <Link className="tema-link" to={'/usuario/tema/' + item.id}> {item.nome} </Link>
                                </div>
                            </div>
                        )}

                    </div>
                    </div>

                <div className="Bem-vindo">
                      <h3 className="h3-bemVindo">Bem-vindo a GeekPlanet, a Maior Loja Geek do Brasil!</h3>
                <p className="texto">A ideia de criar uma loja virtual voltada para a cultura pop veio de um grupo de amigas nerds. Nosso objetivo é trazer produtos com qualidade, buscando valorizar as obras que os estampam.</p>


                </div>
                <div>
                <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png'  logo='./../../../images/logo.png'></Rodape>

            </div>


            </section>
        



        </main>
    )
}