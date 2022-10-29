import MenuAdmin from "../../../components/pagAdm/pagAdm.js";
import Tema from "../../../components/tema/tema.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import { API_URL } from "../../../API/config.js";
import { deletarTema, Temas } from "../../../API/tema/temaAPI.js";
import { toast } from "react-toastify";

export default function Index() {

    const navigate = useNavigate();

    const [temas, setTemas] = useState([]);

    async function listarTemas(){
        let x = await Temas();
        console.log(x)
        setTemas(x);
    }

    function exibir(imagem){
        return `${API_URL}/${imagem}`;
    }

    async function editar(id){
        navigate(`/admin/tema/${id}`)
    }
    
    async function deletar(id){
        const r = await deletarTema(id);
        toast('Tema deletado')
    }


    useEffect(() =>{
        listarTemas()
    }, [])

    return (
        <main className="temas">
            <MenuAdmin logo='../../../images/logoAdmin.png'></MenuAdmin>

            <div className="tema-container">
                <h2 className="titulo"> TEMAS </h2>
                <Link className="butao" to='/admin/tema'> Novo Tema</Link>
                <div className="cont-tema">
                    {temas.map( item =>
                    <Tema className="tema" 
                    nome={item.nome} 
                    imagem={exibir(item.imagem)} 
                    deletar={() => deletar(item.id)} 
                    editar={() => editar(item.id)} 
                    id={item.id}/>
                        )}
            </div>
                
            </div>
            
        </main>


    )
}