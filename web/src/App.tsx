import Loading from "./components/Loading";
import { AppProvider } from "./hooks";
import { useAuth } from "./hooks/useAuth";
import { AppProviderRoutes } from "./routes/app.routes";

function App() {
  const { isLoading } = useAuth();
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-slate-900 dark:text-zinc-100 text-base">
      <AppProvider>
        {isLoading ? <Loading /> : <AppProviderRoutes />}
      </AppProvider>
    </div>
  );
}

export default App;
