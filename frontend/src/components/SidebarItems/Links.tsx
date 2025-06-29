import type { ReactElement } from "react";

interface linkprops {
    type:"Videos" | "Posts" |"Notes";
    icon:ReactElement
    fill?:string;
    link?:string;
    onclick?:() => void;
}


export default function Links(props:linkprops) {
    const type = props.type;
  return (
    <div className="flex mr-2 items-center gap-4 hover:bg-slate-900 rounded-lg p-2">
        <div>
            {props.icon}
        </div>
        <div className="text-lg font-mono text-slate-100/90 cursor-pointer">
      {type}
        </div>
    </div>
  )
}
