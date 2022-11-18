
import { API_URL } from '../../API/config';
import './banners.scss'
  
  export default function Banners(props) {

    
    function exibir(imagem) {
        return `${API_URL}/${imagem}`;
    }

    return (
        <div className='banner-item'>
            <img className='banner' src={exibir(props.banner.banner)} />
        </div>
    )
  }