import { Kaz } from './components/Kaz/Kaz.jsx'
import { WelcomePage } from './components/WelcomePage/WelcomePage.jsx'
import { NavBar } from './components/WelcomePage/NavBar/NavBar.jsx'

function App() {
    return (
        <main className="max-w-dvw h-full bg-[#2E2E2E]">
            {/* lighter gamma: #414141 */}
            <NavBar />
            <WelcomePage />
            <Kaz />
        </main>
    )
}

export default App
