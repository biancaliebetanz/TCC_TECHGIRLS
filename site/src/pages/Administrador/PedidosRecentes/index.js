import MenuAdmin from "../../../components/pagAdm/pagAdm.js";
import './index.scss';
import "../../../common/common.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Storage from 'local-storage';

export default function Index() {

    const [admin, setAdmin] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!Storage('admin-logado')) {
            navigate('/login/admin')
        } else {
            const AdmLogado = Storage('admin-logado');
            setAdmin(AdmLogado.nome)
        }

    }, [])
    return (
        <main className="pag1-adm">
            <MenuAdmin logo='../../../images/logoAdmin.png' />

            <div className="PedRecentes fundo">

                <div>
                    <img src='' alt='' />
                    <h2 className="Bem-Vindo">Bem vindo a área de administração {admin}</h2>
                    <h3>Pedidos Recentes</h3>
                </div>

                <div>

                    <table className="tabela">
                        <thead>
                            <tr>
                                <td> Codigo </td>
                                <td> Cliente </td>
                                <td> CEP </td>
                                <td> Preço </td>
                                <td> Situação </td>
                                <td> Editar </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> #01 </td>
                                <td> Beltrano </td>
                                <td> 04830-960 </td>
                                <td> 120,00 </td>
                                <td> Aguardando Pagamento </td>
                                <td>  </td>
                            </tr>
                        </tbody>
                    </table>

                </div>



            </div>


        </main>
    )
}