import React from "react";
import "./notfound.css"

export default function NotFound(){
    return(
        <>
        <div className="notfound">
        <h1 className="p404">404 страница не найдена</h1>
        <h2><a className="p404toMain" href="http://localhost:3000/">Главная</a></h2>
        </div>
        
        </>
    )
}

