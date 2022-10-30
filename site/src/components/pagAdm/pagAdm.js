import { Link } from "react-router-dom";
import './pagAdm.scss';
import Storage from 'local-storage'
import { useNavigate } from "react-router-dom";

export default function MenuAdmin(props){
    const navigate= useNavigate();
    function SairClick(){
        Storage.remove('usuario-logado');
        navigate('/login/admin')
    }

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
                <Link to='/temas' className="opcao">Temas</Link>
                </div>
                <div onClick={SairClick}>
                <p>Sair</p>
                </div>
            </div>
    )
}

