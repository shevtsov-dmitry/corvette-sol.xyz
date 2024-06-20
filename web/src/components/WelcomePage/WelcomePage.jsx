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
                    className={'object-contain mt-5'}
                    src={'images/welcomePage/trail.png'}
                />
            </div>
            <img
                className={
                    'absolute bottom-0 h-full w-full scale-[47%] object-contain'
                }
                src={'images/welcomePage/vehicle.png'}
            />
            <Lottie
                className={'absolute bottom-[8%] right-[8%] w-[40%]'}
                path={'lotties/welcomePage/exclusively-on-pumpfun.json'}
                loop={false}
                autoplay={true}
            />
        </div>
    )
}
