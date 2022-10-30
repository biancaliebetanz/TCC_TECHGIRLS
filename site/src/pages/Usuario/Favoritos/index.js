import CabecalhoPrincipal from "../../../components/cabecalhoPrincipal/cabecalhoPrinc.js";
import BoxProduto from "../../../components/boxProduto/boxProdutoTema.js";
import './index.scss'
import Legendas from "../../../components/cabLegenda/index.js";
import { useEffect, useState } from "react";
import { listarFavoritos } from "../../../API/Usuario.js";


    



export default function Index(){
    const{produtos, setProdutos} = useState([]);


        async function ListarFavoritos(){
            const resp= await listarFavoritos();
            console.log(resp)
            setProdutos(resp)
        }
        useEffect(() => {
            ListarFavoritos();
        }, [])

        
    return(
        <main>
            <CabecalhoPrincipal  logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
            <Legendas nome="Favoritos"></Legendas>

                    
           
            <BoxProduto />

        </main>
    )
}