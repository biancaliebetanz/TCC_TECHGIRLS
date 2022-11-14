import './index.scss'

import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc.js';
import Legendas from '../../../components/cabLegenda';
import Rodape from '../../../components/rodape';
import { Link, useNavigate } from 'react-router-dom';
import Storage from 'local-storage';
import { useEffect, useState } from 'react';
import { buscarLoginId, buscarUsuarioId } from '../../../API/Usuario';
import { ListarEnderecos } from '../../../API/usuario/enderecoApi';
import CardEndereco from '../../../components/cardEndereco';
import CadastroEndereco from '../../../components/CadEndereco';

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

    // dados

    const [usuario, setUsuario] = useState([]);
    const [usuarioLogin, setUsuarioLogin] = useState([]);


    // FUNÇÕES

    async function CarregarInfos() {
        const resposta = await buscarUsuarioId(Storage('cliente-logado').data.id);
        setUsuario(resposta);
    }

    async function CarregarInfosLogin() {
        const resposta = await buscarLoginId(Storage('cliente-logado').data.id);
        setUsuarioLogin(resposta);
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
        CarregarInfos();
        CarregarInfosLogin();

    }, [usuario, usuarioLogin])

    useEffect(() => {
        carregarEnderecos();
    }, [enderecos])

    useEffect(() => {
        CarregarInfos();
        CarregarInfosLogin();
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

                    // <Infos />
                    <div className='flex-column-info'>
                        <h2> Dados Pessoais</h2>
                        <div className="princ-infos1">
                            <div className="coluna11">
                                <div>
                                    <p id='nome'>Nome</p>
                                    <span>{usuario.nome}</span>
                                </div>
                                <div>
                                    <p>E-mail</p>
                                    <span>{usuarioLogin.email}</span>
                                </div>
                                <div>
                                    <p>Telefone</p>
                                    <span>{usuario.telefone}</span>
                                </div>
                            </div>
                            <div className="coluna21">
                                <div>
                                    <p>CPF</p>
                                    <span>{usuario.cpf}</span>
                                </div>
                                <div>
                                    <p>RG</p>
                                    <span>{usuario.rg}</span>
                                </div>
                                <div>
                                    <p>Data de Nascimento</p>
                                    <span>{usuario.nascimento}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button className='Link2' onClick={() => setExibir(4)}> Editar Informações </button>
                        </div>

                    </div>

                }

                {exibir == 2 &&
                    <div className='flex-column-info'>
                        <h2> Endereços</h2>
                        <div className='end-card'>
                            {enderecos.map(item =>
                                <CardEndereco item={item} />
                            )}

                        </div>

                        <div>
                            <button className='Link2' onClick={() => setExibir(5)}> Novo endereço </button>
                        </div>

                    </div>


                }

                {exibir == 3 &&

                    <div className='flex-column-info'>
                       <h2> Meus Pedidos</h2>
                       <div> </div>
                    </div>
                }

                {exibir == 4 &&
                    <div className='flex-column-info'>
                         <h2> Editar informações</h2>
                    </div>
                }

                {exibir == 5 &&

                <div className='flex-column-info'> 
                    <h2> Novo Endereço </h2>
                    <CadastroEndereco />
                </div>

                }

                {exibir == 6 &&
                    <div className='flex-column-info'>
                        <h2> Visualizar Pedido</h2>

                    </div>
                }
            </div>


            <div className='rod'>
                <Rodape />

            </div>
        </main>

    )
}