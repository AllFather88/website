import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate  } from "react-router-dom";
import styles from "./cars.module.css"
import foto1 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/q.jpg"
import foto2 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/x.jpg"
import foto3 from "C:/Users/user/Desktop/website/website/frontend/app/src/pages/mainPage/modules/main.jpg"
import { userContext } from "../../../App";

export default function Cars(){
    const x = [foto1,foto2,foto3];
    const [flots,setfLots] = useState([])
    const [lots,setLots] = useState([])
    const [filter,setFilter] = useState({
        brands:[],
        models:[],
        years:[],
        maxprice: 0,
        minprice: 0,
    })
    const [message,setMessage] = useState('')
    const extractFilters = (data) => {
        return data.reduce((acc, lot) => {
            acc.brands.add(lot.brand);
            acc.models.add(lot.model);
            acc.years.add(lot.year);
            acc.minprice = acc.minprice ? Math.min(acc.minprice, lot.bid) : lot.bid;
            acc.maxprice = acc.maxprice ? Math.max(acc.maxprice, lot.bid) : lot.bid;
            return acc;
        }, { brands: new Set(), models: new Set(), years: new Set(), minprice: null, maxprice: null });
    };
    const request = async () => {
        let response = {}
        try{
            response = await fetch("http://localhost:8080/public/getall");
        }catch(error){
            setMessage(error.message)
            return;
        }
        let data = await response.json();
        if (response.ok) {
            const promises = data.map(async (lot) => {
                const imageResponse = await fetch(`http://localhost:8080/public/image/${Number(lot.id)}`);
                if (!imageResponse.ok) {
                    console.log(`Изображение для ${lot.id} не найдено`);
                    return { ...lot, url: null };
                }
                const blob = await imageResponse.blob();
                const url = URL.createObjectURL(blob);
                return { ...lot, url }; 
            });
            data = await Promise.all(promises);
            setLots(data);
            setfLots(data);
            const filterData = extractFilters(data);
            setFilter({
                brands: [...filterData.brands], 
                models: [...filterData.models],
                years: [...filterData.years],
                minprice: filterData.minprice,
                maxprice: filterData.maxprice
            });
        } else {
            alert("Ошибка");
        }
    };
    useEffect(()=>{
        request()
    },[])
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [inSale, setInSale] = useState(false);
    const [over, setOver] = useState(false);
    const [before, setBefore] = useState(false);
    const [range,setRange] = useState({from: 0, to:12,page:1})
    const handleFilter = ()=>{
        const filtered = flots.filter(lot => {
            const currentDate = new Date();
            const endDate = new Date(lot.end);
            const startDate = new Date(lot.start)
            return (
                (selectedBrand === "" || lot.brand === selectedBrand) &&
                (selectedModel === "" || lot.model === selectedModel) &&
                (lot.bid >= minPrice) &&
                (lot.bid <= maxPrice || maxPrice === 0) &&
                ( (!inSale && !over && !before) 
                ||  (over && endDate < currentDate)
                ||  (before && startDate > currentDate) 
                || (inSale &&  endDate > currentDate && startDate < currentDate)
            )
            );
            setRange({from: 0, to:12,page:1})
        });
        setLots(filtered)
    }
  
    const changePage = (number)=>{
        const newRenge = {from: range.from+number, to:range.to+number,page:range.page+(number/12)}
        if(newRenge.from >= 0 && newRenge.to - 12 < lots.length){
            setRange(newRenge)
            window.scrollTo({ top: 400, behavior: "smooth" });
        }
    }
    return(
        <>
        <div className={styles.all}>
        <h2 className={styles.fil}>Фильтр</h2>
        <div className={styles.filter}>
        <select className={styles.brand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">Выберите марку</option>
            {filter.brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
            ))}
        </select>
        <select className={styles.model} onChange={(e) => setSelectedModel(e.target.value)}>
            <option value="">Выберите модель</option>
            {filter.models.map((model) => (
                <option key={model} value={model}>{model}</option>
            ))}
        </select>
        <input className={styles.min} type="number" placeholder="Мин. цена" min="0" onChange={(e) => setMinPrice(Number(e.target.value))} />
        <input className={styles.max} type="number" placeholder="Макс. цена" min="0" onChange={(e) => setMaxPrice(Number(e.target.value))} />
        <label>
            <input className={styles.insale} type="checkbox" onChange={(e) => setInSale(e.target.checked)} /> В торгах
        </label>
        <label>
            <input className={styles.over} type="checkbox" onChange={(e) => setOver(e.target.checked)} /> Торги окончены
        </label>
        <label>
            <input className={styles.before} type="checkbox" onChange={(e) => setBefore(e.target.checked)} /> Перед торгами
        </label>
        <button onClick={handleFilter}>Принять</button>
    </div>
        <div className={styles.cars}>
        {message && <div className={styles.message}>{message}</div>}
        {lots.slice(range.from,range.to).map((lot,index)=>{
           return( <Lot key={lot.id} lot={lot} index={index}/>)
        })}

        <div className={styles.wrapper}>
             <div className={styles.controls}>
                {range.from !=0 &&   <button onClick={()=>changePage(-12)}>&#x2190;</button>}
                <div>{range.page}</div>
                {range.to < lots.length &&  <button onClick={()=>changePage(12)}>&#x2192;</button>}
            </div>
        </div>
        </div>
        </div>
        </>
    )
}
export const Lot = ({lot,index})=>{
     const [user,setUser] = useContext(userContext)
    const navigate = useNavigate();
    const [status,SetStatus] = useState("")
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
        SetStatus( `До конца торгов: ${hours || 0}ч ${minutes || 0}м ${seconds || 0}с`)            
    }
    useEffect(()=>{
        const interval = setInterval(Status, 1000); 
        return (() => clearInterval(interval))
    },[]);
    return (
       <div id={lot.id} onClick={()=>{navigate(`/lot/${lot.id}`)}} className={styles.car}>
        <div className={styles.img}><img src={lot.url || foto2}/></div>
        <div className={styles.inf}>
        <div className={styles.brand}>Марка: {lot.brand}</div>
        <div className={styles.model}>Модель: {lot.model}</div>
        <div className={styles.year}>{lot.year} год</div>
        <div className={styles.max}>Текущая ставка: {lot.bid}${user && user.name && lot.highest_bidder === user.name && "(Ваша ставка)"}</div>
        <div  className={styles.status} >{status}</div>
        </div>
    </div>
   )
}