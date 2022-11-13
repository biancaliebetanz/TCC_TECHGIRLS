import { buscarProdutosPorNome } from '../../API/CadProduto'
import './index.scss'

export default function LinhaFinalizacao(props){
    return(
        <div className='linha-passos'>
            <div className="passos">
                <p className={props.alterar1}>1- Minha Sacola</p>
                <p className={props.alterar2}>2- Entrega e Pagamento</p>
                <p className={props.alterar3}>3- Finalização</p>
                
            </div>
          <div><hr  className='linha-finalizacao'></hr></div>  
        </div>
    )
}