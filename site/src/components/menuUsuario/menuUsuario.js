import { Link } from "react-router-dom";
import './menuUsuario.scss'
import { useNavigate } from "react-router-dom";
import Storage from 'local-storage'
import { useEffect, useState } from "react";
import { buscarUsuarioId, UsuarioCadastro } from "../../API/Usuario.js";
export default function MenuUsuario() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);

    async function CarregarNome(){
        const r= await buscarUsuarioId(Storage('cliente-logado').data.id);
        setUsuario(r);
    }

    useEffect(() => {
        CarregarNome();
    }, [usuario]);

    useEffect(() => {
        CarregarNome();
    }, [])

    function SairCliente() {
        Storage.remove('cliente-logado');
        navigate('/')
    }

    


    return (
        <div className="menu-user">
            <div className="direction">
                <div>
                <img className="usuario-logado" src="./../../../images/usuariologado.png"></img>
                <p> Olá {usuario.nome}!!</p>
            </div>
            <div className="links">
                <Link to='/dadosPessoais' className="Link">Dados Pessoais</Link>
                <Link to='/endereco' className="Link">Endereços</Link>
                <Link to='/seusPedidos' className="Link">Meus Pedidos</Link>
                <div>
                    <p onClick={SairCliente} className="Link">Sair</p>
                </div>

            </div>
            </div>
            
            <hr className="hr"></hr>
        </div>
    )
}