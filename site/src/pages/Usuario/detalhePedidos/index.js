import './index.scss'

import Tema from '../../../components/tema/tema.js';
import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc.js';
import Caixa from '../../../components/boxInfos/boxInfos.js';
import MenuUsuario from '../../../components/menuUsuario/menuUsuario.js';
import Infos from '../../../components/infosUser';
import Legendas from '../../../components/cabLegenda';

export default function Index(){
    return(
        <main className='detalhePed'>
            <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
                        <Legendas nome="Detalhe Pedidos"></Legendas>

           
        </main>

    )
}