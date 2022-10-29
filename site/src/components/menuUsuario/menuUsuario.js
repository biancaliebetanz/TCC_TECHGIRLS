import { Link } from "react-router-dom";
import './menuUsuario.scss'

export default function MenuUsuario(){
    return(
        <div className="menu-user">
             <div>
            <img className="usuario-logado" src="./../../../images/usuariologado.png"></img>
        </div>
            <div className="links">
                <Link className="Link">Dados Pessoais</Link>
                <Link className="Link">Endereços</Link>
                <Link className="Link">Meus Pedidos</Link>
                <Link className="Link">Sair</Link>
                
                    
               
            </div>
            <hr className="hr"></hr>
        </div>
    )
}