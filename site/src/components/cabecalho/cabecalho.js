import { useState } from 'react';
import { Link } from 'react-router-dom';
import { buscarProdutosPorNome } from '../../API/CadProduto.js';
import './cabecalho.scss';
import BoxProdutos from '../boxProdutos/boxProduto.js';

export default function CabecalhoPrincipal(props){
    const [produtos, setProdutos] = useState([]);
   
    const [busca, setBusca] = useState('');


    async function buscarNomeClick() {
        const resp = await buscarProdutosPorNome(busca);
        console.log(resp)
        setProdutos([resp]);
     }




    return(
            <div className='espaco1'>
                <header className="cab">
                <Link to='/'> <img className="logo" alt="" src={props.logo}/></Link>    

                    <img  className='menuCab' alt="" src={props.menu}/>

                    <div>
                    <input className='busca' placeholder='encontre seu produto aqui' type='text' value={busca} onChange={e=> setBusca(e.target.value)} />
                    <button onClick={buscarNomeClick}>pesquisar</button>

                        


                    </div>
                    
                    <Link to='/Favoritos'><img className='icons' src={props.fav}></img></Link>
                    <Link to='/login/usuario'>        <img className='icons' src={props.user}></img></Link>
                    <Link to='/usuario/pedido'><img className='icons' src={props.sacola}></img></Link>

                    
            </header>
                <hr className='linha'></hr>

                <img className='banner1' src={props.banner}></img>

            <div className='links-menu'>
            <Link className='Link'>Vestimenta</Link>
            <Link className='Link' >Acessório</Link>
            <Link className='Link'>Colecionável</Link>
            <Link className='Link'>Funko</Link>
            <Link className='Link'>Caneca</Link>
            <Link className='Link'>Pelúcia</Link>
            <Link className='Link'>Moda Casa</Link>

            </div>
            <hr className='linha-menu'></hr>
               <div>
                   {produtos.map(item =>
                        <BoxProdutos
                        img=""
                        preco={item.preco}
                        nome={item.nome}
                        />
                    )}
               </div>
        </div>
        )
}