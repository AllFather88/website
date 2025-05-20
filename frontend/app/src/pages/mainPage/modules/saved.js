import React, { useEffect, useState } from "react";
import styles from "./cars.module.css"
import { NewToken } from "../../authentication/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { Lot } from "./cars";
import { useContext } from "react";
import { userContext } from "../../../App";

const Saved = ()=>{
    const navigate = useNavigate() 
    const [message,setMessage] = useState()
    const [user,setUser] = useContext(userContext);
    const [lots,setLots] = useState([])
    const Request = async ()=>{
        let i = 5;
        while(--i){           
            try{
                const response = await fetch('http://localhost:8080/private/saved', { 
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token "+ user.tokens.token,  
                    }
                });
                if(!response.ok){
                    await NewToken(navigate,user,setUser)
                }
                else{
                    const lt = await response.json()
                    const promises = lt.map(async (lot) => {
                    const imageResponse = await fetch(`http://localhost:8080/public/image/${Number(lot.id)}`);
                    if (!imageResponse.ok) {
                        console.log(`Изображение для ${lot.id} не найдено`);
                        return { ...lot, url: null };
                    }
                    const blob = await imageResponse.blob();
                    const url = URL.createObjectURL(blob);
                    return { ...lot, url }; 
                    });
                    const data = await Promise.all(promises);
                    setLots(data);
                    setMessage('')
                    return
                }
            }catch(error){
                setMessage(error.message)
            }
        }
        navigate("/")
    }
    useEffect(()=>{
        Request()
    },[])
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