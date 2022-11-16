import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { buscarProdutosPorNome, ListarProdutosInicio } from '../../API/CadProduto.js';
import BoxProdutos2 from './../boxProdutos/boxProdutos2.js';
import './cabecalhoPrinc.scss';
import { buscarPorId } from "../../API/Usuario.js";
import Storage from 'local-storage'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../API/config.js";
import BoxProduto2 from "./../boxProdutos/boxProdutos2.js";
import ProdutoTema from "../boxProduto/boxProdutoTema.js";
import ProdutoBusca from "../busca/index.js";

export default function CabecalhoPrincipal(props) {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [itens, setItens] = useState([]);
    const [busca, setBusca] = useState('');
    const [exibirCarrinho, setexibirCarrinho] = useState(false);

    function logado() {
        if (Storage('cliente-logado')) {
            navigate('/usuario/dados')
        }
        else if (!Storage('cliente-logado')) {
            navigate('/login/usuario')
        }
    }

    function exibiritems() {
        if(Storage('cliente-logado') && exibirCarrinho == false){
            setexibirCarrinho(true)
        }
        else if (!Storage('cliente-logado')){
            navigate('/login/usuario')
        }
        else if(exibirCarrinho == true){
            setexibirCarrinho(false)
        }
        
    }

    async function buscarNomeClick(event) {
        const resp = await buscarProdutosPorNome(busca);
        console.log(resp)
        setProdutos(resp);
    }


    function removerItem(id) {
        let carrinho = Storage('carrinho');
        carrinho = carrinho.filter(item => item.id != id);

        Storage('carrinho', carrinho);
        CarregarCarrinho();
    }

    function favoritos() {
        if (Storage('cliente-logado')) {
            return '/Favoritos';
        }
        else {
            return '/login/usuario'
        }
    }

    function exibirImagem(item) {
        return API_URL + '/' + item.produto.destaque.url;
    }


    async function CarregarCarrinho() {
        let carrinho = Storage('carrinho')
        if (carrinho) {
            let temp = [];
            for (let item of carrinho) {
                let produto = await buscarPorId(item.id);
                temp.push({
                    produto,
                    qtd: produto.qtd,

                })
            }
            console.log(temp)
            setItens(temp)
        }
    }

    useEffect(() => {
        CarregarCarrinho();
    }, [])



    return (
        <div className="espaco">
            <header className="cab1">
                <Link to='/'> <img className="logo1" alt="" src={props.logo} /></Link>
                <img className='menuCab1' alt="" src={props.menu} />

                <div>
                    <input className='busca1' placeholder='encontre seu produto aqui' type='text' value={busca} onChange={e => setBusca(e.target.value)} />
                    <img src={props.pesquisa} className="bt-busca1" onClick={buscarNomeClick}/>                   


                </div>
               

                <div className="espbotoes">
                    <Link to={favoritos()}><img className='icons1' src={props.fav} /></Link>
                    <img onClick={logado} className='icons1' src={props.user} />

                    <img className='icons1' src={props.sacola} onClick={exibiritems} />

                    {exibirCarrinho == true &&
                        <div className="sacolaw">
                             <div className="sacola">
                                <h4 className="escala"> Minha Sacola</h4>
                            </div>

                            {itens.map(item => 
                                <div className="carrinhoitens">
                                                                            <img className='imagem-resumo' src={exibirImagem(item)} />
                                <div>
                                <p> {item.produto.info.NomeTema}</p>
                                    <p> {item.produto.info.nome}</p>
                                </div>
                                   <div className="preco-item">
                                        
                                    <p className='preco'>R${item.produto.info.preco}</p>
                                   </div>

                                </div>
                            )}
                          <div className="realize">
                          <Link className="rea" to='/usuario/pedido'> Realizar Pedido </Link>

                          </div>
                            
                        </div>
                    }
                </div>
            </header>
            <hr className='linha1'></hr>

            <div>
                {produtos.map(item =>
                    <ProdutoBusca
                       nome={item.nome}
                       id= {item.id}
                       />
                )}
            </div>

        </div>

    )
}