import "./boxBanner.scss"

export default function Banner(props) {
    return (
        <div className="container">
            <img className="slider" src={props.img} alt=''/>
            <div>
               <img className="slider" src='' alt=''/>
                <button onClick={props.clickdelete}> 
                    <img src="./images/lixeira.png" alt=""/>
                </button>  
            
                <button onClick={props.clickedit}> 
                    <img src="./images/editar.png" alt=""/>
                </button>  
            </div> 

            </div>

    )
}