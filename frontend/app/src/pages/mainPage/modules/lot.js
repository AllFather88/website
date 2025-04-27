import React, { useState } from "react";
import styles from "./lot.module.css"
import styles1 from "../main.module.css"
import { useNavigate } from "react-router-dom";
import {useParams}  from "react-router-dom";
import foto1 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/foto.jpg"
import foto2 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/x.jpg"
import foto3 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/y.jpg"

export default function Lot(){
    const {data} = useParams();
    const navigate = useNavigate();
    const [user,setUser] = useState({role:"admin"});
    return(
        <>
       <div className={styles1.page}>
       <header className={styles1.header}>
        <div className={styles1.names}>
        <div className={styles1.name}>NAME</div>
        <div className={styles1.username}>{user ?<><button onClick={()=>{sessionStorage.removeItem("user");setUser(null)}}>Кнопка</button>{user.name}</>  : <button onClick={()=>{navigate("/auth")}}>Войти</button>}</div>
        </div>
        
        </header>
        <div className={styles1.headersize}></div>
        <div className={styles.lot}>
            <div className={styles.images}><img src={foto2}/></div>
            <div className={styles.info}></div>
           {user.role==="admin" &&  <div className={styles.adminMenu}>jhh</div>}
        </div>
        <div>{data}</div>
        <footer className={styles1.footer}>
        </footer>
       </div>
        </>
    )
}

