// import { Button } from "./Button"
import { useRef, useState } from "react"
import { CrossIcon } from "./Icons"
import { SimpleButtons } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
interface AddContentPopUpProps{
    visible:string,
    setadvis:()=>void
}
const ContentType  = {
    Video :"video",
    Post : "post",
    Note : "note"
}
export default function AddContentPopUp(props:AddContentPopUpProps){
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type,setTypes] = useState(ContentType.Video);
    async function AddData (){
        const title = titleRef.current?.value;
        const description = descriptionRef.current?.value;
        const link = linkRef.current?.value;
        console.log(type);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/content`,{
            title,description,link,tags:[],type
        },{
            headers:{
                "Authorization":localStorage.getItem('token')
            }
        });
        if(response.status == 200){
            alert('Content has been added');
            window.location.reload();
            props.setadvis();
        }
        } catch (error) {
            console.log(error)
            alert('Server error Ocurred, Try again later');
       }
        
    }

    return (<div className={`${props.visible} w-screen bg-gray-600/60 h-full absolute top-0 left-0 z-10 flex justify-center items-center`}>
        <div className="bg-white py-2 px-4 rounded-3xl max-w-90">
            <div className="flex justify-end">
                <button onClick={props.setadvis} className="cursor-pointer"
                ><CrossIcon /></button>                 
            </div>
                <div>
                    <div className="mb-4">
                        <div className="text-slate-700/80">Title</div>
                        <input type="text" className="input" ref = {titleRef}/>
                    </div>
                    <div>
                       <span className="text-slate-700/80">Description</span> 
                       <textarea ref={descriptionRef} className="input"/>
                    </div>
                    <div className="mt-2">
                        <div className=" text-2xl mb-2 font-semibold font-poppins
                        ">Type</div>
                        <div className="flex gap-3">
                        <SimpleButtons text="Video" onclick={()=>{
                            setTypes(ContentType.Video);
                        }} 
                            variant={type == "video"?"light":"dark"}/>
                        <SimpleButtons text="Post" onclick={()=>{
                            setTypes(ContentType.Post)
                            console.log(type);
                            }} variant={type == "post"?"light":"dark"}/>
                        <SimpleButtons text="Note" onclick={()=>{
                        setTypes(ContentType.Note);
                        console.log(type);
                        }} variant={type == "note"?"light":"dark"}/>
                        </div>
                    </div>
                    <div className= "mt-2 mb-1">
                        <div>Share the link</div>
                        <input type="text" className="input" ref = {linkRef}/>
                    </div>
                    <div>
                        {type == 'post' &&<div className="text-slate-800/80 mt-4 mb-1">Take the following steps to add linkedin Post:
                        <ul className="list-disc ml-3">
                            <li>Click on Embed Post</li>
                            <li>Click on copy the link written src link which is  = "https://www.linkedin.com/embed/..."</li>
                            <li>Add this link</li>
                        </ul>
                        </div>
                        }         
                    </div>
                    <div className="my-2">
                        <button className="bg-black transition-all text-white text-lg font-mono w-full px-4 rounded-xl py-2 cursor-pointer hover:bg-white hover:border-2 hover:text-black" onClick={AddData}>
                            Add Content
                        </button>
                    </div>
                </div>
            
        </div>
    </div>
    )
}