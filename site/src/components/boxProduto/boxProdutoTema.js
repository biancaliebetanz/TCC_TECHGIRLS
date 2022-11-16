
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../API/config";
import { buscarFavorito, Favoritar } from "../../API/Usuario.js";
import './boxProdutoTema.scss';
import Storage from 'local-storage'
import { toast } from 'react-toastify'


export default function ProdutoTema(props){

    const [id, setId] = useState(props.id);
    const [usuario, setUsuario] = useState(user());
    
    const navigate = useNavigate();

    const[produto, setProduto] = useState(props.id);

    async function AdicionarFav() {
        try {
            if(!usuario){
                throw new Error('Faça login para favoritar!')
            }
            console.log(produto)
            const x = await buscarFavorito(usuario, produto);
            if(!x){
            const r = await Favoritar(usuario, produto);
            toast('Favoritado');
            }
            else if (x){
                throw new Error('Já favoritado!');
            }
        }
        catch (err) {
            toast.error('Erro: ' + err.message);
        }
    }   

    function user() {
        if(Storage('cliente-logado')){
            return Storage('cliente-logado').data.id
        }
        else {
            return ''
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