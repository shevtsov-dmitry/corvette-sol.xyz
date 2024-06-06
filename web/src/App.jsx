import { Kaz } from "./components/Kaz/Kaz.jsx";
import { WelcomePage } from "./components/WelcomePage/WelcomePage.jsx";
function App() {
  return (
    <main className="w-full h-full bg-[#2E2E2E]">
      {/* lighter gamma: #414141 */}
      <WelcomePage />
      <Kaz />
    </main>
  );
}

export default App;
