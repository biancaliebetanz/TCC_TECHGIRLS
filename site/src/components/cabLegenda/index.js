import { useState } from 'react'
import './index.scss'

export default function Legendas(props){

    return(
        <div>
            <p className="leg" style={{backgroundColor: props.cor }}> {props.nome} </p>
        </div>
    )
}