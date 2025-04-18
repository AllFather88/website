import React, { useState } from "react";
import styles from "./notifications.module.css"
export default function Notifications(){
	const [notif,setNotif] = useState(["привет","gggg","bbbbbbbbbbffffffffffffffffffvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"]);
    return(
        <div className={styles.field}>
			{notif.map((item,index)=>(<div id={index} className={styles.notification}>{item}</div>))}
        </div>
    )
}

