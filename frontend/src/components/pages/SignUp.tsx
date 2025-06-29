import { useState } from "react";
import { Button } from "../Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  async function signup (){
    const res = await axios.post(BACKEND_URL+"/api/v1/signup", {
      email, username,password
    })
    console.log(res.status);
    if(res.status == 200) {
      alert('redirecting to signin page');
      navigate('/signin');
    }
    else if(res.status == 404){
      alert('space should not be present in username');
    }
    else{
      alert("user already exists with this username or email");
    }
  }
  return (
    <div className="min-h-screen bg-black/90 flex justify-center items-center">    
    <div className="bg-gray-900 flex flex-col rounded-lg border border-slate-600 py-4 px-5">
        <div className="text-3xl font-semibold text-white flex justify-center mt-2 mb-3">
            Sign Up
       </div>
        <span className="text-slate-100/80 font-light mb-1.5">Email</span>
        <input className="border mb-3 font-light text-lg border-slate-100 rounded-md focus:border-sky-400 text-white/90 focus:outline focus:outline-sky-400 pl-2 py-0.5 " onChange={(e)=> {
          setemail(e.target.value);
        }} type="email" />
        <span className="text-slate-100/80 font-light mb-1.5">Username</span>
        <input className="border mb-3 font-light text-lg border-slate-100 rounded-md focus:border-sky-400 text-white/90 focus:outline focus:outline-sky-400 pl-2 py-0.5 " onChange={(e) =>{
          setUsername(e.target.value);
          }
        }
         type="text" />
        <span className="text-slate-100/80 font-light mb-1.5">Password</span>
        <input className="
        border border-slate-100 text-lg rounded-md focus:border-sky-500 text-white/90 focus:outline focus:outline-sky-500 pl-1.5 py-0.5 mb-3" onChange={(e)=>{
          setpassword(e.target.value);
        }} type="password"/>
        <div className="w-full">
        <Button text="Submit" variants="light" onClick={signup} width="full" />
        <div className="flex items-center justify-center mt-2" >
          <div className="text-slate-100/80 mr-2">Already a user ? </div>
          <button className="text-purple-100 cursor-pointer hover:underline hover:text-purple-400 transition-all" onClick={()=>{
            navigate('/signin')
          }}>Signin</button>
        </div>
        </div>
    </div> 
    </div>
  )
}
