import './index.scss'

import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc.js';
import Caixa from '../../../components/boxInfos/boxInfos.js';
import MenuUsuario from '../../../components/menuUsuario/menuUsuario';
import Legendas from '../../../components/cabLegenda';
import Rodape from '../../../components/rodape';
import { Link, useNavigate } from 'react-router-dom';
import Storage from  'local-storage';
import { useEffect, useState} from 'react';
import { buscarUsuarioId } from '../../../API/Usuario';
import Infos from '../../../components/infosUser';

export default function Index(){
    
    const [id, setId] = useState(Storage('cliente-logado').data.id);

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [datadenasc, setDatadenasc] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');

    const navigate= useNavigate();

    function carregarUsuario(){

        const x = buscarUsuarioId(id)
        console.log(x);
        setNome(x.nome);
    }
    
    useEffect(() => {
        if(!Storage('cliente-logado')){
            navigate('/login/usuario')
        }
        else {
            carregarUsuario();
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

            <div className='Endereco' style={ {display : 'flex', width : '80vw', marginTop : '20vh'} }>
                <MenuUsuario />
                <Infos />
            </div>

            <div>
                <Link className='Link2' to='/editar/dados'> Editar Informações</Link>

            </div>
           

            <div className='rod'>
            <Rodape></Rodape>

            </div>
        </main>

    )
}