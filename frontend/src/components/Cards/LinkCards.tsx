import axios from "axios";
import { DeleteIcon, LinkedIcon, VideoIcon } from "../Icons";
import { BACKEND_URL } from "../../config";
type CardType = 'post'|'video';
interface LinkCardProps {
  type:CardType;
  title: string;
  description: string;
  tags?: string[];
  linkcomponent: string;
  username:string;
  _id:string
}
interface linkProps {
  link:string
}
function RenderPost (props:linkProps){
  const link = props.link;
  return <iframe src={link} height="100%" width="100%" allowFullScreen title="Embedded post" frameBorder="0">
  </iframe>
}

function RenderLink (props:linkProps){
  const linkEmbed = props.link.replace('youtu.be', 'www.youtube.com/embed').replace('feature=shared', '');
  return <iframe width="100%" height="100%" src={linkEmbed} frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen >
  </iframe>
}
export default function LinkCards(props: LinkCardProps) {
  const tags = props.tags;
  const type = props.type;
  const contentId = props._id;
  return (
    <div className="cardsInterface">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="opacity-70">
            {type == 'post'?<LinkedIcon size="19" />:<VideoIcon size="4" />}
          </div>
          <div className="font-normal text-lg ">{props.title}</div>
        </div>
        <div className="flex gap-3 opacity-70">
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
            alert('Server Error Occured');
           }
           
          }} className="cursor-pointer rounded hover:bg-slate-300 p-1.5"><DeleteIcon size="5" /></button>
        </div>
      </div>
      <div>
        {type == "video"?<RenderLink link={props.linkcomponent}/>:<RenderPost link={props.linkcomponent}/>}
      </div>
      <div className="text-center mt-3 text-slate-800/90">
        {props.description}
      </div>
      {tags && <div className="mt-4">
        {tags.map((tag) => (
          <span className="tags">{`# ${tag}`}</span>
        ))}
      </div>}
      <div className="flex justify-end text-sm text-slate-600/90">
        ~{props.username}
      </div>
    </div>
  );
}