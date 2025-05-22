import React, { useContext, useState } from "react";
import styles from "./add.module.css"
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { NewToken } from "../../authentication/auth";
import { userContext } from "../../../App";

export default function Add(){
    const navigate = useNavigate()
    const [user,setUser] = useContext(userContext)
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        let i = 100
        while(--i){
            try{
                const response = await fetch("http://localhost:8080/admin/addlot", { 
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": "Token "+ user.tokens.token, 
                    }
                });
                if(!response.ok){
                  await NewToken(navigate,user,setUser)
                }
                else{
                    event.target.reset();
                    return
                }
            }catch(error){
                console.log(error)
            }
        }
    };
    const [date, setDate] = useState("");
    const handleChange = (event) => {
        setDate(event.target.value);
    };
    useEffect(() => {
        const tomorrowUTC = new Date();
        tomorrowUTC.setUTCDate(tomorrowUTC.getUTCDate() + 1);
        console.log(tomorrowUTC.getUTCDate())
        const formattedStartUTC = tomorrowUTC.toISOString().slice(0, 16);
        const startInput = document.getElementById("startDatetime");
        const endInput = document.getElementById("endDatetime");
        if (startInput) {
            startInput.min = formattedStartUTC;
        }
        if(date){
            const UTC = new Date(date);
            UTC.setUTCDate(UTC.getUTCDate() + 1);
            const endUTC = UTC.toISOString().slice(0, 16);
            endInput.min = endUTC;
        }
    }, [date]);
    return(
        <>
        <form className={styles.add} enctype="multipart/form-data" onSubmit={handleSubmit} >
            <input type="file" name="file" multiple></input>
            <input placeholder="Марка" name="brand" type="search"></input>
            <input placeholder="Модель" name="model" type="search"></input>
            <input placeholder="Год выпуска" name="year" type="text"></input>
            <textarea name="description" maxlength="300" rows="5" cols="40" placeholder="Описание"></textarea>
            <input placeholder="Начальная цена" name="starting_price" type="text"></input>
            <input type="datetime-local" onChange={handleChange} id="startDatetime" name="start"></input>
            <input type="datetime-local"  id="endDatetime" name="end"></input>
            <button >Добавить</button>
        </form>
        </>
    )

}
