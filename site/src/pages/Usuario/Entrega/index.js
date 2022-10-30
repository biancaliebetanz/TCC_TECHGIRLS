import Storage from 'local-storage';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../../../API/config';
import { salvarNovoPedido } from '../../../API/pedido';
import { buscarPorId } from '../../../API/Usuario';
import { ListarEnderecos } from '../../../API/usuario/enderecoApi';
import CabecalhoCompra from '../../../components/cabecalhoCompra/index.js';
import CaixaPagamento from '../../../components/caixaPagamento';
import CardEndereco from '../../../components/cardEndereco';
import LinhaFinalizacao from '../../../components/linhaFinalizacao/index.js';
import Rodape from '../../../components/rodape';
import './index.scss'

export default function Pedido(){

    const navigate = useNavigate();

    const [id, setId] = useState(Storage('cliente-logado').data.id);

    const [itens, setItens] = useState([]);
    const [pedido, setPedido] = useState({});
    const [frete, setFrete] = useState('');

    const [idEndereco, setIdEndereco] = useState();

    const [produto, setProduto] = useState([]);
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [validade, setValidade] = useState('');
    const [cvv, setCvv] = useState('');
    const [cpf, setCpf] = useState('');
    const [tipo, setTipo] = useState('');
    const [parcelas, setParcelas] = useState('');
    const [enderecos, setEnderecos] = useState([]);

    async function carregarEnderecos(){
        const r= await ListarEnderecos(Storage('cliente-logado').data.id);
        setEnderecos(r);
    }

   function exibirImagem(item) {
    return API_URL + '/' + item.produto.destaque.url;
}
   
   function calcularValorTotal(){
    let t = 0;
    for(let item of itens){
      t = t +  item.produto.info.preco * item.qtd;
    }
    return t;
}

    async function CarregarProdutos(){
        let carrinho= Storage('carrinho')
        if(carrinho){
            let temp= [];
            for(let produto of carrinho){
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
           setProduto(Storage('carrinho'));
           setPedido(  
           {
               endereco: idEndereco,
               tipoFrete: frete,
               cartao:{
                 usuario: 1,
                 nomeCartao: nome,
                 numero: numero,
                 validade: validade,
                 codigo: cvv,
                 cpf: cpf,
                 parcelas: parcelas
               },
               produto: produto
           } )
           const r= await salvarNovoPedido(id, pedido)
           toast.dark('pedido inserido com sucesso')
           Storage('carrinho', []);
            
        } catch (err) {
            toast.error(err.response.data.erro);
        }

    }

    useEffect(() =>{
        carregarEnderecos();
    }, [enderecos])

    useEffect(() => {
        CarregarProdutos();
        carregarEnderecos();
    }, [])
    
    return(
        <main className='mainentrega'>
            <CabecalhoCompra logo='../../../images/logoAdmin.png' />  
            <LinhaFinalizacao alterar1='alterar1' alterar2='alterar2' alterar3='alterar3'/>

            <section className='pag-form'>
                <div className='alinhando-column'>
                <div className='titulo'>
                    <p>Selecione  o endereço em que deseja  receber seu pacote </p>
                    <hr />
                
                    <div className='box-endereco'>
                        {enderecos.map(item =>
                            <CardEndereco item={item} selecionar={setIdEndereco} selecionado={item.id == idEndereco}/>
                        )}
                    </div>

                </div>



                <div className='formulario-cartao'>

                    <div className='compra'>
                        <img src='./../../../images/cartao.png'></img>
                        <p className='pagamento'>Pagamento</p>
                    </div>
                <div className='fileira1'>
                    <div className='div1'>
                            <p>Nome impresso no cartão</p>
                            <input type='text' value={nome} onChange={e => setNome(e.target.value)}></input>
                        </div>

                        <div className='div2'>
                            <p>Número do cartão</p>
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
                        <select  value={tipo} onChange={e => setTipo(e.target.value)}>
                        <option>Selecione</option>
                        <option>Débito</option>
                        <option>Crédito</option>
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
                        <select  value={parcelas} onChange={e => setParcelas(e.target.value)}>
                        <option>selecione</option>
                        <option>2</option>
                        <option>3</option>
                        </select>
                    </div>
                    <div className='div5'>
                        <p>Frete</p>
                        <select  value={frete} onChange={e => setFrete(e.target.value)}>
                        <option>selecione</option>
                        <option>2</option>
                        <option>3</option>
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
                                TOTAL<p className='p-total'>R${calcularValorTotal()}</p>
                    </div>

                    <button className='salvar' onClick={SalvarPedido}>Finalizar</button> 
                </div>
            
            </section>

                
            <Rodape/>
        </main>
    )
}