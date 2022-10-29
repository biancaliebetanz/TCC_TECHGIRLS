export default function Lista(props){
    return(
        <main>
            <div>
                <span>{props.it}</span>
                <button onClick={e => props.deletarit(props.it)}> Apagar </button>
            </div>
        </main>
    )
}