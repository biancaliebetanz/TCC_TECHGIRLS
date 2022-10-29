import { Link } from "react-router-dom";
import './pagAdm.scss';

export default function MenuAdmin(props){
    return(
            <div className="menu">
                <img src={props.logo}></img>
                <div>
                    <Link className="opcao">Administrador</Link>
                </div>
                <div>
                  <Link className="opcao">Catálogos</Link>
                </div>
                <div>
                    <Link className="opcao">Pedidos</Link>
                </div>
                <div>
                <Link to='/Produtos' className="opcao">Produtos</Link>
                </div>
                <div>
                <Link className="opcao">Avaliações</Link>
                </div>
                <div>
                <Link to='/admin/temas' className="opcao">Temas</Link>
                </div>
            </div>
    )
}

