import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginAdmin from './pages/Administrador/LoginAdmin/index.js';
import PedidosRecentes from './pages/Administrador/PedidosRecentes/index.js';
import Produtos from './pages/Administrador/Produtos';
import AddProduto from './pages/Administrador/AddProduto';
import CadastroUsuario from './pages/Usuario/cadastroUsuario/index.js'
import LoginUsuario from './pages/Usuario/loginUsuario/index.js'
import DadosPessoais from './pages/Usuario/dadosPessoais/index.js'
import AlterarProduto from './pages/Administrador/AlterarProduto'
import Favoritos from './pages/Usuario/Favoritos/index.js'
import LadingPage from './pages/Usuario/LandingPage/index.js'
import ProdutoDetalhe from './pages/Usuario/produtoDetalhe/index.js'
import DetalhePedidos from './pages/Usuario/detalhePedidos/index.js'
import Pedido from './pages/Usuario/Pedido/index.js'
import NovoEndereco from './pages/Usuario/novoEndereco/index.js'
import Entrega from './pages/Usuario/Entrega/index.js'
import AdminTemas from './pages/Administrador/Temas/index.js'
import NovoTema from './pages/Administrador/novoTema/index.js'
import UsuarioTema from './pages/Usuario/TemaPesquisa/index.js'
import EditarDados from './pages/Usuario/editarDados/index.js'
import BannerAdmin from './pages/Administrador/Banner/index.js'
import Finalizacao from './pages/Usuario/Finalizacao/index.js'
import Avaliacao from './pages/Administrador/Avaliacaoes/index.js'

export default function Index(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LadingPage/>}/>
                <Route path='/login/usuario' element={<LoginUsuario/>} />
                <Route path='/login/admin' element={<LoginAdmin />} />

                <Route path='/admin/pedidos' element={<PedidosRecentes />} />
                <Route path='/produtos' element={<Produtos />} />
                <Route path='/admin/produto' element={<AddProduto />} />
                <Route path='/admin/produto/:id' element={<AlterarProduto/>}/>
                <Route path='/admin/temas' element={<AdminTemas/>} />
                <Route path='/admin/tema/:id' element={<NovoTema/>} />
                <Route path='/admin/tema' element={<NovoTema/>} />
                <Route path='/admin/banner' element={<BannerAdmin/>} />
                <Route path='/admin/avaliacoes' element={<Avaliacao/>} />



                <Route path='/usuario/dados' element={<DadosPessoais/>} />
                <Route path='/favoritos' element={<Favoritos/>} />
                <Route path='/produto/:id/detalhe' element={<ProdutoDetalhe/>} />
                <Route path='/pedido/detalhe/:id' element={<DetalhePedidos/>} />
                <Route path='/usuario/pedido' element={<Pedido/>} />
                <Route path='/novoEndereco' element={<NovoEndereco/>} />
                <Route path='/entrega' element={<Entrega/>} />
                <Route path='/usuario/tema/:id' element={<UsuarioTema/>} />
                <Route path='/usuario/pedido' element={<Pedido/>} />
                <Route path='/editar/dados' element={<EditarDados/>} />
                <Route path='/usuario/cadastro' element={<CadastroUsuario />} />
                <Route path='/usuario/finalizacao' element={<Finalizacao/>} />
            </Routes>
        </BrowserRouter>
    )
}