export default function Inputs(props){
    return(
        <div>
            <div className={props.classe}>
            <img className={props.img} src={props.icon} alt="icon"></img>
            <input placeholder={props.placeholder} type={props.type} onChange={props.onChange} ></input>
            </div>
    </div>

    )
}