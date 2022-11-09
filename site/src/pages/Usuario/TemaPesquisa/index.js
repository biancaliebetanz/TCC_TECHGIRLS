import './index.scss'

import Cabecalho from '../../../components/cabecalho/cabecalho.js'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoxProdutoTema from '../../../components/boxProduto/boxProdutoTema.js'
import { listarPorTema } from '../../../API/usuario/temaApi.js';
import { buscarTemaId } from '../../../API/CadProduto.js';
import { API_URL } from '../../../API/config';
import { Link } from 'react-router-dom';

export default function Index() {

    const { id } = useParams();
    const [produtos, setProdutos] = useState([]);
    const [tema, setTema] = useState({});
    const [imagem, setImagem] = useState();

    async function carregar() {
        const r = await listarPorTema(id);
        setProdutos(r);
    }


    async function carregarPagina() {
        const x = await buscarTemaId(id);
        setTema(x);
        setImagem(x.fundo);
    }

    function exibir(imagem) {
        return `${API_URL}/${imagem}`;
    }

    useEffect(() => {
        carregarPagina();
        carregar();
    }, [])

    return (
        <main className='maintemaproduto'>

            <Cabecalho logo='../../../images/logoAdmin.png' menu='../../../images/menu.png' fav='../../../images/favoritos.png'
                user='../../../images/user.png' sacola='../../../images/sacola.png' banner={exibir(tema.imagem)} />

            <section>
                <hr className='linha' />

                <img className='banner1' src={exibir(imagem)} />

                <div className='links-menu'>
                    <button className='Link'>Vestimenta     </button>
                    <button className='Link'>Acessório     </button>
                    <button className='Link'>Colecionável   </button>
                    <button className='Link'>Funko          </button>
                    <button className='Link'>Caneca         </button>
                    <button className='Link'>Pelúcia        </button>
                    <button className='Link'>Decoração      </button>

                </div>
                <hr className='linha-menu' />

                <div className='produtos-tema'>
                    {produtos.map(item =>
                        <BoxProdutoTema nome={item.nome} imagem={item.imagem} preco={item.preco} id={item.id} />
                    )}
                </div>
            </section>




        </main>

    )
}