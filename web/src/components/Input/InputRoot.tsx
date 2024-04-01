import { ReactNode } from "react";

function InputRoot({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex w-full flex-col items-start justify-center space-y-2">
      {children}
    </div>
  );
}

export default InputRoot;
