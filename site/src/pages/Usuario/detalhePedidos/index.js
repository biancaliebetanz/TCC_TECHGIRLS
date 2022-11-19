import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc'
import Legendas from '../../../components/cabLegenda'
import './index.scss'

export default function Index(){


    return(
        <main className='detalhePed'>
            <div>
            <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
            user='../../../images/user.png' sacola='../../../images/sacola.png' pesquisa='../../../images/lupa.png'/>
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