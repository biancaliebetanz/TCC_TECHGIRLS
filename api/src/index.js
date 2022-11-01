import 'dotenv/config'

import loginController from './controller/loginController.js';
import produtoAdminController from './controller/admin/produtoController.js';
import categoria from './controller/admin/categoriasController.js';
import tema from './controller/admin/temaController.js'
import usuarioController from './controller/usuario/usuarioController.js'
import bannerController from './controller/admin/bannerController.js'
import produtoUsuarioController from './controller/usuario/produtoController.js'
import enderecoController from './controller/usuario/enderecoController.js'
import temaUsuario from './controller/usuario/temaController.js'
import pedidoController from './controller/usuario/pedidoController.js'
import cartaoController from './controller/usuario/cartaoController.js'

import multer from "multer";
import cors from "cors"
import express from "express"

const server = express();
server.use(cors());
server.use(express.json());

server.use(loginController);
server.use(produtoAdminController);
server.use(categoria);
server.use(tema);
server.use(bannerController);
server.use(usuarioController);
server.use(produtoUsuarioController);
server.use(enderecoController);
server.use(temaUsuario);
server.use(pedidoController);
server.use(cartaoController);

server.use('/storage/produto', express.static('storage/produto'));
server.use('/storage/tema', express.static('storage/tema'));
server.use('/storage/banner', express.static('storage/banner'));



server.use(multer);


const PORT= process.env.PORT;
server.listen(PORT, () => console.log('API Subiu!!!' + PORT));