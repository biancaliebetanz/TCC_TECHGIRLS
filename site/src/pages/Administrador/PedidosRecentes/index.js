import MenuAdmin from "../../../components/pagAdm/pagAdm.js";
import './index.scss';
import "../../../common/common.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Storage from 'local-storage';
import { toast } from "react-toastify";
import { listarPedidos } from "../../../API/admin/pedido/pedidoApi.js";

export default function Index() {

    const [admin, setAdmin] = useState('');
    const navigate = useNavigate();

    // VARIÁVEIS DE ESTADO

    const [pedidos, setPedidos] = useState([]);

    // FUNÇÕES

    async function carregarPedidos(){
            const r = await listarPedidos();
            setPedidos(r);
            console.log(r)
    }

    // USEEFFECTS

    useEffect(() => {
        carregarPedidos();
    }, [])

    useEffect(() =>{
        console.log(pedidos)
    }, [pedidos])

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
                            {pedidos.map(item =>
                                <tr>
                                     <td> #{item.id_pedido} </td>
                                    <td> {item.nome} </td>
                                    <td> {item.cep} </td>
                                    <td> {item.preco} </td>
                                    <td> {item.situacao} </td>
                                    <td>  </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>



            </div>


        </main>
    )
}