import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { listarPedidoId } from '../../../API/admin/pedido/pedidoApi';
import { buscarPorId } from '../../../API/Usuario';
import { listarPedidoItens } from '../../../API/usuario/pedido';
import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc'
import Legendas from '../../../components/cabLegenda'
import Item from '../../../components/detalhePedidoItem/Item';
import Rodape from '../../../components/rodape';
import './index.scss'

export default function Index() {

    const { id } = useParams();
    const [pedido, setPedido] = useState({});

    const [itens, setItens] = useState([]);

    const [nota, setNota] = useState(0);


    async function carregarPedido() {
        const x = await listarPedidoId(id);
        const y = await listarPedidoItens(id);
        setPedido(x);
        setItens(y);
        console.log(x);
        console.log(y);
    }

    function zerarNota() {
        if(nota==1){
            setNota(0)
        }
        else {
            setNota(1)
        }
    }

    useEffect(() => {
        carregarPedido();
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
                    <textarea placeholder='Deixe sua Avaliação...'></textarea>
                    
                    <div className='estrelas'>
                        <img onClick={zerarNota} src={nota >= 1 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                        <img onClick={() => setNota(2)} src={nota >= 2 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                        <img onClick={() => setNota(3)} src={nota >= 3 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                        <img onClick={() => setNota(4)} src={nota >= 4 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                        <img onClick={() => setNota(5)} src={nota == 5 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                        <button>Salvar</button>
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