import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin">
        <Loader2
          size={64}
          className="animate-pulse text-blue-500 dark:text-zinc-100"
        />
      </div>
    </div>
  );
}

export default Loading;
