import React, { useState } from "react";
import styles from "./lot.module.css"
import styles1 from "../main.module.css"
import { useNavigate } from "react-router-dom";
import {useParams}  from "react-router-dom";
import { useEffect } from "react";
import foto1 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/foto.jpg"
import foto2 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/x.jpg"
import foto3 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/y.jpg"
import { NewToken } from "../../authentication/auth";

export default  function Lot(){
    const {data} = useParams();
    const navigate = useNavigate();
    const [user,setUser] = useState();
    const [lot,setLot] = useState();
    const [imageSrc, setImageSrc] = useState([]);
    const [index,setIndex] = useState(0);
    const [names,setNames] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/public/lot/${Number(data)}`) 
        .then(response => {
            if (!response.ok) {
                navigate('/');
            }
            return response.json(); 
        })
        .then(lotjson => setLot(lotjson))
        .catch(error => console.error("Ошибка", error));
    }, [names,index]);
    useEffect(()=>{
            const storedUser = sessionStorage.getItem("user");
            setUser(storedUser ? JSON.parse(storedUser) : null);
            console.log(JSON.parse(storedUser))
    },[])
    const getNames = async () => { 
        const response = await fetch(`http://localhost:8080/public/images/${Number(data)}`);
        let imagenames = [];
        try {
            imagenames = await response.json();
            console.log(imagenames)
        } catch (e) {
            return;
        }
        if (response.ok) {
            setNames(imagenames);
        } else {
            alert("Ошибка");
        }
    }
    useEffect(() => { 
        getNames();
         
      }, []);
    useEffect(() => {
        if (!names.length || names[index] === undefined) return; 
        fetch(`http://localhost:8080/public/image/${Number(data)}/${names[index]}`)
            .then(response => response.ok ? response.blob() :console.error("Ошибка"))
            .then(blob => setImageSrc(URL.createObjectURL(blob)))
            .catch(error => console.error("Ошибка загрузки изображения:", error));
    },  [names,index]);

   
    const AdminMenu = ()=>{
        const newDate = async (event,type) => {
            event.preventDefault(); 
            const formData = new FormData(event.target);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            formObject['id'] = Number(data);
            console.log(JSON.stringify(formObject))
            while(true){
                const storedUser = sessionStorage.getItem("user");
                const user = JSON.parse(storedUser);               
                try{
                    const response = await fetch("http://localhost:8080/admin/"+type, { 
                        method: "POST",
                        body:  JSON.stringify(formObject),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token "+ user.tokens.token,  
                        }
                    });
                    return
                }catch(error){
                    NewToken(user)
                }
            }
        };
        const DelLot = async () => {
            while(true){
                const storedUser = sessionStorage.getItem("user");
                const user = JSON.parse(storedUser);               
                try{
                    const response = await fetch("http://localhost:8080/admin/dellot", { 
                        method: "POST",
                        body:  Number(data),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token "+ user.tokens.token,  
                        }
                    });
                    console.log(await response.text())
                    return
                }catch(error){
                    NewToken(user)
                }
            }
        };
        return(
            <div className={styles.adminmenu}>
                    <form onSubmit={(event)=>{newDate(event,"end")}}>
                        <input required type="datetime-local"  id="endDatetime" name="date"></input>
                        <button>Сменить дату конца</button>
                    </form>
                    <form onSubmit={(event)=>{newDate(event,"start")}}>
                        <input required type="datetime-local" id="startDatetime" name="date"></input>
                        <button>Сменить дату начала</button>
                    </form>
                    <button onClick={DelLot}>Удалить лот</button>
                    <div className={styles.bidinf}>
                    <div>Лидер:</div>
                    <div></div>
                    <div>Номер телефона:</div>
                    </div>
            </div>
        )
    }
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
        <div className={styles.images}>
            <img src={imageSrc || foto1} alt="Фото"/>
            <div className={styles.controls}>
                <button>&#x2190;</button>
                <button>&#x2192;</button>
            </div>
        </div>
        <div className={styles.info}>{data}</div>
        {user && user.role==="admin" &&  <AdminMenu/>}
        </div>
        <footer className={styles1.footer}>
        </footer>
       </div>
        </>
    )
}

