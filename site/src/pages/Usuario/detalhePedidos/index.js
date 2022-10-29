import './index.scss'

import Tema from '../../../components/tema/tema.js';
import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc.js';
import Caixa from '../../../components/boxInfos/boxInfos.js';
import MenuUsuario from '../../../components/menuUsuario/menuUsuario.js';

export default function Index(){
    return(
        <main>
            <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
            <Tema cor='cor-detalhe-ped' nome='Detalhe do Pedido'></Tema>     
            <Caixa ajuste='ajuste-caixa'></Caixa>
            <MenuUsuario></MenuUsuario>

        </main>

    )
}