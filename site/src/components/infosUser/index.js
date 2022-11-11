import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { buscarUsuarioId} from '../../API/Usuario';
import './index.scss'

export default function Infos(){
    const {id} = useParams();

    const[usuario, setUsuario] = useState([]);
   


    async function CarregarInfos(){
        const resposta= await buscarUsuarioId(id);

        setUsuario(resposta);
        console.log(resposta);

    }

    useEffect(() => {
        CarregarInfos();
    }, [])
    return(
        <div className="princ-infos">
            <div className="coluna1">
                <p>Nome{usuario.nome}</p>
                <p>E-mail</p>
                <p>Telefone</p>
            </div>
            <div className="coluna2">
                <p>CPF</p>
                <p>RG</p>
                <p>Data de Nascimento</p>
            </div>

        </div>
    )
}
