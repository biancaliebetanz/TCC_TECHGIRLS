import { buscarProdutosPorNome } from "../../API/CadProduto";

export  default function Comentario(props){
    return(
        <div className="comment">
            <p>{props.nome}</p>
            <p>{props.comentario}</p>
            <p>{props.nota}</p>
        </div>
    )
}