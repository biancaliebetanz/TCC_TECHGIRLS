import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginAdmin from './pages/Administrador/LoginAdmin/index.js';
import PedidosRecentes from './pages/Administrador/PedidosRecentes/index.js';
import Produtos from './pages/Administrador/Produtos';
import AddProduto from './pages/Administrador/AddProduto';
import CadastroUsuario from './pages/Usuario/cadastroUsuario/index.js'
import LoginUsuario from './pages/Usuario/loginUsuario/index.js'
import DadosPessoais from './pages/Usuario/dadosPessoais/index.js'
import AlterarProduto from './pages/Administrador/AlterarProduto'
import Naruto from './pages/Usuario/nossosProdutos/Naruto/index.js'
import StrangerThings from './pages/Usuario/nossosProdutos/StrangerThings/index.js'
import Marvel from './pages/Usuario/nossosProdutos/Marvel/index.js'
import HarryPotter from './pages/Usuario/nossosProdutos/HarryPotter/index.js'
import Queen from './pages/Usuario/nossosProdutos/Queen/index.js'
import BTS from './pages/Usuario/nossosProdutos/BTS/index.js'
import RickMorty from './pages/Usuario/nossosProdutos/RickMorty/index.js'
import DragonBall from './pages/Usuario/nossosProdutos/DragonBall/index.js'
import DC from './pages/Usuario/nossosProdutos/DC/index.js'
import Favoritos from './pages/Usuario/Favoritos/index.js'
import LadingPage from './pages/Usuario/LandingPage/index.js'
import ProdutoDetalhe from './pages/Usuario/produtoDetalhe/index.js'
import Endereco from './pages/Usuario/endereco/index.js'
import SeusPedidos from './pages/Usuario/SeusPedidos/index.js'
import DetalhePedidos from './pages/Usuario/detalhePedidos/index.js'
import Pedido from './pages/Usuario/Pedido/index.js'
import Catalogo from './pages/Administrador/Catalogo/index.js'
import NovoEndereco from './pages/Usuario/novoEndereco/index.js'
import Entrega from './pages/Usuario/Entrega/index.js'
import AdminTemas from './pages/Administrador/Temas/index.js'
import NovoTema from './pages/Administrador/novoTema/index.js'
import UsuarioTemas from './pages/Usuario/TemaPesquisa/index.js'



export default function Index(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LadingPage/>}/>
                <Route path='/login/admin' element={<LoginAdmin />} />
                <Route path='/pedidosRecentes' element={<PedidosRecentes />} />
                <Route path='/produtos' element={<Produtos />} />
                <Route path='/admin/produto' element={<AddProduto />} />
                <Route path='/login/usuario' element={<LoginUsuario/>} />
                <Route path='/usuario/cadastro' element={<CadastroUsuario />} />
                <Route path='/dadosPessoais' element={<DadosPessoais/>} />
                <Route path='/admin/produto/:id' element={<AlterarProduto/>}/>
                <Route path='/naruto' element={<Naruto/>} />
                <Route path='/marvel' element={<Marvel/>} />
                <Route path='/harryPotter' element={<HarryPotter/>} />
                <Route path='/queen' element={<Queen/>} />
                <Route path='/bts' element={<BTS/>} />
                <Route path='/rickMorty' element={<RickMorty/>} />
                <Route path='/dragonBall' element={<DragonBall/>} />
                <Route path='/dc' element={<DC/>} />
                <Route path='/StrangerThings' element={<StrangerThings/>} />
                <Route path='/favoritos' element={<Favoritos/>} />
                <Route path='/produto/:id/detalhe' element={<ProdutoDetalhe/>} />
                <Route path='/endereco' element={<Endereco/>} />
                <Route path='/seusPedidos' element={<SeusPedidos/>} />
                <Route path='/detalhePedidos' element={<DetalhePedidos/>} />
                <Route path='/usuario/pedido' element={<Pedido/>} />
                <Route path='/catalogo' element={<Catalogo/>} />
                <Route path='/novoEndereco' element={<NovoEndereco/>} />
                <Route path='/entrega' element={<Entrega/>} />
                <Route path='/admin/temas' element={<AdminTemas/>} />
                <Route path='/admin/tema' element={<NovoTema/>} />
                <Route path='/admin/tema/:id' element={<NovoTema/>} />
                <Route path='/usuario/tema/:id' element={<UsuarioTemas/>} />
                <Route path='/pedido' element={<Pedido/>} />

                
                
            </Routes>
        </BrowserRouter>
    )
}