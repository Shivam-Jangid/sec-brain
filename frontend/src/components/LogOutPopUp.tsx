import { useNavigate } from "react-router-dom"
import { Button } from "./Button"
import { CrossIcon } from "./Icons"
interface SharePopUpProps{
    visible:string,
    setisVisible:()=>void
}

export default function LogOutPopUp(props:SharePopUpProps){
const navigate = useNavigate();
    return (<div className={`${props.visible} w-screen bg-gray-600/60 h-full absolute top-0 left-0 z-10 flex justify-center items-center`}>
        <div className="bg-white py-2 px-4 rounded-3xl max-w-90">
            <div className="flex justify-end">
                <button onClick={props.setisVisible} className="cursor-pointer"
                ><CrossIcon /></button>
            </div>
            <div>
                <div className="flex justify-center text-2xl font-semibold mb-4">
                    Log Out
                </div>
                <div className="text-slate-800/70">
                    Sign out of your brain and let the real brain think ...
                </div>
                <div className="flex justify-center mb-4 mt-2">
                    <Button variants="light" text="Sign Out" onClick={() =>{localStorage.clear();navigate('/signin') }} width="full" />
                </div>
            </div>
        </div>
    </div>
    )
}