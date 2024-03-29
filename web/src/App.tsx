import { AppProvider } from "./hooks";
import { AppProviderRoutes } from "./routes/app.routes";

function App() {
  return (
    <AppProvider>
      <AppProviderRoutes />
    </AppProvider>
  );
}

export default App;
