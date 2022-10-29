import Caixa from "../../../components/boxInfos/boxInfos.js";
import CabecalhoPrincipal from "../../../components/cabecalhoPrincipal/cabecalhoPrinc.js";
import Legendas from "../../../components/cabLegenda/index.js";
import CadastroEndereco from "../../../components/CadEndereco/index.js";
import MenuUsuario from "../../../components/menuUsuario/menuUsuario.js";
import Rodape from "../../../components/rodape/index.js";
import './index.scss'

export default function Index(){
    return(
        <main className="novoEndereco">
             <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
                                    <Legendas nome="Endereços"></Legendas>

            <Caixa ></Caixa>
            <MenuUsuario ></MenuUsuario>

            <CadastroEndereco></CadastroEndereco>
                <Rodape></Rodape>
        </main>
    )
}