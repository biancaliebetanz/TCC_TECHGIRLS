import { Link } from "react-router-dom";
import './pagAdm.scss';
import Storage from 'local-storage'
import { useNavigate } from "react-router-dom";

export default function MenuAdmin(props){
    const navigate = useNavigate();
    
    function SairClick(){
        Storage.remove('admin-logado');
        navigate('/login/admin')
    }

    return(
            <div className="menu">
                <img src={props.logo}></img>
                
                <div>
                    <Link to='/admin/pedidos' className="opcao">Pedidos</Link>
                </div>
                <div>
                  <Link to='/admin/banner' className="opcao">Catálogo</Link>
                </div>
                <div>
                <Link to='/Produtos' className="opcao">Produtos</Link>
                </div>
                
                <div>
                <Link to='/admin/temas' className="opcao">Temas</Link>
                </div>
                <div onClick={SairClick}>
                <p>Sair</p>
                </div>
            </div>
    )
}

