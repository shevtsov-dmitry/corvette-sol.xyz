import { NavBar } from "./components/NavBar/NavBar";
import { WelcomePage } from "./components/WelcomePage/WelcomePage";

function App() {
  return (
    <main className="min-w-dvw min-h-dvh bg-custom-main-dark-gray">
      <NavBar />
      <WelcomePage />
    </main>
  );
}

export default App;
