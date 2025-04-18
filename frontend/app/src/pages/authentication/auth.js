import React, { useState } from "react";
import styles from './auth.module.css'
import { useNavigate } from "react-router-dom";
import "../general.css"

export default  function Auth(){
    const [message,setMessage] = useState("");
    const [type,setType] = useState(true)
	const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const userData = {
            name: formData.get("name"),
            password: formData.get("password"),
        };
        const response = await fetch("http://localhost:8080/public/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
		console.log(JSON.stringify(data))
        if (response.ok) {
           if(data.tokens.token === "error"){
                setMessage(data.tokens.refreshtoken);
           }
           else{
				sessionStorage.setItem("user",JSON.stringify(data))
				navigate("/");
           }
        } else {
            alert("Ошибка авторизации");
        }
    };
    return(
        <>
        <div className={styles.auth}>
        <h1>Вход</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
           <div><input className={styles.login} required name="name"  type="text" placeholder="name"></input></div> 
           <div><input className={styles.password} required name="password" type={type ? "password" : "text"} placeholder="password"></input></div> 
           <div className={styles.show}>Показать пароль:<input type="checkbox" onClick={()=>setType(!type)}></input></div> 
           <button className={styles.btn}>Войти</button>
        </form>
        <div className={styles.link}><a href="http://localhost:3000/reg"> Регистрация</a></div>
        {message && <div className={styles.message}>{message}</div>}
        </div>
        </>
    )
}
 
