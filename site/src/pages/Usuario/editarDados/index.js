import { useState } from "react";
import { EditarUsuario } from "../../../API/Usuario";
import CabecalhoPrincipal from "../../../components/cabecalhoPrincipal/cabecalhoPrinc";
import Legendas from "../../../components/cabLegenda";
import Rodape from "../../../components/usuario/rodape";
import Storage from 'local-storage'

import './index.scss'
import { toast } from "react-toastify";

export default function Index(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [telefone, setTelefone] = useState('');

    function editar(){
        try{
        const id = Storage('cliente-logado').data.id;
        console.log(id)
        const alterar = EditarUsuario(nome, telefone, cpf, rg, nascimento, id);
        console.log(alterar)
        toast('Informações alteradas com sucesso!')
        }
        catch (err){
            toast.error('Erro: ' + err.message)
        }
    }


    return(
        <main className="editando">
            <div>
                <CabecalhoPrincipal logo='../../../images/logoAdmin.png' menu='../../../images/menu.png'  fav='../../../images/favoritos.png' 
                user='../../../images/user.png' sacola='../../../images/sacola.png'/>
            </div>
            <div>
                <Legendas nome='Dados Pessoais'  cor={'#6235b4'}/>
            </div>
            <div className='dados' >
            <div className="user">
          <div className="info1">
            <h1>Edite Seus Dados</h1>
          <div>
                <p>Nome</p>
                <input type='text' value={nome} onChange={e => setNome(e.target.value)} ></input>
            </div>
            <div>
                <p>E-mail</p>
                <input type='text' value={email} onChange={ e => setEmail(e.target.value)}></input>
            </div>
            <div>
                <p>Telefone</p>
                <input type='text' value={telefone} onChange={e => setTelefone(e.target.value)} ></input>
            </div>
          </div>
           <div className="info2">
           <div>
                <p>CPF</p>
                <input type='text' value={cpf} onChange={e => setCpf(e.target.value)}></input>
            </div>
            <div>
                <p>RG</p>
                <input type='text' value={rg} onChange={e => setRg(e.target.value)}></input>
            </div>
            <div>
                <p>Data de Nascimento</p>
                <input type='date' value={nascimento} onChange={e => setNascimento(e.target.value)}></input>
            </div>
            
           </div>
           <button onClick={editar}>Salvar</button>
        </div>
            </div>
            <div>
            <Rodape insta='./../../../images/insta.png' face='./../../../images/face.png' whats='./../../../images/whats.png' logo='./../../../images/logo.png'></Rodape>

            </div>
        </main>
    )
}