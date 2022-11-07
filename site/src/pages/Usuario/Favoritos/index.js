import CabecalhoPrincipal from "../../../components/cabecalhoPrincipal/cabecalhoPrinc.js";
import BoxProduto from "../../../components/boxProduto/boxProdutoTema.js";
import './index.scss'
import Legendas from "../../../components/cabLegenda/index.js";
import { useEffect, useState } from "react";
import Storage from 'local-storage';
import { listarFavoritos } from "../../../API/Usuario.js";
import Rodape from "../../../components/rodape/index.js";



export default function Index(){

    const [usuario, setUsuario] = useState(Storage('cliente-logado').data.id);
    const [produtos, setProdutos] = useState([]);


        async function ListarFavoritos(){
            const resp= await listarFavoritos(usuario);
            setProdutos(resp)
            console.log(resp)
        }
        useEffect(() => {
            ListarFavoritos();
        }, [])

        
    return(
        <main>
            <CabecalhoPrincipal  logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
            <Legendas nome="Favoritos"></Legendas>

                    
           <section className="favoritos">

            {produtos.map(item =>
                <BoxProduto nome={item.nome} imagem={item.imagem} preco={item.preco} id={item.id}/>)}

           
           </section>
           <div>
                <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png' ></Rodape>
            </div>
        </main>
    )
}