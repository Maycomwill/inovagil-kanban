import { ReactNode } from "react"

function SelectRoot({children}: {children: ReactNode}) {
  return (
    <div className="w-full">{children}</div>
  )
}

export default SelectRoot