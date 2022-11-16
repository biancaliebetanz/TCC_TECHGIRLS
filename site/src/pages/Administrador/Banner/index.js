import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { buscarBanner, deletarBanner, editarBanner, inserirBanner, inserirImagemBanner, listarBanner } from "../../../API/admin/banner/bannerApi.js";
import { API_URL } from "../../../API/config.js";
import MenuAdmin from "../../../components/pagAdm/pagAdm.js"
import './index.scss'

export default function Index() {

    //VARIÁVEIS

    const [exibir, setExibir] = useState(false);
    const [banner, setBanner] = useState();
    const [destaque, setDestaque] = useState(false);
    const [editar, setEditar] = useState(false);
    const [bannerEdit, setBannerEdit] = useState({});
    const [banners, setBanners] = useState([]);
    const [id, setId] = useState();

    //editar


    // FUNÇÕES

    function exibirImagem(imagem) {
        if (imagem == undefined) {
            return '../images/add.png'
        }
        else if (typeof (imagem) == 'string') {
            return `${API_URL}/${imagem}`
        }
        else {
            return URL.createObjectURL(imagem)
        }
    }

    async function escolherBanner() {
        document.getElementById('banner').click();
    }

    async function salvar() {
        try {
            const x = await inserirBanner(destaque);
            console.log(x.id);
            const y = await inserirImagemBanner(x.id, banner);
            setBanner();
            toast('Banner inserido com sucesso!')
            setExibir(false)
            carregarBanners();
        }
        catch (err) {
            toast.error('Erro: ' + err.message)
        }
    }

    async function editarTela(id) {
        try {
            const x = await buscarBanner(id);
            console.log(x);
            setBanner(x.banner);
            console.log(x.destaque);
            setId(x.id);
            setDestaque(x.destaque);
            setEditar(true);
        }
        catch (err) {
            toast.error('Erro: ' + err.message)
        }
    }

    async function Editar() {
        try {
            console.log(destaque)
            const x = await editarBanner(id, destaque);
            console.log(x);
            if (typeof (banner) != 'string') {
                const y = await inserirImagemBanner(id, banner);
            }
            toast('Banner alterado com sucesso!');
            carregarBanners();
            setEditar(false);
        }
        catch (err) {
            toast.error('Erro: ' + err.message)
        }
    }

    async function Deletar(id) {
        try {
            const x = await deletarBanner(id);
            console.log('kkkk');
            carregarBanners();
            toast('Banner deletado com sucesso!')
        }
        catch (err) {
            toast.error('Não foi possível deletar')
        }
    }


    async function carregarBanners() {
        const x = await listarBanner();
        console.log(x)
        setBanners(x);
    }

    // USEEFFECTS


    useEffect(() => {
        setBanner();
    }, [exibir])

    useEffect(() => {
        carregarBanners();
    }, [])

    return (
        <main className="fundo-banner">

            <MenuAdmin logo='../../../images/logoAdmin.png' />

            {exibir == true &&
                <div className="fundobanner">
                    <div className="bannerinserir">
                        <h2> Novo banner</h2>

                        <img
                            className="banner-img"
                            src={exibirImagem(banner)} alt=''
                            onClick={escolherBanner}
                        />

                        <input
                            type='file'
                            id='banner'
                            onChange={e => setBanner(e.target.files[0])}
                        />

                        <div className="esp">
                            <label> Destaque </label>
                            <input type='checkbox' value={destaque} onChange={e => setDestaque(e.target.checked)} />
                        </div>
                        <div>
                            <button className="button" onClick={() => setExibir(false)}> Voltar </button>
                            <button className="button" onClick={salvar}> Salvar </button>
                        </div>

                    </div>

                </div>
            }

            {editar == true &&
                <div className="fundobanner">
                    <div className="bannerinserir">
                        <h2> Editar banner</h2>

                        <img
                            className="banner-img"
                            src={exibirImagem(banner)} alt=''
                            onClick={escolherBanner}
                        />

                        <input
                            type='file'
                            id='banner'
                            onChange={e => setBanner(e.target.files[0])}
                        />

                        <div className="esp">
                            <label> Destaque </label>
                            <input type='checkbox' value={destaque} onChange={e => setDestaque(e.target.checked)} />
                        </div>
                        <div>
                            <button className="button" onClick={() => setEditar(false)}> Voltar </button>
                            <button className="button" onClick={Editar}> Editar </button>
                        </div>
                    </div>
                </div>
            }


            <section className="fundo">

                <h1> Banners </h1>

                <button className="edit" onClick={() => setExibir(true)}> Novo banner </button>

                <div className="espacamento-banners">

                    {banners.map(item =>
                        <div className="bannerzinho">
                            <div className="imggg"> 
                                <img className="bannerzinho-img" src={exibirImagem(item.banner)} alt='' />
                                <h3> Destaque: {item.destaque ? 'Sim' : 'Não'}</h3>
                            </div>
                            <div className="botoes">
                                <button onClick={() => Deletar(item.id)}>
                                    <img className="img" src="../images/lixeira.png" alt="" />
                                </button>
                                <button onClick={() => editarTela(item.id)}>
                                    <img className="img" src="../images/editar.png" alt="" />
                                </button>
                            </div>
                        </div>)}

                </div>


            </section>

        </main>

    )
}