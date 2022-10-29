import MenuAdmin from "../../../components/pagAdm/pagAdm.js";
import Tema from "../../../components/tema/tema.js";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import { API_URL } from "../../../API/config.js";
import { Temas } from "../../../API/tema/temaAPI.js";

export default function Index() {

    const [temas, setTemas] = useState([]);

    async function listarTemas(){
        let x = await Temas();
        console.log(x)
        setTemas(x);
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
                    <Tema className="tema" nome={item.nome} imagem={item.imagem} id={item.id}/>
                        )}
            </div>
                
            </div>
            
        </main>


    )
}