import { Tasks } from "../interfaces/Tasks";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

function TaskCard({task}:{task: Tasks}) {
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center rounded bg-zinc-400 py-4 opacity-100 transition-colors duration-150 ease-in-out selection:bg-zinc-100 hover:cursor-pointer hover:bg-zinc-400/70 dark:bg-slate-800 dark:selection:bg-slate-300 dark:selection:text-slate-900 dark:hover:bg-slate-700">
      <span>{task.name}</span>
      <span className="pt-6 text-xs text-zinc-700 dark:text-zinc-300">
        Atualizada em:{" "}
        {formatDistanceToNow(task.updatedAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </span>
    </div>
  );
}

export default TaskCard;
