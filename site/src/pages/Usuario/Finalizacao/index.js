import { Link } from "react-router-dom";
import CabecalhoCompra from "../../../components/cabecalhoCompra";
import LinhaFinalizacao from "../../../components/linhaFinalizacao";
import Rodape from "../../../components/rodape";
import './index.scss'

export default function Index(){
    return(
        <main>
               <CabecalhoCompra logo='../../../images/logoAdmin.png' />

            <LinhaFinalizacao alterar1='alterar1' alterar2='alterar1'></LinhaFinalizacao>

            <div className="agradecimento">
            <div className="mensagem">
                <p className="seu-pedido">Seu pedido foi finalizado com sucesso!!!</p>

                <p className="info-pedido">A estimativa de tempo de entrega começará a contar à partir da aprovação do pagamento</p>
                <h1>Obrigado pela compra!!</h1>
                <Link to='/' className="link-final">Continuar Comprando</Link>
            </div>
            <div className="et">
                <img src="../../../images/alienigena.png"></img>
            </div>
        
            </div>
            <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png' ></Rodape>

        </main>
    )
}