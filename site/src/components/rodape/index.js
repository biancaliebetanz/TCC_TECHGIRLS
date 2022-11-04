import './index.scss'

export default function Rodape(props){
    return(
        <footer className='footer'>
            <div className='outro'>
                <h2> Nos siga nas  <span> Redes </span>  <span>  sociais </span></h2>
                <hr className='linha2'></hr>


            </div>
           <div className='Redes'>
           <img src={props.insta} alt=''/>
            <img src={props.face}/>
            <img src={props.whats}/>
           </div>
           <div className='logooo'>

           </div>
        </footer>
    )
}




