import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { deletarBanner, inserirBanner, inserirImagemBanner, listarBanner } from "../../../API/admin/banner/bannerApi.js";
import { API_URL } from "../../../API/config.js";
import MenuAdmin from "../../../components/pagAdm/pagAdm.js"
import './index.scss'

export default function Index() {

    //VARIÁVEIS

    const [exibir, setExibir] = useState(false);
    const [banner, setBanner] = useState();
    const [destaque, setDestaque] = useState(false);
    const [banners, setBanners] = useState([]);


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

    async function salvar(){
        try{
            const x = await inserirBanner(destaque);
            console.log(x.id);
            const y = await inserirImagemBanner(x.id, banner);
            setBanner();
            toast('Banner inserido com sucesso!')
            setExibir(false)
            carregarBanners();
        }
        catch(err){
            toast.error('Erro: ' + err.message)
        }
    }

    
    async function Deletar(id){
        try{
            const x = await deletarBanner(id);
            console.log('kkkk');
            carregarBanners();
            toast('Banner deletado com sucesso!')
        }
        catch(err){
            toast.error('Não foi possível deletar')
        }
    }
    

    async function carregarBanners(){
        const x = await listarBanner();
        console.log(x)
        setBanners(x);
    }

    // USEEFFECTS

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
                            <input type='checkbox' value={destaque} onChange={e => setDestaque(e.target.checked)}/>
                        </div>

                        <button className="button" onClick={salvar}> Salvar </button> 

                    </div>

                </div>
            }


            <section className="fundo">

                <h1> Banners </h1>

                <button className="edit" onClick={() => setExibir(true)}> Novo banner </button>

                <div className="espacamento-banners">

                    {banners.map( item => 
                        <div className="bannerzinho"> 
                            <img className="bannerzinho-img" src={exibirImagem(item.banner)} alt='' />
                            <div> 
                            <button onClick={() => Deletar(item.id)}> Deletar </button>
                            <button> Editar </button>
                            </div>
                        </div>)}

                </div>


            </section>

        </main>

    )
}