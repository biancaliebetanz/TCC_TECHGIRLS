
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../API/config";
import './boxProdutoTema.scss';

export default function Index(props){

    const id = props.id;
    
    const navigate = useNavigate();

    function exibirImagem(img){
        return API_URL + '/' + img;
    }

    function visualizarProduto(){
        navigate(`/produto/${id}/detalhe`)
    }

    return(
        <div className="boxtema">
            <img className="fav" src="../../../../images/heartempty.png"/>
            <img className="img" alt="" src={exibirImagem(props.imagem)}/>
            <h3 className="nome"> {props.nome} </h3>
            <button className="botao" onClick={visualizarProduto}> {props.preco} </button>
        </div>
    )
}