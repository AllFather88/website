import React from "react";
import styles from './reg.module.css'

export default  function Register(){
    return(
        <>
        <div className={styles.auth}>
        <h1>Регистрация</h1>
        <form>
           <div><input className={styles.login}  type="text"  placeholder="name"></input></div> 
           <div><input className={styles.password}  type="password"  placeholder="password"></input></div> 
           <div><input className={styles.password} type="password" placeholder="repeat password"></input></div> 
           <button className={styles.btn}>Зарегистрироваться</button>
        </form>
        <div className={styles.link}>Уже есть акаунт<a href="http://localhost:3000/auth"> Войти</a></div>
        </div>
        </>
    )
}
 
