import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { buscarProdutosPorNome} from '../../API/CadProduto.js';
import BoxProdutos2 from './../boxProdutos/boxProdutos2.js';
import './cabecalhoPrinc.scss';
import CarrinhoItem from "../carrinhoItem/carrinhoItem.js";
import { buscarPorId } from "../../API/Usuario.js";
import BoxProduto from "../boxProdutos/boxProduto.js";

export default function CabecalhoPrincipal(props){
    const [produtos, setProdutos] = useState([]);
    const [itens, setItens] = useState([]);
    const [busca, setBusca] = useState('');
    const [exibirCarrinho, setexibirCarrinho] = useState(false);
    


    function exibiritems(){
        if(exibirCarrinho == false){
            setexibirCarrinho(true)
        }
        else if(exibirCarrinho == true){
            setexibirCarrinho(false)
        }
    }

    async function buscarNomeClick() {
        const resp = await buscarProdutosPorNome(busca);
        console.log(resp)
        setProdutos([resp]);
     }

     
    function removerItem(id){
        let carrinho = Storage('carrinho');
        carrinho = carrinho.filter(item  => item.id != id);

        Storage('carrinho',carrinho);
        CarregarCarrinho();
    }
    
    async function CarregarCarrinho(){
        let carrinho= Storage('carrinho')
        if(carrinho){
            let temp= [];
            for(let item of carrinho){
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

    return(
            <div className="espaco">
            <header className="cab1">
               <Link to='/'> <img className="logo1" alt="" src={props.logo}/></Link>    
                    <img  className='menuCab1' alt="" src={props.menu}/>

                    <div>
                    <input className='busca1' placeholder='encontre seu produto aqui' type='text' value={busca} onChange={e=> setBusca(e.target.value)} />
                    <button onClick={buscarNomeClick}>pesquisar</button>


                    </div>

                    <div className="espbotoes">
                    <Link to='/Favoritos'><img className='icons1' src={props.fav}/></Link>
                    <Link to='/login/usuario'>        <img className='icons1' src={props.user}/></Link>

                    <img className='icons1' src={props.sacola} onClick={exibiritems} />

                    { exibirCarrinho == true  && 
                    <div className="sacolaw">
                            <div className="sacola">
                                <h4 className="escala"> Minha Sacola</h4>
                            </div>

                                {itens.map(item => 
                                     <div className="carrinhoitens"> 
                                     <p> {item.info.nome}</p>
                                     </div>
                                )}                           
                    <Link to='/usuario/pedido'> Realizar Pedido </Link>
                        </div>
                    }
                    </div>
                </header>
                    <hr className='linha1'></hr>

                <div>
                    {produtos.map(item =>
                            <BoxProdutos2
                            img=""
                            preco={item.preco}
                            nome={item.nome}
                            />
                        )}
                </div>

            </div>
               
        )
}