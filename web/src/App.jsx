import {Kaz} from './components/Kaz/Kaz.jsx'
import {WelcomePage} from './components/WelcomePage/WelcomePage.jsx'
import {NavBar} from './components/WelcomePage/NavBar/NavBar.jsx'
import {Route, Routes} from "react-router-dom";
import {Roadmap} from "./components/Roadmap/Roadmap.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Garage from "./components/Garage/Garage.jsx";
import Merch from "./components/Merch/Merch.jsx";

function App() {
    return (<main className="max-w-dvw h-full bg-[#2E2E2E]">
            {/* lighter gamma: #414141 */}
            <NavBar/>
            <Routes>
                <Route path="/" element={
                    <div className={"max-w-dvw h-full"}>
                        <WelcomePage/>
                        <Kaz/>
                    </div>}
                />
                <Route path="/roadmap" element={<Roadmap/>}/>
                <Route path="/about-us" element={<AboutUs/>}/>
                <Route path="/garage" element={<Garage/>}/>
                <Route path="/merch" element={<Merch/>}/>
            </Routes>
        </main>

    )
}

export default App
