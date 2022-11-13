import './index.scss'

import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc.js';
import Caixa from '../../../components/boxInfos/boxInfos.js';
import MenuUsuario from '../../../components/menuUsuario/menuUsuario';
import Legendas from '../../../components/cabLegenda';
import Rodape from '../../../components/rodape';
import { Link, useNavigate } from 'react-router-dom';
import Storage from 'local-storage';
import { useEffect, useState } from 'react';
import { buscarUsuarioId } from '../../../API/Usuario';
import Infos from '../../../components/infosUser';
import { ListarEnderecos } from '../../../API/usuario/enderecoApi';
import CardEndereco from '../../../components/cardEndereco';

export default function Index() {

    // VARIÁVEIS DE ESTADO

    const navigate = useNavigate();

    const [id, setId] = useState(Storage('cliente-logado').data.id);

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [datadenasc, setDatadenasc] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');

    const [exibir, setExibir] = useState(1);

    const [enderecos, setEnderecos] = useState([]);
    const [usuario, setUsuario] = useState([]);

    // FUNÇÕES

    async function CarregarNome() {
        const r = await buscarUsuarioId(Storage('cliente-logado').data.id);
        setUsuario(r);
    }

    async function carregarEnderecos() {
        const r = await ListarEnderecos(Storage('cliente-logado').data.id);
        setEnderecos(r);
    }

    function SairCliente() {
        Storage.remove('cliente-logado');
        navigate('/')
    }

    function carregarUsuario() {
        const x = buscarUsuarioId(id)
        console.log(x);
        setNome(x.nome);
    }


    // USE EFFECTS

    useEffect(() => {
        carregarEnderecos();
    }, [enderecos])

    useEffect(() => {
        CarregarNome();
    }, [usuario]);

    useEffect(() => {
        CarregarNome();
        carregarEnderecos();
    }, [])



    useEffect(() => {
        if (!Storage('cliente-logado')) {
            navigate('/login/usuario')
        }
        else {
            carregarUsuario();
        }
    }, [])

    return (
        <main className='DadosPessoais'>
            <div>
                <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png' fav='../../../images/favoritos.png'
                    user='../../../images/user.png' sacola='../../../images/sacola.png' />
            </div>
            <div>
                <Legendas nome='Dados Pessoais' cor={'#6235b4'} />
            </div>

            <div className='dados'>
                <div className="menu-user">
                    <div className="direction">
                        <div>
                            <img className="usuario-logado" src="./../../../images/usuariologado.png"></img>
                            <p> Olá {usuario.nome}!!</p>
                        </div>
                        <div className="links">
                            <button onClick={() => setExibir(1)} className="Link">Dados Pessoais</button>
                            <button onClick={() => setExibir(2)} className="Link">Endereços</button>
                            <button className="Link">Meus Pedidos</button>
                            <div>
                                <p onClick={SairCliente} className="Link">Sair</p>
                            </div>

                        </div>
                    </div>

                    <hr className="hr"></hr>
                </div>

                {exibir == 1 &&

                    <Infos />
                }

                {exibir == 2 &&
                    <div className='end-card'>
                        {enderecos.map(item =>
                            <CardEndereco item={item} />
                        )}

                    </div>

                }

                {exibir == 3 &&

                    <div>

                    </div>
                }
            </div>

            <div>
                <Link className='Link2' to='/editar/dados'> Editar Informações</Link>

            </div>


            <div className='rod'>
                <Rodape />

            </div>
        </main>

    )
}