import React, { useEffect, useState } from "react";
import styles from "./main.module.css"
import "../test.css"
import Notifications from "./modules/notifications.js";
import Cars from "./modules/cars.js";
import Add from "./modules/add.js";

export default function Main(){
    const [menu,setMenu] = useState("cars");
    const [admin,setAdmin] = useState('admin');
    const [user,setUser] = useState({});
    const Menu = ()=>{
        const AdminMenu = ()=>{
            return(
                
                user.role === "admin" && (<><button onClick={()=>setMenu("add")}>Добавить лот</button>
                <button>Управление правами</button></>)
                
            )
        }
        return(
            user && (<div className={styles.menu}>
                <AdminMenu/>
                <button onClick={()=>setMenu("notifications")}>Уведомления</button>
                <button>Ставки</button>
                <button onClick={()=>setMenu("cars")}>Лоты</button>
                <button>Настройки</button>
            </div>)
        )
    }
    useEffect(()=>{
        const storedUser = sessionStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
        console.log(JSON.parse(storedUser))
    },[])
    return(
        <>
       <div className={styles.page}>
       <header className={styles.header}>
        <div className={styles.names}>
        <div className={styles.name}>XXXXXXXX</div>
        <div className={styles.username}>{user && user.name}</div>
        </div>
       `{menu && <Menu/>}
        </header>
        <div className={styles.headersize}></div>
        {menu === "notifications" && <Notifications/>}
        {menu === "cars" &&  <Cars/>}
        {menu === "add" &&  <Add/>}
        <footer className={styles.footer}>

        </footer>
       </div>
        </>
    )

}


