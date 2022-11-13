import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { buscarLoginId, buscarUsuarioId} from '../../API/Usuario.js';
import './index.scss'
import Storage from 'local-storage'

export default function Infos(){
    const { id } = useParams()

    const [usuario, setUsuario] = useState([]);
    const [usuarioLogin, setUsuarioLogin] = useState([]);
   
    async function CarregarInfos(){
        const resposta = await buscarUsuarioId(Storage('cliente-logado').data.id);
        setUsuario(resposta);

    }

    async function CarregarInfosLogin(){
        const resposta = await buscarLoginId(Storage('cliente-logado').data.id);
        setUsuarioLogin(resposta);

    }



    useEffect(() => {
        CarregarInfos();
        CarregarInfosLogin();

    }, [usuario, usuarioLogin])

    useEffect(() => {
        CarregarInfos();
        CarregarInfosLogin();
    }, [])
    
    return(
        <div className="princ-infos">
            <div className="coluna1">
                <div>
                    <p id='nome'>Nome</p>
                    <span>{usuario.nome}</span>
                </div>
               <div>
                    <p>E-mail</p>
                    <span>{usuarioLogin.email}</span>
               </div>
                <div>
                    <p>Telefone</p>
                    <span>{usuario.telefone}</span>
                </div>
            </div>
            <div className="coluna2">
                <div>
                    <p>CPF</p>
                    <span>{usuario.cpf}</span>
                </div>
                <div>
                    <p>RG</p>
                    <span>{usuario.rg}</span>
               </div>
               <div>
                    <p>Data de Nascimento</p>
                    <span>{usuario.nascimento}</span>
               </div>
            </div>

        </div>
    )
}
