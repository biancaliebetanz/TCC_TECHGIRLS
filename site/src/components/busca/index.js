
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './index.scss';

export default function ProdutoBusca(props){

    const [id, setId] = useState(props.id);
    
    const navigate = useNavigate();

    function visualizarProduto(){
        navigate(`/produto/${id}/detalhe`)
    }
    

    return(
        <div className="boxbusca" onClick={visualizarProduto}>
            <p className="nome-busca" > {props.nome} </p>
        </div>
    )
}