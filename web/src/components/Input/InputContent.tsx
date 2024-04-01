import { InputHTMLAttributes } from "react";

interface InputContentProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "email" | "password";
  id: string;
  placeholder?: string;
  label: string
}
function InputContent({ type, id, label, placeholder = "", ...rest }: InputContentProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        autoComplete="false"
        className="w-full rounded border-none bg-zinc-300 py-2 pl-2 text-zinc-900 outline-none placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:bg-slate-700 dark:text-zinc-50"
        type={type}
        id={id}
        placeholder={placeholder}
        {...rest}
      />
    </>
  );
}

export default InputContent;
