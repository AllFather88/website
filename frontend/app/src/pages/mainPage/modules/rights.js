import React, { useContext, useState } from "react";
import { useEffect } from "react";
import styles from "./rights.module.css"
import { userContext } from "../../../App";
import { NewToken } from "../../authentication/auth";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RightsManagement(){
    const [message,setMessage] = useState("");
    const [user,setUser] = useContext(userContext)
    const [users,setUsers] = useState([])
    const [searchusers,setSearchUsers] = useState([])
    const navigate = useNavigate();
	const Request = async ()=>{
        let i = 5;
        while(--i){           
            try{
                const response = await fetch('http://localhost:8080/admin/users', { 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token "+ user.tokens.token,  
                }});
                if(!response.ok){
                    await NewToken(navigate,user,setUser)
                }
                else{
                    const data = await response.json()
                    setUsers(JSON.parse(JSON.stringify(data)))
                    console.log(JSON.stringify(data))
                    setSearchUsers(JSON.parse(JSON.stringify(data)))
                    setMessage('')
                    return
                }
            }catch(error){
                setMessage(error.message)
            }
        }
        navigate("/")
    }
    useEffect(()=>{
        Request()
    },[])
    const [word,setWord] = useState('')
    const Search = async ()=>{
        const filtered = users.filter(user=>user.name.startsWith(word))
        setSearchUsers(JSON.parse(JSON.stringify(filtered)))
    }
    useEffect(()=>{
        Search()
    },[users])
    const DeleteAccount = async (id)=>{
        let i = 10;
        while(--i){               
            try{
                const response = await fetch(`http://localhost:8080/admin/deluser/${id}`, { 
                    method: "POST",
                    headers: {
                        "Authorization": "Token "+ user.tokens.token,  
                    }});
                    if(!response.ok){
                        await NewToken(navigate,user,setUser)
                    }
                    else{
                        const js = await response.json()
                        console.log(JSON.stringify(js))
                        if(js === true){
                            const dl = users.filter((item)=>{ return(item.id !== id)})
                            setUsers(dl)
                        }
                        return
                    }
            }catch(error){
                console.log(error.message)
            }
        }
    }
    const ChangeOfRights = async (id)=>{
        let i = 10;
        while(--i){      
            try{
                const response = await fetch(`http://localhost:8080/admin/change/${id}`, { 
                    method: "POST",
                    headers: {
                        "Authorization": "Token "+ user.tokens.token,  
                    }});
                    if(response.status === 401 || response.status === 403){
                        await NewToken(navigate,user,setUser)
                    }
                    else{
                        const js = await response.json()
                        if(js === true){
                            console.log(JSON.stringify(users[1]))
                            const nw = users.map((item,index)=>{
                                
                                return (item.id === id ? { ...item, role: item.role === "admin" ? "user" : "admin" } : item)
                            })  
                            setUsers(nw)
                        }
                        return
                    }
                  
            }catch(error){
                console.log(error.message)
                return
            }
        }
    }
    return(
        <div className={styles.page}>
             <div className={styles.search}><input type="search" onChange={(event)=>{ setWord(event.target.value)}}></input> <button onClick={Search}>🔍︎</button></div>
            <div className={styles.field}>
			{searchusers.map((item,index)=>(
                <div id={item.id} className={styles.user}>
                    <div className={styles.name}>Login: {item.name}</div>
                     <div  className={styles.role} >Роль: {item.role}</div>
                    <div  className={styles.number}>Номер: {item.phone_number || "отсутствует"}</div>
                    <div  className={styles.email}>Почта: {item.email || "отсутствует"}</div>
                   {item.name !== 'user' && ( <div className={styles.buttons}>
                         <button onClick={()=>{DeleteAccount(item.id)}}>Удалить акаунт</button>
                        <button onClick={()=>{ChangeOfRights(item.id)}}>{item.role === 'user' ? 'Дать права админа' : 'Лишить прав админа'}</button>
                    </div>)}
                </div>))}
            </div>
        </div>
    )
}

