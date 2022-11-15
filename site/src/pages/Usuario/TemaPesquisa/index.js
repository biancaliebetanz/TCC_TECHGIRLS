import './index.scss'

import Cabecalho from '../../../components/cabecalho/cabecalho.js'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoxProdutoTema from '../../../components/boxProduto/boxProdutoTema.js'
import { listarPorCategoria, listarPorTema } from '../../../API/usuario/temaApi.js';
import { buscarTemaId } from '../../../API/CadProduto.js';
import { API_URL } from '../../../API/config';
import { Link } from 'react-router-dom';
import Rodape from '../../../components/rodape';

export default function Index() {

    const { id } = useParams();
    const [produtos, setProdutos] = useState([]);
    const [tema, setTema] = useState({});
    const [imagem, setImagem] = useState();
    const [vestimenta, setVestimenta] = useState('Vestimenta');
    const [acessorio, setAcessorio] = useState('Acessório');
    const [colecionavel, setColecionavel] = useState('Colecionável');
    const [funko, setFunko] = useState('Funko');
    const [caneca, setCaneca] = useState('Caneca');
    const [pelucia, setPelucia] = useState('Pelúcia');
    const [decoracao, setDecoracao] = useState('Decoração');

    const[listaporPag, setListarporPag] = useState(12);
    const[current, setCurrent] = useState(0);

    const pages =   Math.ceil(produtos.length / listaporPag);
    const startIndex = current * listaporPag;
    const endIndex= startIndex + listaporPag;
    const currentItens= produtos.slice(startIndex, endIndex)

    async function carregar() {
        const r = await listarPorTema(id);
        setProdutos(r);
    }

    async function filtrar(categoria){
        const r = await listarPorCategoria(id, categoria);
        console.log(r);
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

                <img className='banner1' src={exibir(imagem)} onClick={carregar}/>

                <div className='links-menu'>
                    <button className='Link' onClick={() => filtrar(vestimenta)}>{vestimenta}    </button>
                    <button className='Link' onClick={() => filtrar(acessorio)}>{acessorio}     </button>
                    <button className='Link' onClick={() => filtrar(colecionavel)}>{colecionavel}   </button>
                    <button className='Link' onClick={() => filtrar(funko)}>{funko}          </button>
                    <button className='Link' onClick={() => filtrar(caneca)}>{caneca}         </button>
                    <button className='Link' onClick={() => filtrar(pelucia)}>{pelucia}        </button>
                    <button className='Link' onClick={() => filtrar(decoracao)}>{decoracao}      </button>

                </div>
                <hr className='linha-menu' />

                <div className='produtos-tema'>
                    {currentItens.map(item =>
                        <BoxProdutoTema nome={item.nome} imagem={item.imagem} preco={item.preco} id={item.id} />
                    )}
                </div>
                <div className='paginacao'>
                    {Array.from(Array(pages), (item, index) => {
                        return <button className='bt-paginacao' value={index} onClick={(e) => setCurrent(Number(e.target.value))}>{index + 1}</button>
                })}
                </div>
            </section>

            <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png'  logo='./../../../images/logo.png'></Rodape>




        </main>

    )
}