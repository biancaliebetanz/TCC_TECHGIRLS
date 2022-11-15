import CabecalhoPrincipal from "../../../components/cabecalhoPrincipal/cabecalhoPrinc.js";
import BoxProduto from "../../../components/boxProduto/boxProdutoTema.js";
import './index.scss'
import Legendas from "../../../components/cabLegenda/index.js";
import { useEffect, useState } from "react";
import Storage from 'local-storage';
import { listarFavoritos } from "../../../API/Usuario.js";
import Rodape from "../../../components/rodape/index.js";
import { useNavigate } from "react-router-dom";



export default function Index(){

    const navigate = useNavigate()
    const [usuario, setUsuario] = useState(Storage('cliente-logado').data.id);
    const [produtos, setProdutos] = useState([]);

    const[listaporPag, setListarporPag] = useState(12);
    const[current, setCurrent] = useState(0);

    
    const pages = Math.ceil(produtos.length / listaporPag)
    const startIndex = current * listaporPag;
    const endIndex = startIndex + listaporPag;
    const currentItens = produtos.slice(startIndex, endIndex)

        async function ListarFavoritos(){
            const resp= await listarFavoritos(usuario);
            setProdutos(resp)
            console.log(resp)
        }
        useEffect(() => {
            ListarFavoritos();
        }, [])

        
    return(
        <main className="telaFav">
            <CabecalhoPrincipal  logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
            <Legendas nome="Favoritos" cor={'#e25475'} />
           
                    
           <section className="favoritos">

         

            {currentItens.map(item =>
                <BoxProduto nome={item.nome} imagem={item.imagem} preco={item.preco} id={item.id}/>)}

           
           </section>
           <div className="paginacao">
                {Array.from(Array(pages), (item, index) => {
                    return <button className="bt-paginacao" value={index} onClick={(e) => setCurrent(Number(e.target.value))}>{index + 1}</button>
                })}
            </div>
           <div>
                <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png' ></Rodape>
            </div>
        </main>
    )
}