import './index.scss'

import Tema from '../../../components/tema/tema.js';
import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc.js';
import Caixa from '../../../components/boxInfos/boxInfos.js';
import MenuUsuario from '../../../components/menuUsuario/menuUsuario';
import Rodape from '../../../components/rodape';
import Legendas from '../../../components/cabLegenda';

export default function Index(){
    return(
        <main className='meusPedidos'>
        <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png'/>
                                    <Legendas nome="Seus Pedidos"></Legendas>

            <div className='Endereco' style={ {display : 'flex', width : '80vw', marginTop : '20vh'} }>
                <MenuUsuario />

            </div>
           

            <div>
            <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png' logo='./../../../images/logo.png'></Rodape>
            </div>
            
        </main>

    )
}