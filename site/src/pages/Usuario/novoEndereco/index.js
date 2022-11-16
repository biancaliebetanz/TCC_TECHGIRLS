import { toast } from "react-toastify";
import { deletarEnderecos } from "../../../API/usuario/enderecoApi.js";
import CabecalhoPrincipal from "../../../components/cabecalhoPrincipal/cabecalhoPrinc.js";
import Legendas from "../../../components/cabLegenda/index.js";
import CadastroEndereco from "../../../components/CadEndereco/index.js";
import MenuUsuario from "../../../components/menuUsuario/menuUsuario.js";
import Rodape from "../../../components/rodape/index.js";
import './index.scss'

export default function Index(){

    async function deletar(){
        const r = await deletarEnderecos(Storage('cliente-logado').data.id);
        toast('Endereço deletado')
    }

    return(
        <main className="novoEndereco">
             <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
                    <Legendas nome="Endereços" />
                
                <div className='Endereco' style={ {display : 'flex', width : '80vw', marginTop : '20vh'} }>
                <MenuUsuario />
                <CadastroEndereco />

            </div>
           

        </main>
    )
}