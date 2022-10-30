import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUsuario } from "../../../API/logAdm";
import './index.scss';

import Storage from 'local-storage'

export default function Index() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function login(){
        try{
        console.log(email)
        console.log(senha)
        const a = await loginUsuario(email, senha);
        Storage('cliente-logado', a)
        toast('Usuário logado!', { autoClose: 1200 /* , hideProgressBar: true */ })

        setTimeout(() => {
            navigate('/');
        }, 1000);

        }
        catch(err){
            toast.error(err.response.data.erro)
        }
    }

    

    return(
        <main className="login">

            <div className="fundo">
                <h1 className="titulo"> Entre Agora! </h1>

                <div className="margem">
                    <div className="espaçamento">
                        <img className="imgs" src='../images/user (1).png' alt=""/>
                        <input className="input" placeholder="E-Mail" type='text' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="espaçamento">
                        <img src='../images/padlock.png' alt=''/>
                        <input className="input" placeholder="Senha" type='password' value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>
                </div>

                
                <div className="under">
                    <button className="botao" onClick={login}> Acessar </button>

                    <p> Ainda não possui cadastro? </p>
                    <Link className="span" to='/usuario/cadastro'> Cadastre-se agora! </Link>

                    <Link className="voltar" to='/'> Voltar</Link>
                </div>

                    <Link to='/loginAdmin'> <img src='' alt='' /> </Link>
                      
                
            </div>

        </main>
    )
}