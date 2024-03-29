import { Loader2 } from "lucide-react";
import colors from "tailwindcss/colors";

function Loading() {
  return (
    <div className="animate-spin">
      <div className="animate-pulse">
        <Loader2 size={32} color={colors.emerald[500]} />
      </div>
    </div>
  );
}

export default Loading;
