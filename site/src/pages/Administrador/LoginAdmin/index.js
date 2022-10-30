import {LoginAdm} from '../../../API/logAdm.js'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import "../../../common/common.scss"
import "./index.scss"
import Inputs from "../../../components/inputs/Inputs.js"
import { useState, useRef, useEffect } from "react"
import LoadingBar from 'react-top-loading-bar'
import { toast } from 'react-toastify'
import Storage from 'local-storage'

export default function Index(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();
    const ref= useRef();



        async function Acessar(){
            ref.current.continuousStart();
            setCarregando(true);

           try{
            const r= await LoginAdm(email, senha);
            Storage('usuario-logado', r)
            

           setTimeout(() => {
            navigate('/PedidosRecentes');

        }, 3000);
            
        } catch (err) {
            ref.current.complete();
            setCarregando(false);
            if(err.response.status === 401){
                setErro(err.response.data.erro);
            toast('erro: ' + err.message)
        }
    }

}

useEffect(() => {
    if(Storage('usuario-logado')){
        navigate('/PedidosRecentes')
    }
    
}, [])

    return(
        <main className="loginadmin">
            <LoadingBar color='linear-gradient(270deg, #FF2B5E 35.42%, #521FAF 50.83%, #2BFFBF 64.58%)' ref={ref}/>

            <div className="administracao">
                 <h1>ADMINISTRAÇÃO</h1>

            <div className="log">
                <Inputs type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder="email" classe="componente-input" img="img" icon="../images/usuario1.png"/>
                <Inputs type='password' value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" classe="componente-input" img="img" icon="../images/senha1.png"/>
            </div>

            <div className="flex-column">
                <button onClick={Acessar}  className="acessar" disabled={carregando}>ACESSAR</button>
                <Link to='/' className="voltar" >Voltar</Link>
            </div>

            </div>

        </main>
    )

}