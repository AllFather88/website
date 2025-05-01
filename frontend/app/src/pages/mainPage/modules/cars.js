import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate  } from "react-router-dom";
import styles from "./cars.module.css"
import foto1 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/q.jpg"
import foto2 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/x.jpg"
import foto3 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/y.jpg"

export default function Cars(){
    const x = [foto1,foto2,foto3];
    const [lots,setLots] = useState([])
    const navigate = useNavigate();
    const request = async () => {
        const response = await fetch("http://localhost:8080/public/getall", {});
        let data = await response.json();
        if (response.ok) {
            const promises = data.map(async (lot) => {
                const imageResponse = await fetch(`http://localhost:8080/public/image/${Number(lot.id)}`);
                if (!imageResponse.ok) {
                    console.log(`Изображение для ${lot.id} не найдено`);
                    return { ...lot, url: null };
                }
                const blob = await imageResponse.blob();
                const url = URL.createObjectURL(blob);
                return { ...lot, url }; 
            });
            data = await Promise.all(promises);
            setLots(data);
            console.log(data);
        } else {
            alert("Ошибка");
        }
    };
     useEffect(()=>{
           request();
        },[])
    return(
        <>
        <div className={styles.inp}><input id="search"></input><button doClick={()=>Clean('search')} className={styles.clean}>✕</button ><button onClick={()=>{}} className={styles.search}>⌕</button></div> 
        <div className={styles.all}>
        <div className={styles.filter}></div>
        <div className={styles.cars}>
        {lots.map((lot,index)=>{
            return (
               <div id={lot.id} onDoubleClick={()=>{navigate(`/lot/${lot.id}`)}} className={styles.car}>
                <div className={styles.img}><img src={lot.url || foto2}/></div>
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