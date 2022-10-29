import { listarCategorias, listarTemas, buscarProdutoPorId, alterarProduto, salvarImagens, alterarImagens } from "../../../API/CadProduto";
import MenuAdmin from "../../../components/pagAdm/pagAdm";
import DeletarItem from "../../../components/delete/delete.js";
import { API_URL } from "../../../API/config.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function Index() {

    // VARIÁVEIS DE ESTADO

    const { id } = useParams();
 
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0.0);
    const [disponivel, setDisponivel] = useState(true);

    const [idCategoria, setIdCategoria] = useState(0);
    const [categorias, setCategorias] = useState([]);

    const [idTemas, setIdTemas] = useState(0);
    const [Temas, setTemas] = useState([]);

    const [catSelecionadas, setCatSelecionadas] = useState([]);

    
    //cor
    const [cor, setCor] = useState([]);
    const [novaCor, setNovaCor] = useState('');

    //tamanho
    const [tamanho, setTamanho] = useState([]);
    const [novoTamanho, setNovoTamanho] = useState('');
    

    //imagens

    const [imagem1, setImagem1] = useState();
    const [imagem2, setImagem2] = useState();
    const [imagem3, setImagem3] = useState();
    const [imagem4, setImagem4] = useState();

    // imagem destaque

    const [destaque, setDestaque] = useState();

// FUNÇÕES

    //funções cor e tamanho (renderização)


    function delay(milliseconds) {
        return new Promise (resolve => setTimeout(resolve, milliseconds)) // acabar com o delay
    }

    function arrayCor(){
            let c= [... cor, novaCor];
            setCor(c);
    }

    async function arrayTamanho(){
        let T= [...tamanho, novoTamanho];
        setTamanho(T);
    }


    function Remover(t){
        let c = cor.filter(item => item !== t);
        let T = tamanho.filter(item => item !== t);
        setCor(c)
        setTamanho(T)
    }

    function Limpar(){
        setCor([]);
        setTamanho([]);
    }

    //função imagem
    function escolherImagem(inputId) {
       document.getElementById(inputId).click();
    }

    
    function exibirImagem(imagem) {
        if (imagem == undefined){
            return '../images/add.png'
        }
        else if(typeof (imagem) == 'string'){
            return `${API_URL}/${imagem}`
        }
        else {
            return URL.createObjectURL(imagem)
        }
    }
 
    function buscarNomeCategoria(id) {
        const cat = categorias.find(item => item.id == id);
        return cat.categoria;
    }
    
    function adicionarCategoria() {
        if (!catSelecionadas.find(item => item == idCategoria)) {
            const categorias = [...catSelecionadas, idCategoria];
            setCatSelecionadas(categorias);
        }
    }


    async function carregarTemas() {
        const r = await listarTemas();
        setTemas(r);
    }


    async function carregarCategorias() {
        const r = await listarCategorias();
        setCategorias(r);
    }

    async function carregarProduto(){
        if (!id) {
            throw new Error('Produto não encontrado')
        }
        const r= await buscarProdutoPorId(id);
        setIdCategoria(r.info.categoria);
        setIdTemas(r.info.tema);
        setNome(r.info.nome);
        setDescricao(r.info.descricao);
        setPreco(r.info.preco);
        setDisponivel(r.info.disponivel);
        const a = r.cores;
        const b = r.tamanho;
        console.log(a)
        console.log(b)

        setCor(a);
        setTamanho(b);

        if(r.imagens.length > 0){
            setImagem1(r.imagens[0]);
        }
        if(r.imagens.length > 1){
            setImagem2(r.imagens[1]);
        }
        if(r.imagens.length > 2){
            setImagem3(r.imagens[2]);
        }
        if(r.imagens.length > 3){
            setImagem4(r.imagens[3]);
        }
        setDestaque(r.destaque.url);
        
    } 

    async function Alterar(){
        try{
            console.log(idTemas)
            const r = await alterarProduto(id, nome, preco, idTemas, idCategoria, descricao, disponivel, cor, tamanho);
            console.log(r);
            
            const b = await alterarImagens(id, imagem1, imagem2, imagem3, imagem4);
            console.log(b)
            toast('Produto alterado com sucesso')
        }
        catch(err) {
            toast.error(err.message)
        }
    }


