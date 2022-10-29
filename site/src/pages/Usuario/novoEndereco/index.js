import Caixa from "../../../components/boxInfos/boxInfos.js";
import CabecalhoPrincipal from "../../../components/cabecalhoPrincipal/cabecalhoPrinc.js";
import CadastroEndereco from "../../../components/CadEndereco/index.js";
import MenuUsuario from "../../../components/menuUsuario/menuUsuario.js";
import Rodape from "../../../components/rodape/index.js";
import Tema from "../../../components/tema/tema.js";
import './index.scss'

export default function Index(){
    return(
        <main className="novoEndereco">
             <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
            <Tema cor='cor-novo-endereco' nome='Novo Endereço'></Tema>     

            <Caixa ></Caixa>
            <MenuUsuario ></MenuUsuario>

            <CadastroEndereco></CadastroEndereco>
            <div>
                <Rodape></Rodape>
            </div>
        </main>
    )
}