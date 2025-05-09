import React, { useState } from "react";
import styles from "./lot.module.css"
import styles1 from "../main.module.css"
import { useNavigate } from "react-router-dom";
import {useParams}  from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import foto2 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/x.jpg"
import foto1 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/foto.jpg"
import foto3 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/main.jpg"
import { NewToken } from "../../authentication/auth";

export default  function Lot(){
    const {data} = useParams();
    const navigate = useNavigate();
    const [user,setUser] = useState({saved:[]});
    const [lot,setLot] = useState({});
    const [names,setNames] = useState([]);
    const [message,setMessage] = useState('')
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
        getNames();
        fetch(`http://localhost:8080/public/lot/${Number(data)}`) 
        .then(response => {
            if (!response.ok) {
                navigate('/');
                return
            }
            return response.json(); 
        })
        .then(lotjson => setLot(lotjson))
        .catch(error => {});
    }, []);
    const getNames = async () => { 
        try{
            const response = await fetch(`http://localhost:8080/public/images/${Number(data)}`);
            let imagenames = [];
                imagenames = await response.json();
            if (response.ok) {
                setNames(imagenames);
            } 
        }catch(error){
            setMessage('Ошибка связи с сервером')
        }
    }
    const [bid,setBid] = useState({})
    const [highest_bidder,setHighest_bidder] = useState({})
    useEffect(()=>{
        Phone()
    },[bid,user]);
    const Phone = async ()=>{
        if(user && user.role !== "admin"){
            console.log(user)
            return
        }
        console.log(user)
        let i = 5
        while(--i){
            const storedUser = sessionStorage.getItem("user");
            const user = JSON.parse(storedUser);               
            try{
                const response = await   fetch(`http://localhost:8080/admin/user/${Number(data)}`, { 
                    headers: {
                        "Authorization": "Token "+ user.tokens.token,  
                    }
                });
                if(response.status === 401 || response.status === 403){
                    await NewToken(navigate)
                }
                else{
                    const ujson = await response.json()
                    await setHighest_bidder(ujson)
                    return
                }
            }catch(error){
                setMessage('Ошибка связи с сервером')
            }
        }
    }
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
            let i = 5;
            while(--i){
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
                    if(!response.ok){
                     await NewToken(navigate)
                    }
                    else{
                        navigate(0);
                        return
                    }
                }catch(error){
                    setMessage('Ошибка связи с сервером')
                    navigate('/')
                }
            }
        };
        const DelLot = async () => {
            let i = 5
            while(i--){
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
                    })
                    if(response.status === 401 || response.status === 403){
                        await NewToken(navigate)
                    }
                    else{
                        return
                    }
                }catch(error){
                   navigate('/')
                }
            }
        };
      
        return(
            <div className={styles.adminmenu}>
                    <form onSubmit={(event)=>{newDate(event,"end")}}>
                        <input  defaultValue={lot.end} required type="datetime-local"  id="endDatetime" name="date"></input>
                        <button>Сменить дату конца</button>
                    </form>
                    <form onSubmit={(event)=>{newDate(event,"start")}}>
                        <input  defaultValue={lot.start}  required type="datetime-local" id="startDatetime" name="date"></input>
                        <button>Сменить дату начала</button>
                    </form>
                    <button onClick={DelLot}>Удалить лот</button>
                    <div className={styles.bidinf}>
                    <div>Лидер: {highest_bidder.name}</div>
                    <div>Номер телефона: {highest_bidder.phone_number}</div>
                    </div>
            </div>
        )
    }
    const Info = ()=>{
        const [status,SetStatus] = useState('Торги окончены')
        useEffect(()=>{
            const interval = setInterval(Status, 1000); 
            return (() => clearInterval(interval))
        },[]);
       function Status(){
           const currentDate = new Date();
           const endDate = new Date(lot.end);
           const startDate = new Date(lot.start)
           if(endDate < currentDate){
                SetStatus("Торги окончены")
                return
           }
           if(startDate > currentDate){
               const startDate = new Date(lot.start);
               const diff = startDate - currentDate; 
               const hours = Math.floor(diff / (1000 * 60 * 60));
               const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
               const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                SetStatus(`До начала торгов: ${hours}ч ${minutes}м ${seconds}с`)
               return
           }
           const diff =  endDate - currentDate; 
           const hours = Math.floor(diff / (1000 * 60 * 60));
           const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
           const seconds = Math.floor((diff % (1000 * 60)) / 1000);
           SetStatus( `До конца торгов: ${hours}ч ${minutes}м ${seconds}с`)            
    }  
    useEffect(() => {
            if(!status.startsWith('До конца торгов:')){
                return
            }
            const eventSource = new EventSource(`http://localhost:8080/public/lot/${lot.id}/stream`);
            eventSource.onmessage = (event) => {
                const inf = JSON.parse(event.data)
                if(inf.bid !== bid.bid){
                    setBid(inf);
                }
            };
            eventSource.onerror = () => {
                setMessage("Ошибка SSE: ставки не будут обновляться в реальном времени");
                eventSource.close();
            };
            return () => eventSource.close();
    }, [status])
        const Bid = async (event)=>{
            event.preventDefault()
            const bidAmount = event.target.elements.bid.value;
            let i = 4
            while(--i){
                const storedUser = sessionStorage.getItem("user");
                const user1 = JSON.parse(storedUser);
                if(!user || !user.name){
                    navigate('/auth')
                    return
                }       
                const response = await fetch(`http://localhost:8080/private/bid/${data}/${bidAmount}`, { 
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token "+ user1.tokens.token,  
                    }
                })
                if(response.status === 401 || response.status === 403){
                  await NewToken(navigate)
                }
                else{
                    return
                }
            }
        }
        return(
            <>
            <div className={styles.brand}>Марка: {lot.brand}</div>
        <div className={styles.model}>Модель: {lot.model}</div>
        <div className={styles.year}>Год: {lot.year}</div>
        <div className={styles.description}>Описание: {lot.description}</div>
        <div className={styles.max}>Текущая ставка: {bid.bid}$</div>
        <div className={styles.status}>{status}</div>
        {status.startsWith("До конца торгов") &&  <div className={styles.bid}>
            <form className={styles.inp} onSubmit={Bid}>
                <input  name="bid" max="100000000"type='number'></input>
                <button>Поставить</button>
            </form>
        </div>}
        {user && <button onClick={Save}>{user.saved.includes(Number(data)) ? '❌ Убрать из сохранённого' : '💾 Сохранить'}</button>}
            </>
        )
    }
    const Save = async ()=>{
        let i = 4
        while(--i){
            const storedUser = sessionStorage.getItem("user");
            const user1 = JSON.parse(storedUser);
            if(!user || !user.name){
                navigate('/auth')
                return
            }       
            try{
                const response = await fetch(`http://localhost:8080/private/save/${data}`, { 
                    method: "POST",
                    headers: {
                        "Authorization": "Token "+ user1.tokens.token,  
                    }
                })
                if(response.status === 401 || response.status === 403){
                  await NewToken(navigate)
                }
                else{
                    const js = await response.json()
                    if(js === true){
                        if(user.saved.includes(Number(data))){
                            const newArr =  user.saved.filter(num => num !== Number(data));
                            user.saved = newArr;
                            setUser({ ...user, saved: newArr });
                            sessionStorage.setItem('user',JSON.stringify(user))
                        }else{
                            user.saved.push( Number(data))
                            setUser({ ...user});
                            sessionStorage.setItem('user',JSON.stringify(user))
                        }
                    }
                    return
                }
            }catch(error){
                setMessage('Ошибка связи с сервером')
            }
        }
    }
    function Images(){
        const [index,setIndex] = useState(0);
        const [imageSrc, setImageSrc] = useState();
        const AddIndex = ()=>{
            let s = index
            setIndex(++s % names.length)
        }
        const MinusIndex = ()=>{
            let s = index
            if(s-1 < 0){
                setIndex(names.length - 1)
            }
            else{
                setIndex(--s)
            }
        }
        useEffect(() => {
            if (!names.length || names[index] === undefined) return; 
            fetch(`http://localhost:8080/public/image/${Number(data)}/${names[index]}`)
                .then(response => response.ok ? response.blob() :console.error("Ошибка"))
                .then(blob => setImageSrc(URL.createObjectURL(blob)))
                .catch(error => console.error("Ошибка загрузки изображения:", error));
        },  [names,index]);
        return(<><img src={imageSrc || foto2} alt="Фото"/>
               <div className={styles.controls}>
                <button onClick={MinusIndex}>&#x2190;</button>
                <button onClick={AddIndex}>&#x2192;</button>
            </div>
        </>)
    }
    return(
        <>
       <div className={styles1.page}>
       <header className={styles1.header}>
        <div className={styles1.names}>
            <div className={styles1.name} onClick={()=>{navigate('/')}}>Автоаукцион</div>
            <div className={styles1.username}>{user ?<><button className={styles1.exit} onClick={()=>{sessionStorage.removeItem("user");setUser(null)}}>Выйти</button>{user.name}</>  : <button onClick={()=>{navigate("/auth")}}>Войти</button>}</div>
        </div>
        </header>
        <div className={styles.headersize}></div>
        <div className={styles.lot}>
        <div className={styles.images}>
          <Images></Images>
        </div>
        <div className={styles.info}>
            <Info/>
        </div>
        {user && user.role==="admin" &&  <AdminMenu/>}
        </div>
        {message && <div className={styles.message}>{message}</div>}
        <footer className={styles1.footer}>
        </footer>
       </div>
        </>
    )
}