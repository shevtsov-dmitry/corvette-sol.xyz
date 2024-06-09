import {Kaz} from './components/Kaz/Kaz.jsx'
import {WelcomePage} from './components/WelcomePage/WelcomePage.jsx'
import {NavBar} from './components/WelcomePage/NavBar/NavBar.jsx'
import {Route, Routes, useLocation} from "react-router-dom";
import {Roadmap} from "./components/Roadmap/Roadmap.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Garage from "./components/Garage/Garage.jsx";
import Merch from "./components/Merch/Merch.jsx";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./index.css";

function App() {
    const location = useLocation();

    return (<main className="max-w-dvw h-full bg-[#2E2E2E] overflow-hidden">
            {/* lighter gamma: #414141 */}
            <NavBar/>
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={300}
                    classNames="fade"
                >
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
                </CSSTransition>
            </TransitionGroup>
        </main>

    )
}

export default App