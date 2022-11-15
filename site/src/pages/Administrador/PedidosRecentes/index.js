import MenuAdmin from "../../../components/pagAdm/pagAdm.js";
import './index.scss';
import "../../../common/common.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Storage, { set } from 'local-storage';
import { toast } from "react-toastify";
import { alterarSituacaoPedido, DeletarPedido, listarPedidoId, listarPedidos } from "../../../API/admin/pedido/pedidoApi.js";

export default function Index() {

    const [admin, setAdmin] = useState('');
    const navigate = useNavigate();

    // VARIÁVEIS DE ESTADO
    const [alterar, setAlterar] = useState(false)
    const [situacao, setSituacao] = useState('')
    const [idPedido, setIdPedido] = useState(0);
    const [pedidos, setPedidos] = useState([]);
    const [pedido, setPedido] = useState({});

    const [s1, setS1] = useState(false);
    const [s2, setS2] = useState(false);
    const [s3, setS3] = useState(false);
    const [s4, setS4] = useState(false);
    const [s5, setS5] = useState(false);

    const [ss1, setSs1] = useState('Pagamento confirmado');
    const [ss2, setSs2] = useState('Pacote está pronto para envio');
    const [ss3, setSs3] = useState('Pacote está a caminho');
    const [ss4, setSs4] = useState('Pacote Chegou');
    const [ss5, setSs5] = useState('Pedido Finalizado');


    // FUNÇÕES

    async function carregarPedidos() {
        const r = await listarPedidos();
        setPedidos(r);
        console.log(r)
    }

    async function exibirAlterar(id) {
        setAlterar(true)
        const x = await listarPedidoId(id);
        console.log(x);
        setPedido(x)
        setSituacao(x.situacao)
        setIdPedido(id);
    }

    async function alterarSituacao(){
        try{
            const x = await alterarSituacaoPedido(idPedido, situacao);
            console.log(x);
            toast('Situação do pedido alterada com sucesso!');
            setAlterar(false)
            carregarPedidos();
        }
        catch(err){
            toast.error('Erro: ' + err.message)
        }
    }

    async function Remover(id_pedido){
        await DeletarPedido(id_pedido)
        toast('Deletado com sucesso')
        carregarPedidos();
    }

    function cor() {
        if (situacao == ss1) {
            setS1(true)
            setS2(false)
            setS3(false)
            setS4(false)
            setS5(false)
        }
        if (situacao == ss2) {
            setS1(false)
            setS2(true)
            setS3(false)
            setS4(false)
            setS5(false)
        }
        if (situacao == ss3) {
            setS1(false)
            setS2(false)
            setS3(true)
            setS4(false)
            setS5(false)
        }
        if (situacao == ss4) {
            setS1(false)
            setS2(false)
            setS3(false)
            setS4(true)
            setS5(false)
        }
        if (situacao == ss5) {
            setS1(false)
            setS2(false)
            setS3(false)
            setS4(false)
            setS5(true)
        }
    }

    // USEEFFECTS

    useEffect(() => {
        carregarPedidos();
    }, [])

    useEffect(() => {
        cor()
    }, [situacao])

    useEffect(() => {
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
            {alterar == true &&
                    <div className="fundosituacao">
                        <div className="situacaoalterar">

                            <h2> Alterar pedido #{idPedido}</h2>
                            <h3> Cliente: <span> {pedido.nome} </span> </h3>
                            <h3> CEP: <span> {pedido.cep} </span> </h3>
                            <h3> Preço: <span> {pedido.preco} </span> </h3>
                            <h3> Situação: <span> {situacao} </span> </h3>

                            <div className="opcoessit">
                                <div onClick={() => setSituacao(ss1)} style={{ color: s1 ? '#FF2C83' : '#000' }}>
                                    <h6> {ss1} </h6>
                                </div>

                                <div onClick={() => setSituacao(ss2)} style={{ color: s2 ? '#FF2C83' : '#000' }}>
                                    <h6> {ss2} </h6>
                                </div>

                                <div onClick={() => setSituacao(ss3)} style={{ color: s3 ? '#FF2C83' : '#000' }}>
                                    <h6> {ss3} </h6>
                                </div>

                                <div onClick={() => setSituacao(ss4)} style={{ color: s4 ? '#FF2C83' : '#000' }}>
                                    <h6> {ss4} </h6>
                                </div>

                                <div onClick={() => setSituacao(ss5)} style={{ color: s5 ? '#FF2C83' : '#000' }}>
                                    <h6> {ss5} </h6>
                                </div>
                            </div>

                <div className="botoessit">
                    <button onClick={() => setAlterar(false)}> Voltar</button> 
                    <button onClick={alterarSituacao}> Salvar</button>
                </div>

                        </div>
                    </div>
                }

            <div className="PedRecentes fundo">

                <div className="oi">
                    <div>
                        <h1 className="Bem-Vindo">Bem vindo a área de administração!</h1>
                    </div>

                    <div className="adm">
                    <img src='../../../images/Vector.png'/>
                    <p>Olá, <span> {admin} </span>!</p>
                </div>

                </div>

                <h2> Pedidos Recentes </h2>
                
                <div className="fundo-pedido">

                    <table className="tabela">
                        <thead>
                            <tr>
                                <td> Codigo </td>
                                <td> Cliente </td>
                                <td> CEP </td>
                                <td> Preço </td>
                                <td> Situação </td>
                                <td> Editar </td>
                                <td> Excluir </td>
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
                                    <td> <button onClick={() => exibirAlterar(item.id_pedido)}> editar </button>  </td>
                                    <td> <button onClick={() => Remover(item.id_pedido)}> lixo </button>  </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>


        </main>
    )
}