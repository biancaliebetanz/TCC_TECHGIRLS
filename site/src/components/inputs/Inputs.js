import Storage from 'local-storage'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Inputs(props){
    const navigate = useNavigate();
    
    
    useEffect(() => {
        if(!Storage('usuario-logado')){
            navigate('/login/admin')
        }
        
    }, [])
    return(
        <div>
            <div className={props.classe}>
            <img className={props.img} src={props.icon} alt="icon"></img>
            <input placeholder={props.placeholder} type={props.type} onChange={props.onChange} ></input>
            </div>
    </div>

    )
}