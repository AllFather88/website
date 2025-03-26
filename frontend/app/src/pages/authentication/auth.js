import React from "react";
import stules from './auth.module.css'

export default  function Auth(){
    return(
        <>
        <div className={stules.auth}>
        <h1>Вход</h1>
        <form>
           <div><input className="login"  type="text"></input></div> 
           <div><input className="password" type="text"></input></div> 
           <button>Войти</button>
        </form>
        <div className="link"><a href="http://localhost:3000/reg">Регистрация</a></div>
        </div>
        </>
    )
}
 
