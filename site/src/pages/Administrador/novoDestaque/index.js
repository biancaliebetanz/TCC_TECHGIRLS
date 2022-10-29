import "./index.scss";
import { API_URL } from "../../../API/config.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Index() {
    return (
        <main className="novo-destaq">
            <h2> MOVO DESTAQUE </h2>

            <button> Filtar </button>
            <input type= "text"> Tema: </input>

            <div className="produto-destaq" >
                <img className="img-destaq" src=""> </img>
                <h1> NOME DO PRODUTO</h1>
              </div>

        </main>
    )
}