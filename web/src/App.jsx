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
import CarCustomization from "./components/CarCustomization/CarCustomization.jsx";

function App() {
    const location = useLocation();

    return (<main className="max-w-dvw h-full bg-[#2E2E2E] ">
            {/* lighter gamma: #414141 */}
            <NavBar/>
            <div className="relative overflow-hidden">
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        timeout={{
                            appear: 300,
                            enter: 300,
                            exit: 0,
                        }}
                        classNames="fade"
                        // unmountOnExit
                    >
                        <Routes>
                            <Route path="/" element={
                                <div className={"max-w-dvw h-full"}>
                                    <WelcomePage/>
                                    <CarCustomization/>
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
            </div>
        </main>

    )
}

export default App