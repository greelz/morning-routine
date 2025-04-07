import {DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes} from "react";

interface IButtonProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  caption: string;
  type?: HTMLInputTypeAttribute;
}

export default function Button(props: IButtonProps) {
  return <input
    {...props}
    type={props.type || "button"}
    value={props.caption}
    className={`rounded px-4 py-2 bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-500 ${props.className} `}
  />
}
