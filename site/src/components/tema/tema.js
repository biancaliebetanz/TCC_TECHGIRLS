import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../../API/config';
import { deletarTema } from '../../API/tema/temaAPI.js';
import './tema.scss'

export default function Tema(props){


    
    return(
        <div className='tema' style={ {backgroundColor : props.cor} }>
            <div className='esp'>
                <h4> {props.nome} </h4>

                <div>
                    <img className='lixo-edit' onClick={props.editar} src='../images/editBranco.png'></img>
                    <img className='lixo-edit' onClick={props.deletar} src='../images/lixoBranco.png'></img>

                </div>

            </div>

            <img className='img' src={props.imagem} alt='' />
        </div>
    )
}