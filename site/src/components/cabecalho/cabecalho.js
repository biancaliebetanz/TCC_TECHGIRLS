import { useState } from 'react';
import { Link } from 'react-router-dom';
import { buscarProdutosPorNome } from '../../API/CadProduto.js';
import './cabecalho.scss';
import BoxProdutos from '../boxProdutos/boxProduto.js';
import Storage from 'local-storage'
import { useNavigate } from 'react-router-dom';

export default function CabecalhoPrincipal(props) {
    const navigate= useNavigate();

    const[produtos, setProdutos] = useState('')
    const [busca, setBusca] = useState('');
    


    function logado() {
        if (Storage('cliente-logado')) {
            navigate('/usuario/dados')
        }
        else if (!Storage('cliente-logado')) {
            navigate('/login/usuario')
        }
    }

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
                <img onClick={logado} className='icons' src={props.user} />

                <Link to='/usuario/pedido'><img className='icons' src={props.sacola} /></Link>

            </header>
        </div>
    )
}