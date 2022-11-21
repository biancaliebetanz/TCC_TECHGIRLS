import './index.scss'

export default function Comentario(props) {
    return (
        <div className="comment">
            <div className="flex-nome">
                <img classname='user-img' src='../images/usercomment.png' alt='' />
                <h3 className='usernome'>{props.item.nome}</h3>
            </div>
            <p> Pedido #{props.item.pedido}</p>
            <p>{props.item.comentario}</p>
            <div className="flex-row">
                <img  src={props.item.nota >= 1 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                <img  src={props.item.nota >= 2 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                <img  src={props.item.nota >= 3 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                <img  src={props.item.nota >= 4 ? '../../../images/star.png' : '../../../images/starempty.png'} />
                <img  src={props.item.nota === 5 ? '../../../images/star.png' : '../../../images/starempty.png'} />
            </div>
        </div>
    )
}