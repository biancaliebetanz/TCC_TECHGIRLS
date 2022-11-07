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
            <div>
                <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
                user='../../../images/user.png' sacola='../../../images/sacola.png'/>
            </div>
            <div>
                <Legendas nome='Dados Pessoais'></Legendas>
            </div>
            <div>
                <Caixa ajuste='ajuste-caixa'></Caixa>
                <MenuUsuario></MenuUsuario>

            </div>
           

            <div className='row'>
            <div className='infos-pessoais1'>
                <div>
                    <p>Nome</p>
                </div>
                <div>
                    <p>E-mail</p>
                </div>
                <div>
                    <p>Telefone</p>
                </div>
            </div>
            <div className='infos-pessoais2'>
                <div>
                    <p>CPF</p>
                </div>
                <div>
                    <p>RG</p>
                </div>
                <div>
                    <p>Data de nascimento</p>
                </div>
            </div>
            </div>

            <div className='rod'>
            <Rodape></Rodape>

            </div>
        </main>

    )
}