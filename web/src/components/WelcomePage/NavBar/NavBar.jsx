import Lottie from 'lottie-react'
import {Link} from "react-router-dom";

export function NavBar() {
    return (
        <div className="fixed z-50 flex h-fit w-dvw flex-col items-center justify-center gap-4">
            <header className="flex justify-around">
                <div
                    id="nav-bar"
                    className="flex w-fit items-end justify-center"
                >
                    <div className="nav-btn-holder">
                        <Link to="/roadmap">
                            <button className="nav-btn">ROADMAP</button>
                        </Link>
                        <Link to="/about-us">
                            <button className="nav-btn pr-2">TOKENOMICA</button>
                        </Link>
                    </div>
                    <div
                        id="wheel-holder"
                        className="relative mx-12 mb-[-1.3%] mt-[1%] w-[7%]"
                    >
                        <Link to={"/"}>
                            <Lottie
                                path={'lotties/welcomePage/low-nonstop-wheel.json'}
                                loop={true}
                                autoplay={true}
                            />
                        </Link>
                    </div>
                    <div className="nav-btn-holder">
                        <Link to="/garage">
                            <button className="nav-btn">GARAGE</button>
                        </Link>
                        <Link to="/merch">
                            <button className="nav-btn">OUR MERCH</button>
                        </Link>
                    </div>
                </div>
            </header>
            <img src="images/welcomePage/nav-bar-hr.png" width={'67%'}/>
        </div>
    )
}
