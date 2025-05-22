import React, { useState } from "react";
import styles from './reg.module.css'
import { useNavigate } from "react-router-dom";
import "../general.css"
import { useContext } from "react";
import { userContext } from "../../App";

export default  function Register(){
    const [message,setMessage] = useState("");
    const [user,setUser] = useContext(userContext);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const userData = {
            name: formData.get("name"),
            password: formData.get("password"),
            phone_number:formData.get("phone_number"),
        };
        if( formData.get("repeatPassword") !== userData.password ){
            setMessage("Ошибка пароли не совпадают")
            return;
        }
       try{
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
           if(data.tokens.token === "error"){
                setMessage(data.tokens.refreshtoken);
           }
           else{
				sessionStorage.setItem("user",JSON.stringify(data))
                setUser(data)
				const ref  = sessionStorage.getItem("ref")
                    if(ref){
                        navigate(ref); 
                    }else{
                        navigate("/");
                    } 
           }
        } else {
            setMessage("Ошибка "+ response.status);
        }
       }catch(error){
            setMessage("Не удалось соединится с сервером");
       }
    };
    return(
        <>
        <div className={styles.auth}>
        <h1>Регистрация</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
           <div><input className={styles.login} required  name="name" pattern="[A-Za-z]{3,10}" type="text" title="Логин должен состоять из латинских букв и иметь размер от 3 до 10 символов"  placeholder="login"></input></div>
           <div><input className={styles.number} required  name="phone_number" defaultValue={"+375 "}  title="Введите номер в формате: +375 29 1234567"  type="tel"  placeholder="phone number"></input></div> 
           <div><input className={styles.password} required pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"  title="Пароль должен содержать минимум 6 символов, хотя бы одну заглавную латинскую букву, одну цифру и один специальный символ (@$!%*?&)" name="password" type="password"  placeholder="password"></input></div> 
           <div><input className={styles.password} required name="repeatPassword" type="password" placeholder="repeat password"></input></div> 
           <button className={styles.btn}>Зарегистрироваться</button>
        </form>
        <div className={styles.link}>Уже есть акаунт. <a href="http://localhost:3000/auth">Войти</a></div>
        {message && <div className={styles.message}>{message}</div>}
        </div>
        </>
    )
}
// pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"  
 
