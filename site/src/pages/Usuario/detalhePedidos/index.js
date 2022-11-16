import './index.scss'

import Tema from '../../../components/tema/tema.js';
import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc.js';
import Caixa from '../../../components/boxInfos/boxInfos.js';
import MenuUsuario from '../../../components/menuUsuario/menuUsuario.js';
import Infos from '../../../components/infosUser';
import Legendas from '../../../components/cabLegenda';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { buscarPorId } from '../../../API/Usuario';
import { buscarDestaque } from '../../../API/CadProduto';
import { API_URL } from '../../../API/config';

export default function Index(){
    const[produto, setProduto]= useState({cores:[], tamanho:[], imagens:[] , destaque:{}, info:{} });
    const[imagemPrincipal, setImagemPrincipal] = useState(0);
    const [itens, setItens] = useState([]);

    const { id } = useParams();
    
    async function carregarPagina(){
        const resposta= await buscarPorId(id);
        setProduto(resposta);
        buscarDestaque();

    }

    function calcularValorTotal() {
        let t = 0.0;
        for (let item of itens) {
            t = t + item.produto.info.preco * item.qtd;
        }
        return t;
    }

    function exibirDestaque(dest) {
        if(!imagemPrincipal)
        return API_URL + '/' + produto.destaque.url;
        else
        return imagemPrincipal;
    }




    function exibirImagem(item) {
        return API_URL + '/' + item.produto.destaque.url;
    }


    useEffect(() => {
        carregarPagina();
    }, [])


    return(
        <main className='detalhePed'>

                        <section>
                        <div>
                        <img className="img" src={exibirDestaque()} />
            
                            <p>{produto.info.NomeTema}</p>
                            <p>{produto.info.nome}</p>
                            <p>{produto.info.preco}</p>

                        </div>

                        </section>

           
        </main>

    )
}