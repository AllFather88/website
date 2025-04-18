import React, { useState } from "react";
import styles from './reg.module.css'
import { useNavigate } from "react-router-dom";
import "../general.css"

export default  function Register(){
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const userData = {
            name: formData.get("name"),
            password: formData.get("password"),
        };
        if( formData.get("repeatPassword") !== userData.password ){
            setMessage("Ошибка пароли не совпадают")
            return;
        }
        console.log(JSON.stringify(userData))
        const response = await fetch("http://localhost:8080/public/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        console.log(JSON.stringify(data))
        if (response.ok) {
           if(data.token === "error"){
                setMessage(data.tokens.refreshToken);
           }
           else{
				sessionStorage.setItem("user",JSON.stringify(data))
				navigate('/')
           }
        } else {
            alert("Ошибка авторизации");
        }
    };
    return(
        <>
        <div className={styles.auth}>
        <h1>Регистрация</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
           <div><input className={styles.login} required  name="name"  type="text"  placeholder="name"></input></div> 
           <div><input className={styles.password} required pattern=".{6,}" name="password" type="password"  placeholder="password"></input></div> 
           <div><input className={styles.password} required name="repeatPassword" type="password" placeholder="repeat password"></input></div> 
           <button className={styles.btn}>Зарегистрироваться</button>
        </form>
        <div className={styles.link}>Уже есть акаунт. <a href="http://localhost:3000/auth">Войти</a></div>
        {message && <div className={styles.message}>{message}</div>}
        </div>
        </>
    )
}
 
