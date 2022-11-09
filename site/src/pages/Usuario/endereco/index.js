import './index.scss'

import Tema from '../../../components/tema/tema.js';
import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc.js';
import {ListarEnderecos} from '../../../API/usuario/enderecoApi.js'
import { useEffect, useState } from 'react';
import Storage from 'local-storage'
import CardEndereco from '../../../components/cardEndereco';
import { toast } from 'react-toastify';
import Caixa from '../../../components/boxInfos/boxInfos';
import CadastroEndereco from '../../../components/CadEndereco';
import MenuUsuario from '../../../components/menuUsuario/menuUsuario';
import Rodape from '../../../components/rodape';
import Legendas from '../../../components/cabLegenda';

export default function Index(){

    const [enderecos, setEnderecos] = useState([]);

    async function carregarEnderecos(){
        const r= await ListarEnderecos(Storage('cliente-logado').data.id);
        setEnderecos(r);
    }

    useEffect(() =>{
        carregarEnderecos();
    }, [enderecos])
    
    useEffect(() =>{
        carregarEnderecos();
    }, [])


    return(
        <main className='SeusEnderecos'>
            <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
                        <Legendas nome="Endereços"></Legendas>

            <Caixa ajuste='ajuste-caixa-endereco'></Caixa>
            <MenuUsuario></MenuUsuario>
            <section className='end-card'>
                <div>
                {enderecos.map(item =>
                    <CardEndereco item={item}/>
                    )}
                
                    
                </div>

            </section>
            <div>
            <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png'  logo='./../../../images/logo.png'></Rodape>

            </div>

        </main>

    )
}