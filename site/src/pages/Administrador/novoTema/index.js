import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../../API/config.js";
import { alterarTema, buscarTemaId, CadastrarImgTema, CadastrarImgTemaFundo, inserirTema } from "../../../API/tema/temaAPI.js";
import MenuAdmin from "../../../components/pagAdm/pagAdm.js";
import Storage from 'local-storage'
import "./index.scss";

export default function Index() {

    const navigate = useNavigate();
    const [admin, setAdmin] = useState('');

    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState();
    const [imagemFundo, setImagemFundo] = useState();
    const [cor, setCor] = useState('');

    const { id } = useParams();


    function escolherImagem() {
        document.getElementById("imagem").click();
    }

    function escolherImagemFundo() {
        document.getElementById("imagemFundo").click();
    }

    function exibirImagem() {
        if (imagem == undefined) {
            return '/images/add.png'
        }
        else if (typeof (imagem) == 'string') {
            console.log(imagem)
            return `${API_URL}/${imagem}`
            
        }
        else {
            return URL.createObjectURL(imagem)
        }
    }

    function exibirImagemFundo() {
        if (imagemFundo == undefined) {
            return '/images/add.png'
        }
        else if (typeof (imagemFundo) == 'string') {
            console.log(imagemFundo)
            return `${API_URL}/${imagemFundo}`
            
        }
        else {
            return URL.createObjectURL(imagemFundo)
        }
    }

    async function inserir() {
        try {
            if (id) {
                const x = await alterarTema(id, nome, cor)
                if ( typeof (imagem) !== 'string'){
                    const y = await CadastrarImgTema(id, imagem)
                }
                if ( typeof (imagemFundo) !== 'string'){
                    console.log(imagemFundo)
                    const z = await CadastrarImgTemaFundo(id, imagemFundo)
                }
                toast('Tema Alterado')
                setTimeout(() => {
                    navigate('/admin/temas');
                }, 1500);
            }
            else {
                console.log(nome)
                console.log(cor)
                const x = await inserirTema(nome, cor);
                const y = await CadastrarImgTema(x.id, imagem)
                const z = await CadastrarImgTemaFundo(x.id, imagemFundo)
                console.log(y);
                console.log(x)
                console.log(z)
                toast('Tema inserido')
                setTimeout(() => {
                  navigate('/admin/temas');
                }, 1500);
            }
        }
        catch (err) {
            toast.error('erro: ' + err.message)
        }
    }

    async function carregarTema() {
        try {
            const x = await buscarTemaId(id);
            console.log(x)
            setImagem(x.imagem)
            setNome(x.nome)
            setCor(x.cor)
            setImagemFundo(x.fundo)
        }
        catch (err) {
            toast.error('erro' + err.message)
        }
    }


    useEffect(() => {
        if (!Storage('admin-logado')) {
            navigate('/login/admin')
        } else {
            if (id){
                carregarTema();
            }
            const AdmLogado = Storage('admin-logado');
            setAdmin(AdmLogado.nome)
        }

    }, [])

    return (
        <main className="novoTema">
            <MenuAdmin logo='../../../images/logoAdmin.png'> </MenuAdmin>
            <div className="reg-temas">
                <div>
                    <h1> Adicionar Temas </h1>
                </div>
                <div className="div1">
                    <p>Nome do tema</p>
                    <input type="text" value={nome} className="nome" placeholder='Exemplo: Harry Potter' onChange={e => setNome(e.target.value)} />
                </div>
                <div className="imgss">
                    <div>
                    <p>Imagem do tema</p>
                    <img className="imagemtema" src={exibirImagem()} onClick={escolherImagem} />
                    <input type="file" id="imagem" onChange={e => setImagem(e.target.files[0])} />
                    </div>
                    <div>
                    <p>Imagem de Fundo</p>
                    <img className="imagemfundo" src={exibirImagemFundo()} onClick={escolherImagemFundo} />
                    <input type="file" id="imagemFundo" onChange={e => setImagemFundo(e.target.files[0])} />
                    </div>
                </div>
                <div>
                    <p for="favcolor">Cor</p>
                    <input type="color" name="favcolor" value={cor} onChange={e => setCor(e.target.value)} />
                </div>

                <div className="botao">
                    <button onClick={inserir}> Salvar</button>
                </div>
            </div>

        </main>
    )
}
