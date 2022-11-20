import { Link, useNavigate } from "react-router-dom";
import MenuAdmin from "../../../components/pagAdm/pagAdm.js";
import BoxProduto from "../../../components/boxProdutos/boxProduto.js";
import "./index.scss"
import "../../../common/common.scss"
import { useEffect, useState } from "react";
import { buscarCategoria, buscarPorTema, deletarProduto, listarCategorias, listarTemas, ProdutosListados } from "../../../API/CadProduto";
import { toast } from "react-toastify";
import { API_URL } from "../../../API/config";
import Storage from 'local-storage';


export default function Index() {

    const navigate = useNavigate();
    const [admin, setAdmin] = useState('');
    
    const [idCategoria, setIdCategoria] = useState(0);
    const [categorias, setCategorias] = useState([]);

    const [idTemas, setIdTemas] = useState(0);
    const [Temas, setTemas] = useState([]);

    const [produto, setProduto] = useState([]);

    const [filtroTema, setFiltroTema] = useState();
    const [filtroCategoria, setFiltroCategoria] = useState('');

    // funções

    async function carregarTemas() {
        const r = await listarTemas();
        setTemas(r);
    }


    async function carregarCategorias() {

        const r = await listarCategorias();
        setCategorias(r);
    }

    async function buscarTemaClick() {
        const resp = await buscarPorTema(idTemas);
        console.log(resp)
        setProduto(resp);
    }
    async function buscarCategoriaClick() {
        const resp = await buscarCategoria(filtroCategoria);
        console.log(resp)
        setProduto(resp);
    }

    async function ListarProdutos() {
        const resposta = await ProdutosListados();
        console.log(resposta)
        setProduto(resposta)
    }

    async function editar(id) {
        navigate(`/admin/produto/${id}`);
    }

    async function DeletarProdutos(id) {
        try {
            await deletarProduto(id);
            toast('Deletado com sucesso');
            await ListarProdutos();
        }
        catch (err) {
            toast.error(err.message)
        }
    }


    function exibir(imagem) {
        return `${API_URL}/${imagem}`;
    }


    useEffect(() => {
        ListarProdutos();
        carregarTemas();
        carregarCategorias();
    }, [])

    useEffect(() => {
        if (!Storage('admin-logado')) {
            navigate('/login/admin')
        } else {
            const AdmLogado = Storage('admin-logado');
            setAdmin(AdmLogado.nome)
        }

    }, [])

    return (
        <main className="Novo-Produto">

            <MenuAdmin logo='../../../images/logoAdmin.png' />

            <div className="fundo">

                <h2> Produtos</h2>
                <div className="espacamento">
                    <Link className="edit" to='/admin/produto'>Novo Produto</Link>
                </div>
                <div>
                    <div>
                        <select className="select" value={idTemas} onChange={e => setIdTemas(Number(e.target.value))}>
                            <option selected='selected'> Selecione </option>
                            {Temas.map(item =>
                                <option value={item.id}> {item.nome} </option>
                            )}
                        </select>
                        <button className="bt-select" onClick={() => buscarTemaClick()}> Buscar </button>
                    </div>
                    <input className="select" type='text' placeholder="Digite a categoria..." value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)}></input>
                    <button className="bt-select" onClick={buscarCategoriaClick}>Buscar</button>
                </div>
                <div>



                </div>



                <div className="produtosmapeamento">
                    {produto.map(item =>

                        <BoxProduto
                            img={exibir(item.imagem)}
                            preco={item.preco}
                            nome={item.nome}
                            clickdelete={() => DeletarProdutos(item.id)}
                            clickedit={() => editar(item.id)}
                        />

                    )}
                </div>


            </div>

        </main>
    )
}