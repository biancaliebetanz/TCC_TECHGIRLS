import './index.scss'

import Cabecalho from '../../../components/cabecalho/cabecalho.js'
import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import  BoxProdutoTema from '../../../components/boxProduto/boxProdutoTema.js'
import { listarPorTema } from '../../../API/usuario/temaApi.js';
import { buscarTemaId } from '../../../API/CadProduto';
import { buscarPorId } from '../../../API/Usuario';

export default function Index(){

    const { id } = useParams();
    const [produtos, setProdutos] = useState([]);

    async function carregar(){
        console.log(id)
        let r = await listarPorTema(id);
        console.log(r)
        setProdutos(r);
    
    }

    async function carregarPagina(){
        const resposta= await buscarPorId(id);
        setProdutos(resposta);
        

        buscarTemaId();
    }

    useEffect(() => {
        carregar()
    }, [])

    return(
        <main className='maintemaproduto'>

            <Cabecalho logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png' banner='../../../images/dragon.jpg'/>
        
            <section>

                <div className='produtos-tema'>
                    {produtos.map(item => 
                    <BoxProdutoTema nome={item.nome} imagem={item.imagem} preco={item.preco} id={item.id}/>
                    )}
                </div>
            </section>

            


        </main>

    )
}