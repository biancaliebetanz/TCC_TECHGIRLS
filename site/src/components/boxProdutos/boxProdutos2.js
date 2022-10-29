import "./boxProduto.scss"

export default function BoxProduto2(props){
    return (
        <div className="boxproduto">
            
            <img className="imgbox" src={props.img} alt=''/>
            
            <h1> {props.nome} </h1>
            <h1> {props.preco} </h1>
           
        </div>
    )
}