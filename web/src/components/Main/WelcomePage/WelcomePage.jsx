import { Footer } from '../../Footer/Footer.jsx'
import Lottie from 'lottie-react'

export default function WelcomePage() {
    return (
        <div className="max-w-dvw h-screen">
            <Lottie
                className={'absolute left-[21%] top-[15%] z-10 w-[22%] max-mobile:left-[15%] max-mobile:w-[50%]'}
                path={'lotties/welcomePage/gray-corvete-welcome.json'}
                loop={false}
                autoplay={true}
            />
            <div className={'flex h-full w-full'}>
                <img
                    className={'object-contain mt-[5%] max-mobile:scale-125 max-mobile:mt-[12%]'}
                    src={'images/welcomePage/trail.png'}
                />
            </div>
            <img
                className={
                    'absolute bottom-0 h-full w-full scale-[47%] object-contain mb-[-2%] max-mobile:scale-[79%]'
                }
                src={'images/welcomePage/vehicle.png'}
            />
            <Lottie
                className={'absolute bottom-[2%] right-[8%] w-[40%] max-mobile:w-[75%] max-mobile:bottom-[8%]'}
                path={'lotties/welcomePage/exclusively-on-pumpfun.json'}
                loop={false}
                autoplay={true}
            />
        </div>
    )
}
