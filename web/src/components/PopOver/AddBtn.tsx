import * as Popover from "@radix-ui/react-popover";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import CreateCategory from "../Dialogs/CreateCategoryDialog";
import CreateTask from "../Dialogs/CreateTaskDialog";

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
          className="fixed bottom-6 z-10 text-emerald-600 hover:text-emerald-500 md:left-10"
        >
          <PlusCircle size={32} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <div className="absolute inset-0 z-0 bg-black/20">
          <Popover.Content className="relative rounded-md bg-zinc-200 px-8 py-6 pt-8  dark:bg-slate-800">
            <Popover.Close asChild>
              <X
                size={20}
                onClick={handleClosePopover}
                className="z-100 absolute right-2 top-2 text-red-600 hover:text-red-500"
              />
            </Popover.Close>
            <Popover.Arrow className="fill-zinc-200 dark:fill-slate-800" />
            <div className="flex w-full flex-col items-center justify-start space-y-4 text-zinc-900 dark:text-zinc-100">
              <CreateCategory />
              <CreateTask />
            </div>
          </Popover.Content>
        </div>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default AddBtn;
