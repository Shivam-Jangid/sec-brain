import type { ReactElement } from "react";

export interface ButtonProps{
    variants:'primary' | 'secondary',
    size:'sm'|'md'|'lg',
    text:string,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    onClick: () => void;
}
const variantStyles = {
    "primary":"bg-pur-600 text-pur-300",
    "secondary":"bg-pur-300 text-pur-500"
}
const sizeStyles = {
    "sm":"p-2 rounded-sm",
    "md":"px-4 py-2 rounded-md",
    "lg":"px-6 py-2 rounded-lg"
}
export const Button = (props:ButtonProps) => {
    return <button className={`flex transition-all justify-center items-center w-full gap-2 cursor-pointer lg:w-auto lg:pr-3 ${variantStyles[props.variants]} ${sizeStyles[props.size]}`} >
        {props.startIcon}
{props.text}
    </button>

}



