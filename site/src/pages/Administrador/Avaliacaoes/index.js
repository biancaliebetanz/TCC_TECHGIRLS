import { useEffect, useState } from 'react';
import { listarAvaliacaoPedido } from '../../../API/usuario/pedido';
import Comentario from '../../../components/comment';
import MenuAdmin from '../../../components/pagAdm/pagAdm'
import './index.scss'    

export default function Index() {
    const [avaliacao, setAvaliacao] = useState([]);



    async function ListarAvaliacoes() {
        const resposta = await listarAvaliacaoPedido();
        console.log(resposta)
        setAvaliacao(resposta)
    }

    useEffect(() => {
       ListarAvaliacoes();
    }, [])

   return(
             <main className="fundo-ava">
            <MenuAdmin logo='../../../images/logoAdmin.png' />


            <section className="fundo">
                <p> Últimas Avaliações</p>

                
              <div>
                  
               
           
              </div>
              


            </section>

        </main>

  

    )
}