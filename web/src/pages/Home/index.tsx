import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import Loading from "../../components/Loading";

import { useCategories } from "../../hooks/useCategories";

function Home() {
  const { logout } = useAuth();
  const { getUserData, data } = useUser();
  const { getCategories, categories } = useCategories();
  const id = localStorage.getItem("userData");

  useEffect(() => {
    getUserData();
    if (id !== null) {
      getCategories(id);
    }
  }, []);
  function handleLogout() {
    logout();
  }

  if (data === undefined || categories === undefined) {
    return <Loading />;
  }
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start px-4">
      <div className="mb-12 flex w-full justify-between px-2 py-4">
        <p>
          Olá <span>{data.name}</span>
        </p>
        <button onClick={handleLogout}>Sair</button>
      </div>

      <section className="flex w-[80%] items-center justify-center"></section>
    </div>
  );
}

export default Home;
