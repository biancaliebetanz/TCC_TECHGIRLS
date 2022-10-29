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
            <Tema cor='cor-endereco' nome='Endereço'/>    
            <Caixa ajuste='ajuste-caixa-endereco'></Caixa>
            <MenuUsuario></MenuUsuario>
            <section>
                <div>
                {enderecos.map(item =>
                    <CardEndereco item={item}/>
                    )}

                    
                    
                </div>

            </section>
                    <Rodape></Rodape>

        </main>

    )
}