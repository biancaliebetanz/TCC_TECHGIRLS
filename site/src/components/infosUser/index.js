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
                    <p>{usuario.nome}</p>
                </div>
               <div>
                    <p>E-mail</p>
                    <p>{usuarioLogin.email}</p>
               </div>
                <div>
                    <p>Telefone</p>
                    <p>{usuario.telefone}</p>
                </div>
            </div>
            <div className="coluna2">
                <div>
                    <p>CPF</p>
                    <p>{usuario.cpf}</p>
                </div>
                <div>
                    <p>RG</p>
                    <p>{usuario.rg}</p>
               </div>
               <div>
                    <p>Data de Nascimento</p>
                    <p>{usuario.nascimento}</p>
               </div>
            </div>

        </div>
    )
}
