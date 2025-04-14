import React from "react";
import styles from "./main.module.css"
import "../test.css"
export default function Main(){
    const Clean = (id)=>{
        const element = document.getElementById(id);
        if(element){
            element.value = '';
        }
    }
    return(
        <>
       <div className={styles.page}>
       <header className={styles.header}>
        <div className={styles.names}>
        <div className={styles.name}>XXXXXXXX</div>
        <div className={styles.username}>ddhh</div>
        </div>
        <div className={styles.menu}> </div>
        </header>
        <div className={styles.headersize}></div>
        <div className={styles.inp}><input id="search" type="text"></input><button onClick={()=>Clean('search')} className={styles.clean}>✕</button ><button className={styles.search}>⌕</button></div> 
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
        <h2><a href="http://localhost:3000/reg">Регистрация</a></h2>
        <h2><a href="http://localhost:3000/auth">Вход</a></h2>
        <footer className={styles.footer}>

        </footer>
       </div>
        </>
    )

}


