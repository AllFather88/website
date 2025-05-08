import React, { useEffect, useState } from "react";
import styles from "./cars.module.css"
import { NewToken } from "../../authentication/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { Lot } from "./cars";

const Saved = ()=>{
    const navigate = useNavigate() 
    const [lots,setLots] = useState([
        {},
        {},
        {},
    ])
    const [message,setMessage] = useState()
    const Request = async ()=>{
        let i = 5;
        while(--i){
            const storedUser = sessionStorage.getItem("user");
            const user = JSON.parse(storedUser);               
            try{
                const response = await fetch('http://localhost:8080/private/saved', { 
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token "+ user.tokens.token,  
                    }
                });
                if(!response.ok){
                    await NewToken(navigate)
                }
                else{
                    const lt = await response.json()
                    setLots(lt)
                    setMessage('')
                    return
                }
            }catch(error){
                setMessage(error.message)
            }
        }
        navigate("/")
    }
    
    return(
        <div className={styles.cars}>
        {message && <div className={styles.message}>{message}</div>}
        {lots.map((lot,index)=>{
           return( <Lot key={lot.id} lot={lot} index={index}/>)
        })}
        </div>
    )
} 
export default Saved