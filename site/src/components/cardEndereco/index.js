import './index.scss'

export default function CardEndereco({item: { id, referencia, bairro, cidade, estado, uf ,  numero, endereco}, selecionar, selecionado }) {


    return (
        <div className='Endereco' onClick={() => selecionar(id)} style={{ backgroundColor: selecionado ? '#521FAF' : '#ffff' , color: selecionado ? '#ffff' : '#521FAF'}}>
            <img src='' alt='' />
                <h6 className='tipo'> {referencia} </h6>
            <div>
                <p> {endereco}, {numero} </p>
                <p> {bairro}, {cidade}   </p>
                <p> {estado} - {uf}      </p>
            </div>

        </div>
    )
}