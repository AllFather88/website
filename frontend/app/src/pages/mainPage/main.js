import React, { useContext, useEffect, useState } from "react";
import {userContext} from 'C:/Users/user/Desktop/website/website/frontend/app/src/App.js'
import styles from "./main.module.css"
import "../test.css"
import { useNavigate } from "react-router-dom";
import Notifications from "./modules/notifications.js";
import Cars from "./modules/cars.js";
import Add from "./modules/add.js";
import Settings from "./modules/settings.js";
import Saved from "./modules/saved.js";

export default function Main(){
    const [menu,setrefMenu] = useState("cars");
    const [user,setUser] = useContext(userContext);
    const navigate = useNavigate();
    const setMenu = (mode)=>{
        sessionStorage.setItem('mode',mode || 'cars')
        setrefMenu(mode || 'cars')
    }
    useEffect(()=>{
        const mode = sessionStorage.getItem('mode')
        setMenu(mode)
        console.log(user)
    },[])
    const Menu = ()=>{
        const AdminMenu = ()=>{
            return(
                user.role === "admin" && (<>
                <button onClick={()=>setMenu("add")} style={{ backgroundColor: menu === "add" ? "orange" : "white" }}>Добавить лот</button>
                <button>Управление правами</button> 
               </>)
            )
        }
        return(
            user && user.name && (<div className={styles.menu}>
                <AdminMenu/>
                <button style={{ backgroundColor: menu === "cars" ? "orange" : "white" }} onClick={()=>setMenu("cars")}>Лоты</button>
                <button style={{ backgroundColor: menu === "saved" ? "orange" : "white" }} onClick={()=>setMenu("saved")}>Сохранённые лоты</button>
                <button onClick={()=>setMenu("settings")} style={{ backgroundColor: menu === "settings" ? "orange" : "white" }}>Настройки</button>
            </div>)
        )
    }
    return(
        <>
       <div className={styles.page}>
       <header className={styles.header}>
        <div className={styles.names}>
        <div onClick={()=>{navigate(0)}} className={styles.name}>Автоаукцион</div>
        <div className={styles.username}>{user && user.name ?<><button className={styles.exit} onClick={()=>{sessionStorage.removeItem("user");{sessionStorage.removeItem("mode");setMenu('cars');setUser(null)}}}>Выйти</button>{user.name}</>  : <button onClick={()=>{navigate("/auth")}}>Войти</button>}</div>
        </div>
       {user && <Menu/>}
        </header>
        <div className={styles.headersize}></div>
        {menu === "cars" &&  <Cars/>}
        {menu === "add" &&  <Add/>}
        {menu === "settings" &&  <Settings/>}
        {menu === "saved" &&  <Saved/>}
        <footer className={styles.footer}>
        </footer>
       </div>
        </>
    )
}


