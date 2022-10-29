import { API_URL } from './config';

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})

export async function CadastrarPoduto(nome, tema, categoria, descricao, preco, disponivel) {
    const resposta= await api.post('/produto', {
        nome: nome,
        tema: tema, 
        categoria: categoria,
        descricao: descricao,
        preco: preco,
        disponivel: disponivel
    });
    
    return resposta.data;
}


export async function CadastrarImgDestaque(id, imagem){
    const formData = new FormData();
    formData.append('img', imagem);
    const resposta = await api.put(`/produto/destaque/` + id , formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    });
    return resposta.status;
}


export async function CadastrarCor(produto, nome) {
    const resposta= await api.post ('/produto/cor', {
        produto: produto,
        nome: nome
    })
    return resposta.data;
}


export async function CadastrarTamanho(produto, tamanho) {
    const resposta= await api.post('/produto/tamanho', {
        produto: produto,
        descricao: tamanho
    })
    return resposta.data;
}

export async function ProdutosListados() {
    const resp = await api.get('/produto')
    
    return resp.data;
}

export async function listarCategorias() {
        const resp = await api.get('/api/categoria')
        return resp.data;
}

export async function listarTemas() {
    const resp = await api.get('/api/tema')
    return resp.data;
}
export async function buscarProdutosPorNome(nome) {
    const resp = await api.get(`/produto?nome=${nome}`)
    return resp.data;
}

export async function buscarCategoria(nome) {
    const resposta = await api.get(`/filtro/categoria?nome=${nome}`)
    return resposta.data;
}
export async function buscarPorTema(nome) {
    const resposta = await api.get(`/filtro/tema?nome=${nome}`)
    return resposta.data;
}

export async function salvarImagens(id, imagem1, imagem2, imagem3, imagem4){
    let form = new FormData();
    form.append('imagens', imagem1);
    form.append('imagens', imagem2);
    form.append('imagens', imagem3);
    form.append('imagens', imagem4);

    const r= await api.put('/produto/imagem/' + id, form, {
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    })

}


export async function alterarImagens(id, imagem1, imagem2, imagem3, imagem4){
    let form = new FormData();
    form.append('imagens', imagem1);
    form.append('imagens', imagem2);
    form.append('imagens', imagem3);
    form.append('imagens', imagem4);

    const r= await api.put(`/produto/alterar/imagem/${id}`, form, {
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    })

}

export async function buscarDestaque(id){
    const resp = await api.get('/produto/destaque/' + id);
    return resp.data;
}


    export async function buscarTemaId(id){
        const resp = await api.get('/api' + id + '/tema');
        return resp.data;
    }
//deletar

export async function deletarProduto(id) {
    const resposta = await api.delete('/produto/' + id)
    return resposta.data;
}

// buscar (alterar)

export async function buscarProdutoPorId(id){
    const resp = await api.get(`/produto/${id}`);
    return resp.data;
}

export async function ListarProdutosInicio() {
    const r = await api.get('/usuario/produto');
    return r.data;
}

// alterar

export async function alterarProduto(id, nome, preco, tema, categoria,  descricao, disponivel, cores, tamanho){
    
    const r = await api.put(`/admin/produto/${id}`, {
            info : {
            nome: nome,
            preco: preco,
            categoria: categoria,
            tema: tema,
            descricao: descricao,
            disponivel: disponivel
            },
            
            cores: cores,
        
            tamanho: tamanho

          }
    )
   
    
    return r.data;
}
        