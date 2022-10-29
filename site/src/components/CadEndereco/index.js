import { useState } from 'react'
import Storage from 'local-storage'
import { toast } from 'react-toastify'
import { SalvarEndereco } from '../../API/usuario/enderecoApi';
import './index.scss'

export default function CadastroEndereco() {
    const [referencia, setReferencia] = useState('');
    const [cep, setCEP] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [endereco, setEndereco] = useState('');

    async function salvarEndereco() {
        try {
            const id = Storage('cliente-logado').data.id;
            const r = await SalvarEndereco(id, cep, referencia, endereco, bairro, cidade, estado, numero);
            toast('Endereço salvo');

        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }   

    


    return (
        <div className='comp-endereco'>
            <div>
                <div className='conteudo'>
                    <div className='endereco'>
                    <img  src='./../../../images/casaEndereco.png'></img>
                    <p> Endereço </p>
                    </div>

                    <div className='form'>
                        
                        </div>
                        <div className='endereco1'>
                            <div className='div1'>
                                <p> CEP</p>
                                <input type='text' value={cep}  onChange={e => setCEP(e.target.value)}  />
                            </div>
                            <div className='div2'>
                                <p> Referência</p>
                                <input type='text' value={referencia} onChange={e => setReferencia(e.target.value)} />
                            </div>
                        </div>
                        <div>
                           
                        <label> &nbsp; </label>


                        <div className='endereco1'>
                            <div className='div3'>
                                    <p>Endereço</p>
                                    <input type='text' value={endereco}  onChange={e => setEndereco(e.target.value)}  />
                                </div>
                            <div className='div4'>
                                <p> Número</p>
                                <input type='text' value={numero}  onChange={e => setNumero(e.target.value)}  />
                        </div>
                       </div>
                        
                        <div>
                            <label> &nbsp; </label>
                        </div>
                        
                        <div className='endereco1'>
                            <div>
                                <p> Bairro</p>
                                <input type='text' value={bairro}  onChange={e => setBairro(e.target.value)}  />
                            </div>
                            <div className='div6'>
                                <p> Estado</p>
                                <input type='text' value={estado}  onChange={e => setEstado(e.target.value)}  />
                            </div>
                            <div className='div6'>
                                <p> Cidade</p>
                                <input type='text' value={cidade}  onChange={e => setCidade(e.target.value)}  />
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
    )
}