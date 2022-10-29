import { API_URL } from '../../API/config';
import './tema.scss'

export default function Tema(props){

    function exibir(imagem){
        if(!imagem){
            return '';
        }
        else{
            return `${API_URL}/${imagem}`;
        }
    }
    
    return(
        <div className='tema'>
            <div className='esp'>
                <h4 className={props.cor}> {props.nome} </h4>

                <div>
                    <button> editar </button>
                    <button> remover </button>
                </div>

            </div>

            <img className='img' src={exibir(props.imagem)} alt='' />
        </div>
    )
}