import React, { useState } from "react";
import styles from './auth.module.css'

export default  function Auth(){
    const [type,setType] = useState(true)
    const handleSubmit = async (event) => {
        event.preventDefault(); 
    
        const formData = new FormData(event.target);
        const userData = {
            name: formData.get("name"),
            password: formData.get("password"),
        };
        console.log(JSON.stringify(userData))
        const response = await fetch("http://localhost:8080/public/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            alert("Успешный вход! Токен: " + data.token);
        } else {
            alert("Ошибка авторизации");
        }
    };
    
    return(
        <>
        <div className={styles.auth}>
        <h1>Вход</h1>
        <form onSubmit={handleSubmit}>
           <div><input className={styles.login} name="name"  type="text" placeholder="name"></input></div> 
           <div><input className={styles.password}  name="password" type={type ? "password" : "text"} placeholder="password"></input></div> 
           <div>Показать пароль: <input type="checkbox" onClick={()=>setType(!type)}></input></div> 
           <button className={styles.btn}>Войти</button>
        </form>
        <div className={styles.link}><a href="http://localhost:3000/reg">Регистрация</a></div>
        </div>
        </>
    )
}
 
