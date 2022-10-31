import './index.scss'

import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc.js';
import Caixa from '../../../components/boxInfos/boxInfos.js';
import MenuUsuario from '../../../components/menuUsuario/menuUsuario';
import Legendas from '../../../components/cabLegenda';
import Rodape from '../../../components/rodape';
import { useNavigate } from 'react-router-dom';
import Storage from  'local-storage';
import { useEffect} from 'react';

export default function Index(){
    const navigate= useNavigate();
    
    useEffect(() => {
        if(!Storage('cliente-logado')){
            navigate('/')
        }
    }, [])
    
    return(
        <main className='DadosPessoais'>
            <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
            <Legendas nome='Dados Pessoais'></Legendas>
            <Caixa ajuste='ajuste-caixa'></Caixa>
           
            <MenuUsuario></MenuUsuario>

            <div>
                <p>Nome</p>
            </div>
            <div>
                <p>Telefone</p>
            </div>
            <div>
                <p>CPF</p>
            </div>
            <div>
                <p>RG</p>
            </div>
            <div>
                <p>Data de nascimento</p>
            </div>

            <Rodape></Rodape>

        </main>

    )
}