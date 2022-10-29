import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../../API/config';
import { deletarTema } from '../../API/tema/temaAPI';
import './tema.scss'

export default function Tema(props){


    
    return(
        <div className='tema'>
            <div className='esp'>
                <h4 className={props.cor}> {props.nome} </h4>

                <div>
                    <button onClick={props.editar}> editar </button>
                    <button onClick={props.deletar}> remover </button>
                </div>

            </div>

            <img className='img' src={props.imagem} alt='' />
        </div>
    )
}