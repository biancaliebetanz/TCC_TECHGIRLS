import { Link } from "react-router-dom";
import './index.scss';

export default function CabecalhoCompra(props){
   


    return(
            <div className="espaco2">
                <header className="cab2">
                <Link to='/'> <img className="logo2" alt="" src={props.logo}/></Link>    
                </header>
                    <hr className='linha2'></hr>
            </div>
               
        )
}