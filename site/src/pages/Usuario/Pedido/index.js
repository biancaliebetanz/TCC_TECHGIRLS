
import { useEffect, useState } from "react"
import Storage from 'local-storage'
import { buscarPorId } from "../../../API/Usuario";
import CarrinhoItem from "../../../components/carrinhoItem/carrinhoItem.js";
import './index.scss'
import CabecalhoCompra from "../../../components/cabecalhoCompra/index.js";
import LinhaFinalizacao from "../../../components/linhaFinalizacao/index.js";
import { Link } from "react-router-dom";

export default function Index(){
    const[itens, setItens] = useState([]);

    function qtdItens(){
       return itens.length;
    }

    function calcularValorTotal(){
        let t = 0;
        for(let item of itens){
          t = t +  item.produto.info.preco * item.qtd;
        }
        return t;
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
                    qtd: item.qtd,
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
        <main className="pedidomain">
                    <CabecalhoCompra logo='../../../images/logoAdmin.png'></CabecalhoCompra>  
                    <LinhaFinalizacao alterar1='alterar4' alterar2='alterar5' alterar3='alterar6'/>


            <section className="sacola">

                    <table className="tabela">
                        <thead>
                            <tr> 
                                <td className="td"> Produto </td>
                                <td> Preço </td>
                                <td> Quantidade </td>
                                <td> Subtotal </td>
                                <td> </td>
                            </tr>
                        </thead>
                        <tbody>
                        {itens.map(item =>
                            <CarrinhoItem item={item} removerItem={removerItem} CarregarCarrinho={CarregarCarrinho}/>
                            )}
                        </tbody>
                        
                        
                    </table>
                    <div className="valoresFinais">
                        <p>{qtdItens()} produtos</p>
                        <h1>Total : R${calcularValorTotal()}</h1>
                    </div>
            </section>
            
            <Link to='/entrega'> Finalizar </Link>
        </main>
    )
}