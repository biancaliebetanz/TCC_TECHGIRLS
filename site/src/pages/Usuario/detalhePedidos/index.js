import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom'
import { listarPedidoId } from '../../../API/admin/pedido/pedidoApi';
import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc'
import Legendas from '../../../components/cabLegenda'
import Item from '../../../components/detalhePedidoItem/Item';
import './index.scss'

export default function Index() {

    const { id } = useParams();
    const [pedido, setPedido] = useState({});
    const [itens, setItens] = useState([1, 2, 3])

    async function carregarPedido() {
        const x = await listarPedidoId(id);
        console.log(x);
    }

    useEffect(() => {
        carregarPedido();
    }, [])

    return (
        <main className='detalhePed'>
            <div>
                <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png' fav='../../../images/favoritos.png'
                    user='../../../images/user.png' sacola='../../../images/sacola.png' pesquisa='../../../images/lupa.png' />
                <Legendas nome='Detalhe do Pedido' />

            </div>

            <section className='section'>
                <table className="tabela">
                    <thead>
                        <tr>
                            <td className="td"> Produto </td>
                            <td> Preço </td>
                            <td> Quantidade </td>
                            <td> Subtotal </td>
                            <td> </td>
                        </tr>
                    </thead>
                    <tbody>
                        {itens.map(item =>
                            <Item />

                        )}
                    </tbody>
                </table>

                <div className="valoresFinais">
                    <textarea placeholder='Deixe sua Avaliação...'></textarea>
                    <div className='estrelas'>
                        <img src='../../../images/Star.png' />
                        <img src='../../../images/Star.png' />
                        <img src='../../../images/Star.png' />
                        <img src='../../../images/Star.png' />
                        <img src='../../../images/Star.png' />
                        <button>Salvar</button>
                    </div>

                    <h3>Produtos</h3>
                    <hr className="linha-sacola"></hr>
                    <h3 className="h3-total">Total : R$</h3>
                    <h3 className='situation'>Situação do pedido</h3>
                </div>
            </section>





        </main>

    )
}