import { ReactNode } from "react";

interface InputIconProps {
  icon: ReactNode;
}
function InputIcon({ icon }: InputIconProps) {
  return <>{icon}</>;
}

export default InputIcon;
