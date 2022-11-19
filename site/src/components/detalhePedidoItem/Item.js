import { API_URL } from "../../API/config";
import './Item.scss'

export default function Item(props) {

    function exibir(imagem) {
        return `${API_URL}/${imagem}`;
    }

    return (
        <tr className="registro">
            <td>
                <div className='divrow'>
                    <img className='img' src={exibir(props.item.imagem)} alt='' />
                    <div className='infos-detalhe-carrinho'>
                        <h3> {props.item.tema} </h3>
                        <h4> {props.item.nome} </h4>
                    </div>
                </div>
            </td>
            <td> {props.item.preco}</td>
            <td> {props.item.qtd} </td>
            <td> {props.item.subtotal} </td>
        </tr>
    )
}