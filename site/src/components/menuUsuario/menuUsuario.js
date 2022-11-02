import { Link } from "react-router-dom";
import './menuUsuario.scss'
import { useNavigate } from "react-router-dom";
import Storage from 'local-storage'
import { useEffect, useState } from "react";
import { UsuarioCadastro } from "../../API/Usuario.js";
export default function MenuUsuario(){
    const navigate= useNavigate();


    function SairCliente(){
        Storage.remove('cliente-logado');
        navigate('/')
    }


  
    return(
        <div className="menu-user">
             <div>
            <img className="usuario-logado" src="./../../../images/usuariologado.png"></img>
        </div>
            <div className="links">
                <Link className="Link">Dados Pessoais</Link>
                <Link className="Link">Endereços</Link>
                <Link className="Link">Meus Pedidos</Link>
                <div>
                <p onClick={SairCliente} className="Link">Sair</p>
                </div>
                
                
                    
               
            </div>
            <hr className="hr"></hr>
        </div>
    )
}