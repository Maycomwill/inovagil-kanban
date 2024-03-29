import { useAuth } from "../../hooks/useAuth";

function Home() {
  const { logout } = useAuth();
  function handleLogout() {
    logout();
  }
  return (
    <div>
      <span>home</span>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Home;
