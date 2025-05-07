import React, { useEffect, useState } from "react";
import styles from "./settings.module.css"
import { NewToken } from "../../authentication/auth";
import { Navigate, useNavigate } from "react-router-dom";
export  const Settings = ()=>{
    const [im,setIM] = useState();
    const navigate = useNavigate()
     const [message,setMessege] = useState('')
    const GetIm = async () => {
        let i = 4
        while(--i){
            const storedUser = sessionStorage.getItem("user");
            const user1 = JSON.parse(storedUser);       
            const response = await fetch('http://localhost:8080/private/im', { 
                           headers: {
                               "Authorization": "Token "+ user1.tokens.token,  
                           }
                       })
                       if(response.status === 401 || response.status === 403){
                         await NewToken(navigate)
                       }
                       else{
                            const ujson = await response.json()
                            setIM(ujson)
                            console.log(ujson)
                            return
                        }
                   }
    }
    useEffect(()=>{
        GetIm()        
    },[])
    const newEmail = async (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        let i = 10;
        while(--i){
            const storedUser = sessionStorage.getItem("user");
            const user = JSON.parse(storedUser);               
            try{
                const response = await fetch('http://localhost:8080/private/newemail', { 
                    method: "POST",
                    body:  JSON.stringify(formObject),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token "+ user.tokens.token,  
                    }
                });
                if(!response.ok){
                 await NewToken(navigate)
                }
                else{
                    navigate(0)
                    return
                }
            }catch(error){
                setMessege(error.message)
            }
        }
    }
    const newNumber = async (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        let i = 10;
        while(--i){
            const storedUser = sessionStorage.getItem("user");
            const user = JSON.parse(storedUser);               
            try{
                const response = await fetch('http://localhost:8080/private/newnumber', { 
                    method: "POST",
                    body:  JSON.stringify(formObject),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token "+ user.tokens.token,  
                    }
                });
                if(!response.ok){
                 await NewToken(navigate)
                }
                else{
                    navigate(0)
                    return
                }
            }catch(error){
                setMessege(error.message)
            }
        }
    }
    return(
        <>
        <form className={styles.change} onSubmit={newEmail}>
            <div>Сменить email(текущий: {im && im.email || ' отсутствует'})</div>
            <input required type="email" name="email"></input>
            <button >Изменить</button>
        </form>
        <form className={styles.change} onSubmit={newNumber}>
        <div>Сменить номер телефона(текущий: {im && im.phone_number ||  ' отсутствует'})</div>
            <input required type="text" name="phone_number"></input>
            <button >Изменить</button>
        </form>
        {message && <div className={styles.message}>{message}</div>}
        </>
    )
}

