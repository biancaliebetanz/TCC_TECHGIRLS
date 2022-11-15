import { useState } from "react"
import { toast } from "react-toastify";
import { inserirBanner, inserirImagemBanner } from "../../../API/admin/banner/bannerApi.js";
import { API_URL } from "../../../API/config.js";
import MenuAdmin from "../../../components/pagAdm/pagAdm.js"
import './index.scss'

export default function Index() {

    //VARIÁVEIS

    const [exibir, setExibir] = useState(false);
    const [banner, setBanner] = useState();
    const [destaque, setDestaque] = useState(false);


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
        }
        catch(err){
            toast.error('Erro: ' + err.message)
        }
    }

    // USEEFFECTS

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

                <div>

                </div>


            </section>

        </main>

    )
}