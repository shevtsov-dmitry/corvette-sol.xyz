import { NavBar } from './NavBar/NavBar.jsx'
import { Footer } from './Footer/Footer.jsx'
import Lottie from 'lottie-react'

export function WelcomePage() {
    return (
        <div className="max-w-dvw h-dvh">
            <NavBar />
            <Lottie
                className={'absolute w-[22%] left-[21%] top-[12%] mt-[2%]'}
                path={'lotties/welcomePage/gray-corvete-welcome.json'}
                loop={false}
                autoplay={true}
            />
            <img
                className={'absolute w-full mt-[12%] object-contain'}
                src={'images/welcomePage/trail.png'}
            />
            <img
                className={
                    ' w-full h-full object-contain scale-[44%] mt-[-6em]'
                }
                src={'images/welcomePage/vehicle.png'}
            />
            <Lottie
                className={'absolute w-[48%] right-[5%] bottom-0'}
                path={'lotties/welcomePage/exclusevely-on-flash.json'}
                loop={false}
                autoplay={true}
            />
            <Footer />
        </div>
    )
}
