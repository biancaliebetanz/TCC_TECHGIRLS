import { deletarEnderecos } from '../../API/usuario/enderecoApi'
import Storage from 'local-storage'
import './index.scss'
import { toast } from 'react-toastify';

export default function CardEndereco({item: { id,referencia, bairro, cidade, estado, uf ,  numero, endereco}, selecionar, selecionado }) {


    return (
        <div className='Endereco' onClick={() => selecionar(id)} style={{ textTransform: selecionado ? 'capitalize' : 'uppercase'}}>
            <img src='' alt='' />
                <p className='tipo'> referencia: {referencia} </p>
            <div>
                <p> {endereco}, {numero} </p>
                <p> {bairro}, {cidade}   </p>
                <p> {estado} - {uf}      </p>
            </div>

        </div>
    )
}