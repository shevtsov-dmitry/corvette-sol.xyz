import Lottie from 'lottie-react'

export function NavBar() {
    return (
        <div className="fixed z-50 flex h-fit w-dvw flex-col items-center justify-center gap-4">
            <header className="flex justify-around">
                <div
                    id="nav-bar"
                    className="flex w-fit items-end justify-center"
                >
                    <div className="nav-btn-holder">
                        <button className="nav-btn">ROADMAP</button>
                        <button className="nav-btn">ABOUT US</button>
                    </div>
                    <div
                        id="wheel-holder"
                        className="relative mx-12 mb-[-1.3%] mt-[1%] w-[7%]"
                    >
                        <Lottie
                            path={'lotties/welcomePage/low-nonstop-wheel.json'}
                            loop={true}
                            autoplay={true}
                        />
                    </div>
                    <div className="nav-btn-holder">
                        <button className="nav-btn">GARAGE</button>
                        <button className="nav-btn">OUR MERCH</button>
                    </div>
                </div>
            </header>
            <img src="images/welcomePage/nav-bar-hr.png" width={'67%'} />
        </div>
    )
}
