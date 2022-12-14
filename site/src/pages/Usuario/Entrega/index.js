import Storage from 'local-storage';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../../../API/config';
import { salvarNovoPedido } from '../../../API/usuario/pedido.js';
import { buscarPorId } from '../../../API/Usuario.js';
import { ListarEnderecos, SalvarEndereco } from '../../../API/usuario/enderecoApi.js';
import CabecalhoCompra from '../../../components/cabecalhoCompra/index.js';
import CaixaPagamento from '../../../components/caixaPagamento';
import CardEndereco from '../../../components/cardEndereco';
import LinhaFinalizacao from '../../../components/linhaFinalizacao/index.js';
import Rodape from '../../../components/rodape';
import './index.scss'
import CadastroEndereco from '../../../components/CadEndereco';

export default function Pedido() {

    const navigate = useNavigate();

    const [id, setId] = useState();

    const [itens, setItens] = useState([]);
    const [pedido, setPedido] = useState({});
    const [frete, setFrete] = useState('');

    const [idEndereco, setIdEndereco] = useState();

    const [cartao, setCartao] = useState({});

    const [produto, setProduto] = useState([]);
    const [nomecar, setNomeCar] = useState('');
    const [numero, setNumero] = useState('');
    const [validade, setValidade] = useState('');
    const [cvv, setCvv] = useState('');
    const [cpf, setCpf] = useState('');
    const [tipo, setTipo] = useState('');
    const [parcelas, setParcelas] = useState('');
    const [enderecos, setEnderecos] = useState([]);
    const [valorTotal, setValorTotal] = useState(0.0);

    const [novoEnd, setNovoEnd] = useState(false);

    const [referencia, setReferencia] = useState('');
    const [cep, setCEP] = useState('');
    const [numeroEnd, setNumeroEnd] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [endereco, setEndereco] = useState('');

    async function salvarEndereco() {
        try {
            const id = Storage('cliente-logado').data.id;
            const r = await SalvarEndereco(id, cep, referencia, endereco, bairro, cidade, estado, numeroEnd);
            toast('Endere??o salvo');
            carregarEnderecos();

        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }

    function adicionarEnd() {
        if (novoEnd == true) {
            setNovoEnd(false)
        }
        else {
            setNovoEnd(true)
        }
    }

    async function carregarEnderecos() {
        const r = await ListarEnderecos(Storage('cliente-logado').data.id);
        setEnderecos(r);
    }

    function exibirImagem(item) {
        return API_URL + '/' + item.produto.destaque.url;
    }

    function calcularValorTotal() {
        let t = 0.0;
        for (let item of itens) {
            t = t + item.produto.info.preco * item.qtd;
        }
        console.log(t)
        console.log(valorTotal)
        setValorTotal(Storage('preco'));
    }

    async function CarregarProdutos() {
        let carrinho = Storage('carrinho')
        if (carrinho) {
            let temp = [];
            for (let produto of carrinho) {
                let p = await buscarPorId(produto.id);
                temp.push({
                    produto: p,
                    qtd: produto.qtd,

                })
            }
            setItens(temp)
        }
    }

    async function SalvarPedido() {
        try {
            if(!idEndereco){
                throw new Error('Endere??o n??o selecionado!');
            }
            setValorTotal(calcularValorTotal());
            setCartao({
                usuario: id,
                nomeCartao: nomecar,
                numero: numero,
                validade: validade,
                codigo: cvv,
                cpf: cpf,
                parcelas: parcelas
            });
            const r = await salvarNovoPedido(Storage('cliente-logado').data.id, idEndereco, frete, valorTotal, cartao, produto)
            console.log(r)
            toast.dark('pedido inserido com sucesso')
            Storage('carrinho', []);
            Storage('preco', 0)
            navigate('/usuario/finalizacao')

        } catch (err) {
            toast.error('Erro: ' + err.message);
        }

    }

    useEffect(() => {
        CarregarProdutos();
        calcularValorTotal();
        carregarEnderecos();
        setId(Storage('cliente-logado').data.id)
        setProduto(Storage('carrinho'));
        console.log(produto)
        console.log('id ?? ' + id)
    }, [])

    return (
        <main className='mainentrega'>
            <CabecalhoCompra logo='../../../images/logoAdmin.png' />
            <LinhaFinalizacao alterar1='alterar1' alterar2='alterar2' alterar3='alterar3' />

            <section className='pag-form'>
                <div className='alinhando-column'>
                    <div className='titulo'>
                        <p>Selecione  o endere??o em que deseja  receber seu pacote </p>
                        <hr />
                        <div>
                            <div className='box-endereco'>
                                {enderecos.map(item =>
                                    <CardEndereco item={item} selecionar={setIdEndereco} selecionado={item.id == idEndereco} />
                                )}
                            </div>

                            
                            </div>
                            </div>

                            <button className="button" onClick={adicionarEnd}> Novo </button>

                            {novoEnd == true &&

                                <div className='camp-endereco'>
                                    <div>
                                        <div className='conteudo'>
                                            <div className='endereco'>
                                                <img src='./../../../images/casaEndereco.png'></img>
                                                <p> Insira um novo endere??o </p>
                                            </div>

                                            <div className='form'>

                                            </div>
                                            <div className='endereco1'>
                                                <div className='div1'>
                                                    <p> CEP</p>
                                                    <input type='text' value={cep} onChange={e => setCEP(e.target.value)} />
                                                </div>
                                                <div className='div2'>
                                                    <p> Refer??ncia</p>
                                                    <input type='text' value={referencia} onChange={e => setReferencia(e.target.value)} />
                                                </div>
                                            </div>
                                            <div>

                                                <label> &nbsp; </label>


                                                <div className='endereco1'>
                                                    <div className='div3'>
                                                        <p>Endere??o</p>
                                                        <input type='text' value={endereco} onChange={e => setEndereco(e.target.value)} />
                                                    </div>
                                                    <div className='div4'>
                                                        <p> N??mero</p>
                                                        <input type='number' value={numeroEnd} onChange={e => setNumeroEnd(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label> &nbsp; </label>
                                                </div>

                                                <div className='endereco1'>
                                                    <div>
                                                        <p> Bairro</p>
                                                        <input type='text' value={bairro} onChange={e => setBairro(e.target.value)} />
                                                    </div>
                                                    <div className='div6'>
                                                        <p> Estado</p>
                                                        <input type='text' value={estado} onChange={e => setEstado(e.target.value)} />
                                                    </div>
                                                    <div className='div6'>
                                                        <p> Cidade</p>
                                                        <input type='text' value={cidade} onChange={e => setCidade(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div>

                                                    <div className='btn'>
                                                        <button onClick={salvarEndereco}> Salvar </button>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            }


                            <div className='formulario-cartao'>

                                <div className='compra'>
                                    <img src='./../../../images/cartao.png'></img>
                                    <p className='pagamento'>Pagamento</p>
                                </div>
                                <div className='fileira1'>
                                    <div className='div1'>
                                        <p>Nome impresso no cart??o</p>
                                        <input type='text' value={nomecar} onChange={e => setNomeCar(e.target.value)}></input>
                                    </div>

                                    <div className='div2'>
                                        <p>N??mero do cart??o</p>
                                        <input type='text' value={numero} onChange={e => setNumero(e.target.value)}></input>

                                    </div>
                                </div>

                                <div className='fileira1'>
                                    <div>
                                        <p>Validade</p>
                                        <input type='date' value={validade} onChange={e => setValidade(e.target.value)}></input>
                                    </div>
                                    <div className='div3'>
                                        <p>cvv</p>
                                        <input type='text' value={cvv} onChange={e => setCvv(e.target.value)}></input>
                                    </div>
                                    <div className='div3'>
                                        <p>Tipo</p>
                                        <select value={tipo} onChange={e => setTipo(e.target.value)}>
                                            <option>Selecione</option>
                                            <option>D??bito</option>
                                            <option>Cr??dito</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='fileira1'>
                                    <div>
                                        <p>CPF</p>
                                        <input type='text' value={cpf} onChange={e => setCpf(e.target.value)}></input>
                                    </div>
                                    <div className='div4'>
                                        <p>Parcelas</p>
                                        <select value={parcelas} onChange={e => setParcelas(e.target.value)}>
                                            <option>selecione</option>
                                            <option>?? vista</option>
                                            <option>1 x</option>
                                            <option>2 x</option>
                                            <option>3 x</option>
                                            <option>4 x</option>

                                        </select>
                                    </div>
                                    <div className='div5'>
                                        <p>Frete</p>
                                        <select value={frete} onChange={e => setFrete(e.target.value)}>
                                            <option>selecione</option>
                                            <option>Gr??tis</option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className='alinhamento-resumo'>
                            <div className='box-resumo'>

                                <div className='cab-res-ped'>
                                    <img src='../../../images/prancheta.png' />
                                    <p>Resumo do Pedido</p>
                                </div>
                                {itens.map(item =>
                                    <div className='resumo-pedidos'>
                                        <img className='imagem-resumo' src={exibirImagem(item)} />
                                        <div className='titulos'>
                                            <h2>{item.produto.info.NomeTema}</h2>
                                            <p className='nome'>{item.produto.info.nome}</p>
                                            <p className='preco'>R${item.produto.info.preco}</p>
                                        </div>

                                        <p className='qtd'>x{item.qtd}</p>

                                        <p className='sub-total'>R${item.qtd * item.produto.info.preco}</p>

                                    </div>

                                )}

                            </div>
                            <div className='total'>
                                TOTAL<p className='p-total'>R$ {valorTotal} </p>
                            </div>

                            <button className='salvar' onClick={SalvarPedido}>Finalizar</button>
                        </div>

                    </section>


                    <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png' ></Rodape>

                </main>
                )
}