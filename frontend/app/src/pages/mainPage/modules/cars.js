import React, { useState } from "react";
import styles from "./cars.module.css"
import foto1 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/q.jpg"
import foto2 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/x.jpg"
import foto3 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/y.jpg"

export default function Cars(){
    const x = [foto1,foto2,foto3];
    const [lots,setLots] = useState([
        {
            id:1,
            brand:"Audi",
            model:"RS6",
            year:2002
        },
        {
            id:1,
            brand:"Audi",
            model:"RS6",
            year:2002
        },
       
        {
            id:1,
            brand:"Audi",
            model:"RS6",
            year:2002
        },
        {
            id:1,
            brand:"Audi",
            model:"RS6",
            year:2002
        },
        {
            id:1,
            brand:"Audi",
            model:"RS6",
            year:2002
        },
        {
            id:1,
            brand:"Audi",
            model:"RS6",
            year:2002
        },
        {
            id:1,
            brand:"Audi",
            model:"RS6",
            year:2002
        }
    ])
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
        {lots.map((lot,index)=>{
            return (
               <div id={1} className={styles.car}>
                <div className={styles.img}><img src={foto3}/></div>
                <div className={styles.inf}>
                <div className={styles.brand}>{lot.brand}</div>
                <div className={styles.model}>Модель:{lot.model}</div>
                <div className={styles.year}>{lot.year} год</div>
                <div className={styles.max}>Текущая ставка: {lot.year}($)</div>
                </div>
            </div>
           )
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