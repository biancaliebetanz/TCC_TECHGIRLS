
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../API/config";
import { Favoritar } from "../../API/Usuario";
import './boxProdutoTema.scss';
import Storage from 'local-storage'
import { toast } from 'react-toastify'


export default function ProdutoTema(props){
    const {id} = useParams();
    
    const navigate = useNavigate();

    
    const[usuario, setUsuario] = useState([]);
    const[produto, setProduto] = useState({info: {} ,nome: [] , preco: []});

    async function AdicionarFav() {
        try {
            const r = await Favoritar(usuario.id, produto.id);
            toast('Favoritado');

        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }   


    function exibirImagem(img){
        return API_URL + '/' + img;
    }

    function visualizarProduto(){
        navigate(`/produto/${id}/detalhe`)
    }
    

    return(
        <div className="boxtema">
            <img onClick={AdicionarFav} className="fav" src="../../../../images/heartempty.png"/>
            <img className="img" alt="" src={exibirImagem(props.imagem)}/>
            <h3 className="nome"> {props.nome} </h3>
            <button className="botao" onClick={visualizarProduto}> {props.preco} </button>
        </div>
    )
}