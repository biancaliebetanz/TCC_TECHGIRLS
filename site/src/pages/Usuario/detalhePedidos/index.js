import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { alterarSituacaoPedido, listarPedidoId } from '../../../API/admin/pedido/pedidoApi';
import { buscarPorId } from '../../../API/Usuario';
import { avaliarPedido, listarAvaliacaoPedido, listarPedidoItens } from '../../../API/usuario/pedido.js';
import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc'
import Legendas from '../../../components/cabLegenda'
import Item from '../../../components/detalhePedidoItem/Item';
import Rodape from '../../../components/rodape';
import Storage from 'local-storage'
import './index.scss'
import { toast } from 'react-toastify';

export default function Index() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [usuario, setUsuario] = useState(Storage('cliente-logado').data.id)
    const [pedido, setPedido] = useState({});

    const [itens, setItens] = useState([]);
    const [comentario, setComentario] = useState('');

    const [nota, setNota] = useState(0);
    const [avaliado, setAvaliado] = useState(false)

    async function carregarPedido() {
        const x = await listarPedidoId(id);
        const y = await listarPedidoItens(id);
        setPedido(x);
        setItens(y);
    }

    function alterarNota(nota) {
        if (avaliado == false) {
            setNota(nota)
        }
    }

    function zerarNota() {
        if (avaliado == false) {
            if (nota == 1) {
                setNota(0)
            }
            else {
                setNota(1)
            }
        }
    }

    async function carregarAvaliacao() {
        const x = await listarAvaliacaoPedido(id);
        console.log(x);
        if (!x) {
            return ''
        }
        else {
            console.log(x.comentario)
            setComentario(x.comentario);
            setNota(x.nota);
            setAvaliado(true)
        }
    }

    async function avaliarPedidoClick() {
        try {
            if (pedido.situacao == 'Pacote Chegou' && avaliado == false ) {
                const x = await avaliarPedido(id, usuario, nota, comentario);
                console.log(id)
                const y = await alterarSituacaoPedido(id, 'Pedido Finalizado');
                setAvaliado(true);
                carregarPedido();
                carregarAvaliacao();
                toast('Pedido Avaliado com sucesso');
            }
            else {
                throw new Error('Não é possível avaliar um pedido que já foi finalizado!')
            }
        }

        catch (err) {
            toast.error('Erro: ' + err.message)
        }
    }

    useEffect(() => {
        if (!Storage('cliente-logado')) {
            navigate('/')
        }
        carregarPedido();
        carregarAvaliacao();
    }, [])


    return (
        <main className='detalhePed-info'>
            <div>
                <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png' fav='../../../images/favoritos.png'
                    user='../../../images/user.png' sacola='../../../images/sacola.png' pesquisa='../../../images/lupa.png' />
                <Legendas nome='Detalhe do Pedido' />

            </div>
            <p> Código: <span> {pedido.id_pedido} </span>  </p>
            <p> Cliente: <span> {pedido.nome} </span> </p>

            <section className='section'>


                <div className='overflow-y'>
                    <table className="tabela">
                        <thead>
                            <tr>
                                <td className="td"> Produto </td>
                                <td> Preço </td>
                                <td> Quantidade </td>
                                <td> Subtotal </td>
                            </tr>
                        </thead>
                        <tbody >
                            {itens.map(item =>
                                <Item item={item} />

                            )}
                        </tbody>
                    </table>
                </div>



                <div className="valoresFinais">
                    <textarea type='text' value={comentario} onChange={e => setComentario(e.target.value)} placeholder='Deixe sua Avaliação...'>   </textarea>

                    <div className='estrelas'>
                        <img onClick={zerarNota} src={nota >= 1 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                        <img onClick={() => alterarNota(3)} src={nota >= 2 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                        <img onClick={() => alterarNota(3)} src={nota >= 3 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                        <img onClick={() => alterarNota(4)} src={nota >= 4 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                        <img onClick={() => alterarNota(5)} src={nota === 5 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                        <button onClick={avaliarPedidoClick}> {avaliado ? 'Salvo' : 'Salvar'}</button>
                    </div>

                    <h3>Produtos</h3>
                    <hr className="linha-sacola"></hr>
                    <h3 className="h3-total">Total : R$ {pedido.preco}</h3>
                    <h3 className='situation'>{pedido.situacao}</h3>
                </div>
            </section>


            <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png' logo='./../../../images/logo.png' />


        </main>

    )
}