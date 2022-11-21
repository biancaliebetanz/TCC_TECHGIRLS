import { useEffect, useState } from 'react';
import { listarAvaliacoes } from '../../../API/usuario/pedido.js';
import Comentario from '../../../components/comment';
import MenuAdmin from '../../../components/pagAdm/pagAdm.js'
import './index.scss'    

export default function Index() {
    const [avaliacao, setAvaliacao] = useState([1,1,1]);



    async function ListarAvaliacoes() {
        const resposta = await listarAvaliacoes();
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
                <h2> Últimas Avaliações</h2>

                
              <div className='avaliacoeszinhas'>
                  
               {avaliacao.map( item =>
                <Comentario item={item} />)}
           
              </div>
              


            </section>

        </main>

  

    )
}