// USEEFFECTS
    

    useEffect(() => {
        Limpar();
    }, [])


    useEffect(() => {
        carregarCategorias();
        carregarTemas();
        carregarProduto();
    }, [])


    return(
        <main className="inserirProduto">

        <MenuAdmin logo='../../../images/logoAdmin.png'/>

        <div className="informacoes-produto">

            <h1> Alterar Produto </h1>

            <div className="inserir">

                <div className="div1">
                    

                    <div className="flex-column">
                        <label> Nome do Produto </label>
                        <input type="text" value={nome} onChange={e=> setNome(e.target.value)} className="input"/>
                    </div>

                    <div className="flex-column">
                        <label> Descrição do Produto </label>
                        <textarea type="text" value={descricao} onChange={e=> setDescricao(e.target.value)} maxLength={100} className="textarea"/>
                    </div>

                    

                    <div className="flex-row space-between">

                        <div className="select-tamanho">
                            <label> Categoria:</label>
                            <select className="select" value={idCategoria} onChange={e => setIdCategoria(Number(e.target.value))}>
                                <option> Vestimenta </option>

                                {categorias.map(item =>
                                    <option value={item.id}> {item.nome} </option>
                                )}

                            </select>
                        </div>

                        

                        <div className="select-tamanho">

                            <label> Tema: </label>
                            <select className="select" value={idTemas} onChange={e => setIdTemas(e.target.value)}>
                                <option> Harry Potter </option>

                                {Temas.map(item =>
                                    <option value={item.id}> {item.nome} </option>
                                )}
                            </select>
                        </div>

                    </div>

                    
                    <div className="div-array">
                        <label> Cor </label>

                        <div className="flex-row wrapwrap">

                            <input type="text" value={novaCor} onChange={e => setNovaCor(e.target.value)} className="input input-item"/> 
                            <button onClick={arrayCor} className="button-ok"> OK </button>
                            
                           {cor.map( item => 
                                    <DeletarItem  
                                    key={item}
                                    it={item}
                                    deletarit={Remover}  />
                            )}
                          
                        </div>
                    </div>

                    <div className="div-array">

                        <label> Tamanhos </label>

                        <div className="flex-row wrapwrap">
                            <input value={novoTamanho}  className="input input-item" onChange={e => setNovoTamanho(e.target.value)}/> 

                            <button onClick={arrayTamanho} className="button-ok"> OK </button>

                            {tamanho.map( item => 
                                    <DeletarItem  
                                    key={item}
                                    it={item}
                                    deletarit={Remover}  />
                            )}

                        </div>

                    </div>

                    <div className="flex-column"> 

                        <label > Valor </label>
                        <input type="text" value={preco} onChange={e=> setPreco(e.target.value)} className="imagem-input"/>
                   
                    </div>
        

                    <div>
                        <div> 
                             <label > Disponível ?</label> 
                             <input type="checkbox" checked={disponivel} onChange={e=> setDisponivel(e.target.checked)}/>
                        </div>
                    </div> 

                </div>

                <div className="div2">
                    <div>

                        <h1> Foto Destaque </h1>

                        <img 
                            className="img" 
                            src={exibirImagem(destaque)}
                            alt='' 
                            // onClick={escolherDestaque}  
                        />


                        <input 
                        type="file" 
                        id="imagemDestaque"
                        onChange={e => setDestaque(e.target.files[0])} 
                        />
                        
                    </div>

                    <div className="flex-column"> 

                        <h1> Fotos Extras</h1>

                        <div>
                            <img className="img" src={exibirImagem(imagem1)} alt='' onClick={() => escolherImagem('imagem1')}/>
                            <img className="img" src={exibirImagem(imagem2)}  alt='' onClick={() => escolherImagem('imagem2')}/>
                            <img className="img" src={exibirImagem(imagem3)}  alt='' onClick={() => escolherImagem('imagem3')}/>
                            <img className="img" src={exibirImagem(imagem4)}  alt='' onClick={() => escolherImagem('imagem4')}/>

                            <input type='file' id='imagem1' onChange={e => setImagem1(e.target.files[0])} />
                            <input type='file' id='imagem2' onChange={e => setImagem2(e.target.files[0])} />
                            <input type='file' id='imagem3' onChange={e => setImagem3(e.target.files[0])} />
                            <input type='file' id='imagem4' onChange={e => setImagem4(e.target.files[0])} />
                        </div>
                        
                    </div>

                </div>


            </div>

            <button onClick={Alterar} className="button centralizar"> Salvar </button>

        </div>
        
</main>

    )
}