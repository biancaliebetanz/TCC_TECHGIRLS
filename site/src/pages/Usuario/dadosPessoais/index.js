import './index.scss'

import CabecalhoPrincipal from '../../../components/cabecalhoPrincipal/cabecalhoPrinc.js';
import Legendas from '../../../components/cabLegenda';
import Rodape from '../../../components/rodape';
import { Link, useNavigate } from 'react-router-dom';
import Storage from 'local-storage';
import { useEffect, useState } from 'react';
import { buscarLoginId, buscarUsuarioId, EditarUsuario } from '../../../API/Usuario';
import { ListarEnderecos } from '../../../API/usuario/enderecoApi';
import CardEndereco from '../../../components/cardEndereco';
import CadastroEndereco from '../../../components/CadEndereco';
import { toast } from 'react-toastify';
import { listarPedidosUser } from '../../../API/usuario/pedido';

export default function Index() {

    // VARIÁVEIS DE ESTADO

    const navigate = useNavigate();

    const [id, setId] = useState(Storage('cliente-logado').data.id);


    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [datadenasc, setDatadenasc] = useState(Date());
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');

    const [exibir, setExibir] = useState(1);

    const [enderecos, setEnderecos] = useState([]);

    const [pedidos, setPedidos] = useState([]);

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

    async function carregarPedidos(){
        const x = await listarPedidosUser(id);
        console.log(x);
        setPedidos(x);
    }

    function SairCliente() {
        Storage.remove('cliente-logado');
        navigate('/')
    }

    async function alterarInfo(){
        try{
            setExibir(1);
            const y = Storage('cliente-logado').data.id;
            const x = await EditarUsuario(nome, telefone, cpf, rg, datadenasc, y)
            toast('Informações alteradas com sucesso!')
        }
        catch(err){
            toast.error('Erro: ' + err.message);
        }
    }

    function carregarUsuario() {
        const x = buscarUsuarioId(id)
        console.log(x);
        setNome(x.nome);
        setTelefone(x.telefone);
        setCpf(x.cpf);
        setRg(x.rg);
        setDatadenasc(x.nascimento);
        setId(x.id);
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
        carregarUsuario();
        carregarPedidos();
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
                    user='../../../images/user.png' sacola='../../../images/sacola.png' pesquisa='../../../images/lupa.png' />
            </div>
            <div>
                <Legendas nome='Dados Pessoais' cor={'#6235b4'} />
            </div>

            <div className='dados'>
                <div className="menu-user">
                    <div className="direction">
                        <div className='user-nome'>
                            <img className="usuario-logado" src="./../../../images/usuariologado.png"></img>
                            <p> Olá {usuario.nome}!!</p>
                        </div>
                        <div className="links">
                            <button onClick={() => setExibir(1)} className="Link">Dados Pessoais</button>
                            <button onClick={() => setExibir(2)} className="Link">Endereços</button>
                            <button onClick={()=> setExibir(3)} className="Link">Meus Pedidos</button>
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
                                <CardEndereco item={item} id={item.id} />
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
                        <div className='flex-row-info'> 
                        
                        {pedidos.map( item => 
                            <div className='borda'>
                                <h3 className='nome-pedido'> {item.nome} </h3>

                                <p> {item.endereco} </p>
                                <p> {item.cep} </p>

                                <div> 
                                    <h2 className='pedido-txt'> Data do pedido: <span> {item.data} </span> </h2>
                                    <h2 className='pedido-txt'> Valor pago: <span> {item.preco} </span> </h2>
                                    <h2 className='pedido-txt'> Situação: <span> {item.situacao} </span></h2>
                                </div>
                                


                            </div>
                                )}

                        </div>
                    </div>
                }

                {exibir == 4 &&
                    <div className='flex-column-info'>
                        <h2> Editar informações</h2>

                        <div className="princ-infos1">
                            <div className="coluna11">
                                <div>
                                    <p id='nome'>Nome</p>
                                    <input type='text' value={nome} onChange={e => setNome(e.target.value)} placeholder={"" + usuario.nome} />
                                </div>
                                <div>
                                    <p>E-mail</p>
                                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder={"" + usuarioLogin.email} />
                                </div>
                                <div>
                                    <p>Telefone</p>
                                    <input type='text' value={telefone} onChange={e => setTelefone(e.target.value)} placeholder={"" + usuario.telefone} />
                                </div>
                            </div>
                            <div className="coluna21">
                                <div>
                                    <p>CPF</p>
                                    <input type='text' value={cpf} onChange={e => setCpf(e.target.value)} placeholder={"" + usuario.cpf} />
                                </div>
                                <div>
                                    <p>RG</p>
                                    <input type='text' value={rg} onChange={e => setRg(e.target.value)} placeholder={"" + usuario.rg} />
                                </div>
                                <div>
                                    <p>Data de Nascimento</p>
                                    <input type='date' value={datadenasc} onChange={e => setDatadenasc(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className='Link2' onClick={alterarInfo}> Salvar </button>
                        </div>
                    </div>
                }

                {exibir == 5 &&

                    <div className='flex-column-info'>
                        <h2> Novo Endereço </h2>
                        <CadastroEndereco />
                    </div>

                }

            </div>


            <div className='rod'>
            <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png' ></Rodape>


            </div>
        </main>

    )
}