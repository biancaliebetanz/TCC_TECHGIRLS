import './index.scss';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UsuarioCadastro } from '../../../API/Usuario';
import { toast } from 'react-toastify';
import { InserirUsuarioLogin } from '../../../API/logAdm';

export default function Index() {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [datadenasc, setDatadenasc] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');

    async function cadastrarUsuario() {
        try{
            const a = await UsuarioCadastro(nome, telefone, cpf, rg, datadenasc);
            console.log(a);
            if (senha == confSenha) {
            const b = await InserirUsuarioLogin(a.id, email, senha);
            toast('Usuário cadastrado')
            }
        }
        catch(err){
            toast.error({ Erro: err.message})
        }
       
    }

    return(
        <main className='cadastro'>

             <div className='fundo'>
                <h1> Cadastre-se </h1>

                <div className='flex-row'>

                    <div className='flex-column espacamento'>
                        <div>
                            <label> Nome </label>
                            <input type="text" value={nome} onChange={e => setNome(e.target.value)}/>
                        </div>

                        <div>
                            <label> Telefone </label>
                            <input maxLength={20} type="text" value={telefone} onChange={e => setTelefone(e.target.value)}/>
                        </div>

                        <div>
                            <label> Data de nascimento </label>
                            <input type="date" value={datadenasc} onChange={e => setDatadenasc(e.target.value)}/>
                        </div>

                        <div>
                            <label> RG </label>
                            <input maxLength={20} type="text" value={rg} onChange={e => setRg(e.target.value)}/>
                        </div>
                    </div>

                    <div className='flex-column espacamento'>
                        <div>
                            <label> CPF </label>
                            <input maxLength={20} type="text" value={cpf} onChange={e => setCpf(e.target.value)}/>
                        </div>

                        <div>
                            <label> Email </label>
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>

                        <div>
                            <label> Senha </label>
                            <input type="password" value={senha} onChange={e => setSenha(e.target.value)}/>
                        </div>

                        <div>
                            <label> Confirmar senha </label>
                            <input type="password" value={confSenha} onChange={e => setConfSenha(e.target.value)}/>
                        </div>

                    </div>
                </div>

                <button className='prossiga' onClick={cadastrarUsuario}> Prossiga </button>

                <Link className='voltar' to='/'> Voltar </Link>
             </div>
        </main>
    );
}