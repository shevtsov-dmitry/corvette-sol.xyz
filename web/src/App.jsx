import { NavBar } from "./components/NavBar/NavBar";
import { WelcomePage } from "./components/WelcomePage/WelcomePage";

function App() {
  return (
    <main className="min-w-dvw min-h-dvh bg-[#2E2E2E]">
      <NavBar />
      <WelcomePage />
    </main>
  );
}

export default App;
