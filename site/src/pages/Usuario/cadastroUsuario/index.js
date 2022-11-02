import './index.scss';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UsuarioCadastro } from '../../../API/Usuario.js';
import { toast } from 'react-toastify';
import { InserirUsuarioLogin } from '../../../API/logAdm.js';

export default function Index() {

    const navigate = useNavigate();

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
            if(!nome){
                throw new Error('Nome não inserido!')
            }
            if(!telefone){
                throw new Error('Telefone não inserido!')
            }
            if(!datadenasc){
                throw new Error('Nascimento não inserido!')
            }
            if(!rg){
                throw new Error('RG não inserido!')
            }
            if(!cpf){
                throw new Error('CPF não inserido!')
            }
            if(!email){
                throw new Error('Email não inserido!')
            }
            if(!senha){
                throw new Error('Senha não inserida!')
            }
            if(!confSenha){
                throw new Error('Confirme sua senha')
            }
            const a = await UsuarioCadastro(nome, telefone, cpf, rg, datadenasc);
            console.log(a);
            if (senha == confSenha) {
            const b = await InserirUsuarioLogin(a.id, email, senha);
            toast('Usuário cadastrado! Bem vindo, ' + nome)
            }
            setTimeout(() => {
                navigate('/login/usuario');
            }, 1500);
        }
        catch(err){
            toast.error('ERRO: ' + err.message);
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