import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";

function DeleteCategory({ categoryId }: { categoryId: string }) {
  const [open, setOpen] = useState(false);
  const { deleteCategory } = useCategories();
  function handleDeleteCategory() {
    deleteCategory(categoryId);
  }
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Trigger
        asChild
        onClick={() => {
          setOpen(true);
        }}
      >
        <Trash2
          className="invisible absolute right-4 top-4 rounded-full p-2 text-red-600 transition-colors duration-150 ease-in-out hover:text-red-500 hover:ring-1 hover:ring-red-500 group-hover:visible"
          size={32}
        />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/20">
          <AlertDialog.Content className="fixed inset-0 z-10 flex w-full flex-col overflow-hidden bg-pattern bg-cover text-zinc-50 outline-none md:inset-auto md:left-1/2 md:top-1/2 md:h-auto md:w-[480px] md:max-w-[640px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md md:px-4 md:py-8">
            <AlertDialog.Title className="text-xl font-bold">
              Tem certeza?
            </AlertDialog.Title>
            <AlertDialog.Description className="py-4 pb-12 text-zinc-200">
              Essa ação é irreversível, e todas as tarefas dessa categoria serão
              deletadas simultaneamente
            </AlertDialog.Description>
            <div className="flex items-center justify-end space-x-12">
              <AlertDialog.Cancel asChild onClick={() => setOpen(false)}>
                <button className="w-auto rounded bg-slate-200 px-4 py-2 text-zinc-800 outline-none transition-colors duration-150 ease-in-out hover:bg-slate-400 focus-visible:ring-2 focus-visible:ring-slate-900 ">
                  Cancelar
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild onClick={handleDeleteCategory}>
                <button className="w-auto rounded bg-red-200 px-4 py-2 font-bold text-red-600 outline-none transition-colors duration-150 ease-in-out hover:bg-red-300 focus-visible:ring-2 focus-visible:ring-red-800 ">
                  Sim, deletar categoria
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default DeleteCategory;
