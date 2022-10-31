import MenuAdmin from "../../../components/pagAdm/pagAdm.js";
import './index.scss';
import "../../../common/common.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Storage from 'local-storage';

export default function Index(){

    const[admin, setAdmin] = useState('');
    const navigate= useNavigate();
    
    useEffect(() => {
        if(!Storage('admin-logado')){
            navigate('/login/admin')
        }else{
            const AdmLogado= Storage('admin-logado');
            setAdmin(AdmLogado.nome)
        }
        
    }, [])
    return(
        <main className="pag1-adm">
            <MenuAdmin logo='../../../images/logoAdmin.png'/>
            
            <div className="PedRecentes fundo">
            
            <div>
                <img src='' alt='' />
                <h2 className="Bem-Vindo">Bem vindo a área de administração {admin}</h2>
            </div>
            <div>
                <h3>Pedidos Recentes</h3>
            </div>
            </div>

            
        </main>
    )
}