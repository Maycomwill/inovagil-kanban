import Loading from "./components/Loading";
import { AppProvider } from "./hooks";
import { useAuth } from "./hooks/useAuth";
import { AppProviderRoutes } from "./routes/app.routes";

function App() {
  const { isLoading } = useAuth();
  return (
    <AppProvider>{isLoading ? <Loading /> : <AppProviderRoutes />}</AppProvider>
  );
}

export default App;
