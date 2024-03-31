import * as Popover from "@radix-ui/react-popover";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import colors from "tailwindcss/colors";
import CreateCategory from "../Dialogs/CreateCategory";

function AddBtn() {
  const [isOpen, setIsOpen] = useState(false);
  function handleClosePopover() {
    setIsOpen(!isOpen);
  }
  return (
    <Popover.Root open={isOpen}>
      <Popover.Trigger asChild>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 left-10 z-10 text-emerald-600 hover:text-emerald-500 md:left-1/2"
        >
          <PlusCircle size={32} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <div className="absolute inset-0 z-0 bg-black/20">
          <Popover.Content className="relative rounded-md bg-zinc-200 px-8 py-6 pt-8  dark:bg-slate-700">
            <Popover.Close asChild>
              <X
                size={20}
                onClick={handleClosePopover}
                className="z-100 absolute right-2 top-2 text-red-600 hover:text-red-500"
              />
            </Popover.Close>
            <Popover.Arrow fill={colors.slate[700]} />
            <div className="flex flex-col space-y-4 text-zinc-900 dark:text-zinc-100">
              <CreateCategory />
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                type="button"
                className="w-full rounded bg-blue-800 px-4 py-2 text-zinc-50 outline-none transition-colors duration-150 ease-in-out hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-200"
              >
                Criar tarefa
              </button>
            </div>
          </Popover.Content>
        </div>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default AddBtn;
