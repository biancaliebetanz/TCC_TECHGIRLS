import CabecalhoPrincipal from "../../../components/cabecalhoPrincipal/cabecalhoPrinc.js";
// (card duplicado sem necessidade) import CardTema from "../../../components/cardsTemas/index.js";
import BoxProduto from "../../../components/boxProduto/boxProdutoTema.js";
import './index.scss'

export default function Index(){
    return(
        <main>
            <CabecalhoPrincipal  logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
            <BoxProduto />

        </main>
    )
}