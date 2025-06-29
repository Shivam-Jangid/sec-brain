import type { ReactElement } from "react";

interface ButtonProps{
    variants:'light' | 'dark',
    text:string,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    onClick: () => void;
    width?:"full" | "auto";
    loading?:true|false;
}
const variantStyles = {
    "light":"bg-rose-500 text-white shadow-lg transition duration-200 hover:bg-purple-500 focus:border-2 focus:border-white ",
    "dark":"bg-black text-white shadow-lg border border-white transition duration-200 hover:bg-slate-700"
}
export const Button = (props:ButtonProps) => {
    return <button className={`flex p-2.5 rounded-lg  mt-3 justify-center gap-2.5 ease-in-out shadow-lg cursor-${props.loading == true?"not-allowed":"pointer"} items-center ${variantStyles[props.variants]} w-${props.width} `} onClick={props.onClick}>
        {props.startIcon}
{props.text}
    </button>
}
interface simpleButtonProps {
    variant:"light"|"dark",
    text:string,
    onclick:()=>void;
}
const simpleButtonVal = {
    "light":"bg-white text-black border-2 hover:bg-slate-200",
    "dark":"bg-black text-white hover:bg-slate-700"
}
export function SimpleButtons(props:simpleButtonProps){
    return <button onClick={props.onclick} className={`${simpleButtonVal[props.variant]} px-4 py-1 transition-all rounded-md cursor-pointer `}>
        {props.text}
    </button>
}