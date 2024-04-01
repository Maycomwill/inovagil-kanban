import { useAuth } from "../hooks/useAuth";
import { UserData } from "../interfaces/User";

function Header({ user }: { user: UserData }) {
  const { logout } = useAuth();
  function handleLogout() {
    logout();
  }
  return (
    // <div className="bg-pattern mb-4 flex min-h-28 w-full items-center justify-between px-12 py-4 text-zinc-100">
    //   <div className="-mt-8 flex w-full items-center justify-between">
    //     <p className="text-2xl font-bold">
    //       Kan<span className="text-yellow-500">Ban</span>
    //     </p>
    //     <div className="group mt-8 flex flex-col items-center justify-center  space-y-1 text-center hover:cursor-pointer">
    //       <div className="w-full items-center justify-center text-center">
    //         <span className="text-xl font-bold capitalize text-zinc-100">
    //           {user.name.split(" ")[0]}
    //         </span>
    //       </div>
    //       <div className="invisible w-full transition duration-150 ease-in-out group-hover:visible">
    //         <button
    //           className="w-full rounded-md bg-blue-900 py-1 text-zinc-100 transition-all duration-200  ease-in-out hover:bg-blue-950 hover:ring-1 hover:ring-blue-500"
    //           onClick={handleLogout}
    //         >
    //           Sair
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-fit flex h-28 max-h-28 w-full flex-1 flex-row items-center justify-between bg-pattern pb-8">
      <div className="pl-4 md:pl-12">
        <span className="select-none text-2xl font-bold text-zinc-100">
          Kan<span className="text-yellow-500">Ban</span>
        </span>
      </div>
      <div className="group mr-4 md:mt-8 mt-2 flex flex-col items-center justify-center space-y-1 text-center md:mr-12">
        <div className="w-full items-center justify-center text-center">
          <span className="text-xl font-bold capitalize text-zinc-100">
            {user.name.split(" ")[0]}
          </span>
        </div>
        <div className="invisible w-full transition duration-150 ease-in-out group-hover:visible">
          <button
            className="z-100 w-full rounded-md bg-blue-900 py-1 text-zinc-100 transition-all duration-200  ease-in-out hover:bg-blue-950 hover:ring-1 hover:ring-blue-500"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
