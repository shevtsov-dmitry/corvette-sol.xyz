import { Footer } from './Footer/Footer.jsx'
import Lottie from 'lottie-react'

export function WelcomePage() {
    return (
        <div className="max-w-dvw h-screen">
            <Lottie
                className={'absolute left-[21%] top-[15%] z-10 w-[22%]'}
                path={'lotties/welcomePage/gray-corvete-welcome.json'}
                loop={false}
                autoplay={true}
            />
            <div className={'flex h-full w-full'}>
                <img
                    className={'object-contain'}
                    src={'images/welcomePage/trail.png'}
                />
            </div>
            <img
                className={
                    'absolute bottom-0 mt-[-6em] h-full w-full scale-[40%] object-contain'
                }
                src={'images/welcomePage/vehicle.png'}
            />
            <Lottie
                className={'absolute bottom-[0%] right-[3%] w-[50%]'}
                path={'lotties/welcomePage/exclusevely-on-flash.json'}
                loop={false}
                autoplay={true}
            />
        </div>
    )
}
