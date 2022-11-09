import { useState } from 'react';
import Storage from 'local-storage';
import { API_URL } from '../../API/config';
import './carrinhoItem.scss'


export default function CarrinhoItem({item:{ produto:{info, destaque}, qtd }, removerItem , CarregarCarrinho}) {
  const[qtdProduto, setQtdProduto] = useState(qtd);

    function removerProduto(){
        removerItem(info.id);
    }
    
    function ExibirImagemPrincipal(){
        console.log(destaque.url)
        return API_URL + '/' + destaque.url;
    }

    function CalcularSubtotal(){
        const subtotal = qtdProduto * info.preco;
        return (subtotal);
    }
    
    function AlterarQtd(novaQtd){
        console.log(novaQtd);
        setQtdProduto(novaQtd);
        
        let carrinho= Storage('carrinho');
        let itemStorage= carrinho.find(item => item.id == info.id);
        itemStorage.qtd = novaQtd
        Storage('carrinho', carrinho);
        CarregarCarrinho();
       }

    return(
        <tr className='produto-carrinho-pedido'>
            <td className='row'>
                <div className='divrow'>
                    <img className='img-carrinho-prod' src={ExibirImagemPrincipal()} alt=''/>
                    <div className='infos-prod-carrinho'>
                        <h3>{info.NomeTema}</h3>
                        <h4>{info.nome} - azul - gg</h4>
                    </div>
                </div>
            </td>    
            <td>
                <p>R${info.preco}</p>
            </td>

            <td>
                <select onChange={e => AlterarQtd(e.target.value)} value={qtdProduto}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </td>

            <td>
                <p>R${CalcularSubtotal()}</p>  
            </td>

            <td>
                <img onClick={removerProduto} className='imagemdeletar' src="./../../../images/lixeira.png" alt="" />
                
            </td>
        </tr>
       
    )
} 