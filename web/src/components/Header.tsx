import { useAuth } from "../hooks/useAuth";
import { UserData } from "../interfaces/User";

function Header({ user }: { user: UserData }) {
  const { logout } = useAuth();
  function handleLogout() {
    logout();
  }
  return (
    <div className="bg-fit flex h-28 max-h-28 w-full flex-1 flex-row items-center justify-between bg-pattern pb-8">
      <div className="-mt-6 pl-4 md:-mt-0 md:pl-12">
        <span className="h-full select-none text-2xl font-bold text-zinc-100">
          Kan<span className="-mt-4 text-yellow-500">Ban</span>
        </span>
      </div>
      <div className="group mr-4 mt-2 flex flex-col items-center justify-center space-y-1 text-center md:mr-12 md:mt-8">
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
