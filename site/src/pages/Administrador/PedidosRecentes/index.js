import MenuAdmin from "../../../components/pagAdm/pagAdm.js";
import './index.scss';
import "../../../common/common.scss"

export default function Index(){
    return(
        <main className="pag1-adm">
            <MenuAdmin logo='../../../images/logoAdmin.png'/>
            
            <div className="PedRecentes fundo">
            
            <div>
                <img src='' alt='' />
                <h2 className="Bem-Vindo">Bem vindo a área de administração</h2>
            </div>
            <div>
                <h3>Pedidos Recentes</h3>
            </div>
            </div>

            
        </main>
    )
}