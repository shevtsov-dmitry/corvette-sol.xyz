import { NavBar } from "./components/NavBar";
import { WelcomePage } from "./components/WelcomePage";

function App() {
  return (
    <main className="min-w-dvw min-h-dvh bg-custom-main-dark-gray">
      <NavBar />
      <WelcomePage />
    </main>
  );
}

export default App;
