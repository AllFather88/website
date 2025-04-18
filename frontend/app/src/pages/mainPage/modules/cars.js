import React, { useState } from "react";
import styles from "./cars.module.css"


export default function Cars(){
    return(
        <>
        <div className={styles.inp}><input id="search"></input><button onClick={()=>Clean('search')} className={styles.clean}>✕</button ><button onClick={()=>{}} className={styles.search}>⌕</button></div> 
        <div className={styles.all}>
        <div className={styles.filter}></div>
        <div className={styles.cars}>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
        <div className={styles.car}></div>
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