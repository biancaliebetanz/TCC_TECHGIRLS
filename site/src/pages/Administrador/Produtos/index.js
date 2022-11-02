import { Link, useNavigate } from "react-router-dom";
import  MenuAdmin from "../../../components/pagAdm/pagAdm.js";
import BoxProduto from "../../../components/boxProdutos/boxProduto.js";
import "./index.scss"
import "../../../common/common.scss"
import { useEffect, useState } from "react";
import { buscarCategoria, buscarPorTema, deletarProduto, ProdutosListados } from "../../../API/CadProduto";
import { toast } from "react-toastify";
import { API_URL } from "../../../API/config";
import Storage from 'local-storage';


export default function Index(){

    const navigate = useNavigate();
    const [admin, setAdmin] = useState('');

    const[produto, setProduto] = useState([]);

    const[filtroTema, setFiltroTema]= useState('');
    const[filtroCategoria, setFiltroCategoria] = useState('');

    async function buscarTemaClick() {
        const resp = await buscarPorTema(filtroTema);
        console.log(resp)
        setProduto(resp);
    }
    async function buscarCategoriaClick() {
        const resp = await buscarCategoria(filtroCategoria);
        console.log(resp)
        setProduto(resp);
    }

    async function ListarProdutos(){
        const resposta= await ProdutosListados();
        console.log(resposta)
        setProduto(resposta)
    }

    async function editar(id){
        navigate(`/admin/produto/${id}`);
    }

    async function DeletarProdutos(id) {
        try { 
            await deletarProduto(id);
            toast('Deletado com sucesso');
            await ListarProdutos();
        }
        catch(err) {
            toast.error(err.message)
        }
    }

      
    function exibir(imagem){
        return `${API_URL}/${imagem}`;
    }


    useEffect(() => {
        ListarProdutos();
    }, [])

    useEffect(() => {
        if (!Storage('admin-logado')) {
            navigate('/login/admin')
        } else {
            const AdmLogado = Storage('admin-logado');
            setAdmin(AdmLogado.nome)
        }

    }, [])

    return(
        <main className="Novo-Produto">

            <MenuAdmin logo='../../../images/logoAdmin.png'/>

            <div className="fundo">

                <div className="espacamento">
                    <Link className="edit" to='/admin/produto'>Novo Produto</Link>
                </div>
                <div>
                    <input type='text' placeholder="digite o tema" value={filtroTema} onChange={e=> setFiltroTema(e.target.value)}></input>
                    <button onClick={buscarTemaClick}>Buscar</button>
                    <input type='text'placeholder="digite a" value={filtroCategoria} onChange={e=> setFiltroCategoria(e.target.value)}></input>
                    <button onClick={buscarCategoriaClick}>Buscar</button>
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