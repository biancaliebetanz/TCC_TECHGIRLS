import './index.scss';


export function CardTema(props) {

    return(
        <div className="card"> 
        <img src={props.imagem}/>
        <div style={ { backgroundColor : props.cor} }>
        <Link to={'/usuario/tema/' + props.id}> {props.nome} </Link>
        </div>
       </div>
    )
}