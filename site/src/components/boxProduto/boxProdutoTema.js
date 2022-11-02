
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../API/config";
import { Favoritar } from "../../API/Usuario.js";
import './boxProdutoTema.scss';
import Storage from 'local-storage'
import { toast } from 'react-toastify'


export default function ProdutoTema(props){

    const [id, setId] = useState(props.id);
    const [usuario, setUsuario] = useState(Storage('cliente-logado').data.id);
    
    const navigate = useNavigate();

    const[produto, setProduto] = useState(props.id);

    async function AdicionarFav() {
        try {
            console.log(produto)
            const r = await Favoritar(usuario, produto);
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