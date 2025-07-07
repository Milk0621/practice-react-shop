import axios from "axios";
import { useEffect, useState } from "react";

export function useUsername(){
    let [username, setUsername] = useState('');
    useEffect(()=>{
        axios.get('/username.json').then((a)=>{
            setUsername(a.data)
        })
    }, [])
    return username;
}