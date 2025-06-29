import { PlusIcon } from "../StartIcons";
import { useEffect, useState} from "react";
import { Button } from "../Button";
import NotesCard from "../Cards/NotesCard";
import AddContentPopUp from "../Addcontent";
import { useNavigate } from "react-router-dom";
import generateContent from "../Hooks/generateContent";
import LinkCards from "../Cards/LinkCards";
import LogOutPopUp from "../LogOutPopUp";

interface contentProps {
  _id:any;
  type:"video"|"post"|"note";
  title:string;
  description:string;
  tags?:string[],
  link:string;
  userId:{
    username:string;
    userId:any;
  }
}
export default function Dashboard() {
  const [isVisible, setisVisible] = useState("invisible");
  const [addvis, setaddvis] = useState("invisible");
  const content = generateContent();
  const navigate = useNavigate();
  useEffect (()=> {
    const token = localStorage.getItem("token");
    if(!token){
      navigate('/signup');
      console.log(token)
    }
    if(token == undefined){
      navigate('/signin')
    }
  }, [])
  console.log(content)
  return (
    <>
      <div className="bg-slate-950 min-h-screen relative font-poppins">
        <LogOutPopUp
          visible={isVisible}
          setisVisible={() => {
            setisVisible("invisible");
          }}
        />
        <AddContentPopUp  visible={addvis} setadvis={()=> {setaddvis("invisible")}}/>
        <div className="flex h-full">
          <div className="h-full flex-1 ">
            <div className=" h-24 flex items-center  justify-between">
              <span className="ml-10 text-3xl text-white font-mono tracking-tighter">
                All Neurons
              </span>
              <div className="flex gap-4 mr-5 ">
                <Button
                  variants="light"
                  text="Add Content"
                  startIcon={<PlusIcon size="md" />}
                  onClick={() => {
                    setaddvis("visible")
                    console.log("onclick handler been called");
                  }}
                ></Button>
                <Button
                  variants="dark"
                  text="Sign Out"
                  onClick={() => {
                    setisVisible("visible");
                    console.log("share onclick");
                  }}
                ></Button>
                
              </div>
            </div>
            <div className="mx-30 pb-10">
              <div className="flex flex-wrap gap-20 mt-10">
                {content.map((item:contentProps) =>
                  item.type === "note" ? (
                    <NotesCard
                      key={item._id}
                      title = {item.title}
                      description={item.description}
                      username = {item.userId.username}
                      _id={item._id}
                    />
                  ) : (
                    <LinkCards
                      key={item._id} //  Add key here too
                      type={item.type}
                      title={item.title}
                      description={item.description}
                      linkcomponent={item.link}
                      tags={item.tags}
                      _id={item._id}
                      username={item.userId.username}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


