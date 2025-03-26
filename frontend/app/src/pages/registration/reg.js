import React from "react";
import styles from './reg.module.css'

export default  function Register(){
    return(
        <>
        <div className={styles.auth}>
        <h1>Регистрация</h1>
        <form>
           <div><input className="login"  type="text"></input></div> 
           <div><input className="password" type="text"></input></div> 
           <div><input className="password" type="text"></input></div> 
           <button>Зарегистрироваться</button>
        </form>
        <div className="link">Уже есть акаунт<a href="http://localhost:3000/auth"> Войти</a></div>
        </div>
        

        
      
        </>
    )
}
 
