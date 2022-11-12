import CabecalhoPrincipal from "../../../components/cabecalhoPrincipal/cabecalhoPrinc";
import Legendas from "../../../components/cabLegenda";
import Edit from "../../../components/editUser/editUser";
import Rodape from "../../../components/rodape";

export default function Index(){
    return(
        <main>
            <div>
                <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
                user='../../../images/user.png' sacola='../../../images/sacola.png'/>
            </div>
            <div>
                <Legendas nome='Dados Pessoais'></Legendas>
            </div>
            <div className='Endereco' style={ {display : 'flex', width : '80vw', marginTop : '20vh'} }>
                <Edit></Edit>
            </div>
            <div>
            <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png' logo='./../../../images/logo.png'></Rodape>

            </div>
        </main>
    )
}