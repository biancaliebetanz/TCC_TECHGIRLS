import "./boxProduto.scss"

export default function BoxProduto(props){
    return (
        <div className="boxproduto">
            
            <img className="imgbox" src={props.img} alt=''/>
            
            <h1> {props.nome} </h1>
            <h1> {props.preco} </h1>

            <div className="esp-botao">
                <button onClick={props.clickdelete}> 
                    <img className="img" src="./images/lixeira.png" alt=""/>
                </button>  
            
                <button onClick={props.clickedit}> 
                    <img className="img" src="./images/editar.png" alt=""/>
                </button>  
            </div>   

        </div>
    )
}