import { deletarEnderecos } from '../../API/usuario/enderecoApi'
import Storage from 'local-storage'
import './index.scss'
import { toast } from 'react-toastify';

export default function CardEndereco({item: { id,referencia, bairro, cidade, estado, uf ,  numero, endereco}, selecionar, selecionado}) {

    async function deletar(){
        const r = await deletarEnderecos(Storage('cliente-logado').data.id);
        toast('Endereço deletado')
    }

    return (
        <div className='Endereço' 
        onClick={() => selecionar(id) } 
        style={{borderColor: selecionado ? '#ffff' : '#0000'}}>
            <img src='' alt='' />
                <p className='tipo'> referencia: {referencia} </p>
            <div>
                <p> {endereco}, {numero} </p>
                <p> {bairro}, {cidade}   </p>
                <p> {estado} - {uf}      </p>
            </div>

            <div>
                <button> </button>
                <button className='deletar' onClick={deletar}> Apagar </button>
            </div>

        </div>
    )
}