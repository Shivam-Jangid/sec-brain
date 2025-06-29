import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";
export default function generateContent() {
    const [content, setContent] = useState([]);
    useEffect(()=>{
        try{
        axios.get(`${BACKEND_URL}/api/v1/content`, {headers:{
            "Authorization":localStorage.getItem('token')
            }}).then((res)=>{
                const data = res.data.Data;
                setContent(data);
            })
        }
        catch(err){
            console.log(err);
        }
    }, [])
  return content;
}
