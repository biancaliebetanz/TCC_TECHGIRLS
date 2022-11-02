import { useState } from 'react';
import { Link } from 'react-router-dom';
import { buscarProdutosPorNome } from '../../API/CadProduto.js';
import './cabecalho.scss';
import BoxProdutos from '../boxProdutos/boxProduto.js';

export default function CabecalhoPrincipal(props) {

    const [busca, setBusca] = useState('');


    async function buscarNomeClick() {
        const resp = await buscarProdutosPorNome(busca);
        console.log(resp)
        setProdutos([resp]);
    }


    return (
        <div className='espaco1'>
            <header className="cab">
                <Link to='/'> <img className="logo" alt="" src={props.logo} /></Link>

                <img className='menuCab' alt="" src={props.menu} />

                <div>
                    <input className='busca' placeholder='encontre seu produto aqui' type='text' value={busca} onChange={e => setBusca(e.target.value)} />
                    <button onClick={buscarNomeClick}>pesquisar</button>
                </div>

                <Link to='/Favoritos'><img className='icons' src={props.fav} /></Link>
                <Link to='/login/usuario'>        <img className='icons' src={props.user} /></Link>
                <Link to='/usuario/pedido'><img className='icons' src={props.sacola} /></Link>

            </header>
        </div>
    )
}