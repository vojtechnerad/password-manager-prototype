import "./App.css";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Provider>
      <Dashboard />
      <Toaster />
    </Provider>
  );
}

export default App;
