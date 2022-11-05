import './index.scss'

export default function Rodape(props){
    return(
        <footer className='footer'>
            <div className='outro'>
                <p> Nos siga nas  <span> Redes </span>  <span>  sociais </span></p>


            </div>
            <div>
            <hr className='linha-rodape'></hr>

            </div>
           <div className='Redes'>
           <img className='icon' src={props.insta} alt=''/>
            <img className='icon' src={props.face}/>
            <img className='icon' src={props.whats}/>

           </div>

        </footer>
    )
}




