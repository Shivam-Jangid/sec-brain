import { LinkedIcon, NotesIcons, VideoIcon } from "./Icons";
import Links from "./SidebarItems/Links";


export default function Sidebar() {
  return (
    <div className="w-72 bg-black border-r border-slate-600/80">
      <div className="text-white text-3xl font-semibold flex justify-center mt-10">
      ELEMENTS
      </div>
      <div className="mt-10 ml-4 flex flex-col gap-4">
        <Links type="Videos" icon={<VideoIcon size="6" fill="white"/>} />
        <Links type="Posts" icon={<LinkedIcon size="16" fill="white"/>} />
        <Links type="Notes" icon={<NotesIcons size="6" fill="white"/>} />
      </div>
    </div>
  )
}
