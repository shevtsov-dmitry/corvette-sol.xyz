import NavBar from './components/NavBar/NavBar.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Roadmap from './components/Roadmap/Roadmap.jsx'
import Tokenomica from './components/Tokenomica/Tokenomica.jsx'
import Garage from './components/Garage/Garage.jsx'
import Merch from './components/Merch/Merch.jsx'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './index.css'
import Main from './components/Main/Main.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import React from 'react'

export default function App() {
    const location = useLocation()
    return (
        <main className="max-w-dvw h-full bg-[#2E2E2E]">
            {/* lighter gamma: #414141 */}
            <NavBar />
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
                    >
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/roadmap" element={<Roadmap />} />
                            <Route
                                path="/tokenomica"
                                element={<Tokenomica />}
                            />
                            <Route path="/garage" element={<Garage />} />
                            <Route path="/merch" element={<Merch />} />
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <Footer />
        </main>
    )
}
