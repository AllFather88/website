import React, { useState } from "react";
import styles from "./cars.module.css"


export default function Cars(){
    const [lots,setLots] = useState([])
    const handleSubmit = async () => {
       
        const response = await fetch("http://localhost:8080/public/lots", {});
        const data = await response.json();
        console.log(JSON.stringify(data))
        if (response.ok) {
           setLots(data)
        } else {
            alert("Ошибка авторизации");
        }
    };
    return(
        <>
        <div className={styles.inp}><input id="search"></input><button onClick={()=>Clean('search')} className={styles.clean}>✕</button ><button onClick={()=>{}} className={styles.search}>⌕</button></div> 
        <div className={styles.all}>
        <div className={styles.filter}></div>
        <div className={styles.cars}>
        
        {lots.forEach((lot,index)=>{
            return (<div id={lot.id} className={styles.car}></div>)
        })}
        </div>
        </div>
        </>
    )

}
const Clean = (id)=>{
    const element = document.getElementById(id);
    if(element){
        element.value = '';
    }
}