import './index.scss'
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function Caixa(props){
 const {id} = useParams();

    
    const navigate = useNavigate();
     

    function visualizarPedido(){
        navigate(`/pedido/${id}/detalhe`)
    }
    

    return(
        <div className="box-info" onClick={visualizarPedido}>
            <h3 className="nome"> {props.nome} </h3>
            <h3 className="endereco"> {props.endereco} </h3>
            <h3 className="situacao"> {props.situacao} </h3>
            <h3 className="situacao"> {props.preco} </h3>
        </div>
    )
}