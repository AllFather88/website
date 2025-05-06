import React, { useEffect, useState } from "react";
import styles from "./main.module.css"
import "../test.css"
import { useNavigate } from "react-router-dom";
import Notifications from "./modules/notifications.js";
import Cars from "./modules/cars.js";
import Add from "./modules/add.js";

export default function Main(){
    const [menu,setrefMenu] = useState("cars");
    const [user,setUser] = useState({role:"admin"});
    const navigate = useNavigate();
    const setMenu = (mood)=>{
        sessionStorage.setItem('ref',mood)
        setrefMenu(mood)
    }
    useEffect(()=>{
        const ref = sessionStorage.getItem('ref')
        setMenu(ref)
    },[])
    const Menu = ()=>{
        const AdminMenu = ()=>{
            return(
                user.role === "admin" && (<><button onClick={()=>setMenu("add")}>Добавить лот</button>
                <button onClick={()=>setMenu("notifications")}>Уведомления</button>
                <button>Ставки</button>
                <button onClick={()=>setMenu("cars")}>Лоты</button>
                <button>Настройки</button>
                <button>Управление правами</button> 
               </>)
            )
         
        }
        return(
            user && (<div className={styles.menu}>
                <AdminMenu/>
            </div>)
        )
    }
              
    
    useEffect(()=>{
        const storedUser = sessionStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
        setUser({role:"admin"})
    },[menu])
    return(
        <>
       <div className={styles.page}>
       <header className={styles.header}>
        <div className={styles.names}>
        <div onClick={()=>{navigate(0)}} className={styles.name}>Автоаукцион</div>
        <div className={styles.username}>{user ?<><button className={styles.exit} onClick={()=>{sessionStorage.removeItem("user");setUser(null)}}>Выйти</button>{user.name}</>  : <button onClick={()=>{navigate("/auth")}}>Войти</button>}</div>
        </div>
       `{user && <Menu/>}
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


