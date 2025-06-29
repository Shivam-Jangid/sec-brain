import axios from "axios";
import { DeleteIcon, NotesIcons } from "../Icons";
import { BACKEND_URL } from "../../config";
interface NotesCardProps {
  title: string;
  description: string;
  username:string;
  _id:string;
}
export default function NotesCard(props: NotesCardProps){
  const contentId = props._id;
  return (
    <div>
      <div className="cardsInterface shadow-c">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="opacity-60">
              <NotesIcons size={"4"} />
            </div>
            <div className="text-lg">{props.title}</div>
            <div></div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={async ()=>{
              try {
                const res =  await axios.delete(`${BACKEND_URL}/api/v1/content`,{
            headers:{
              Authorization:localStorage.getItem('token')
            },
            data : {
              contentId
            }
           },);
           if(res.status == 200){
            window.location.reload();
           }
              } catch (error) {
                alert('Server Error Occured')
              }
            }} className="cursor-pointer rounded hover:bg-slate-300 p-1.5">
              <DeleteIcon size="5" />
            </button>
          </div>
        </div>
        <div className="font-light text-sm mt-4 pl-3.5">
          {props.description}
        </div>
        {/* <div className=" mt-4">
          {tags.map((tag) => (
            <span className="tags">{`# ${tag}`}</span>
          ))}
        </div> */}
      </div>
    </div>
  );
}