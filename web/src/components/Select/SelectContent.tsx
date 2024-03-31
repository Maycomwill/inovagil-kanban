import { SelectHTMLAttributes } from "react";
import { Category } from "../../interfaces/Categories";

interface SelectContentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Category[];
}

function SelectContent({ options, ...props }: SelectContentProps) {
  return (
    <select
      className="w-full rounded border-none bg-zinc-300 py-2 pl-2 text-zinc-900 outline-none placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:bg-slate-700 dark:text-zinc-50"
      {...props}
    >
      <option value="" disabled></option>
      <optgroup label="Categorias">
        {options.map((option: Category) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </optgroup>
      <option value="" disabled></option>
    </select>
  );
}

export default SelectContent;
