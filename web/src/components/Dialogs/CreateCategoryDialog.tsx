import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { Input } from "../Input";
import { useCategories } from "../../hooks/useCategories";
import Loading from "../Loading";

function CreateCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const { createCategory, isLoading } = useCategories();

  function handleCreate() {
    createCategory(name);
    setIsOpen(false);
  }
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger
        className="w-full rounded bg-blue-800 px-4 py-2 text-zinc-50 outline-none transition-colors duration-150 ease-in-out hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-200"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span>Criar categoria</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20">
          <Dialog.Content className="fixed inset-0 z-10 flex w-full flex-col overflow-hidden bg-pattern bg-cover text-zinc-100 outline-none md:inset-auto md:left-1/2 md:top-1/2 md:h-[60vh] md:max-w-[640px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md">
            <Dialog.Close className="roudend-md absolute right-0 top-0 bg-blue-900 p-1.5 text-blue-100 hover:text-red-600">
              <X className="size-5" onClick={() => setIsOpen(false)} />
            </Dialog.Close>
            <div className="flex flex-1 flex-col gap-3 p-5">
              {isLoading ? (
                <Loading />
              ) : (
                <form>
                  <Input.Root>
                    <Input.Content
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      label="Digite o nome da categoria"
                      placeholder="Ex: Prioridades"
                      type="text"
                    />
                  </Input.Root>
                </form>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleCreate()}
              className="group w-full bg-blue-950 py-4 text-center text-sm text-slate-300 outline-none"
            >
              <span className="text-zinc-100 group-hover:underline">Criar</span>
            </button>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default CreateCategory;
