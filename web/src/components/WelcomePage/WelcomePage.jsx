import { Footer } from './Footer/Footer.jsx'
import Lottie from 'lottie-react'
import {useEffect, useState} from "react";

export function WelcomePage() {

    return (
        <div className="max-w-dvw mt-24 h-dvh">
            <Lottie
                className={'absolute left-[21%] top-[15%]  w-[22%]'}
                path={'lotties/welcomePage/gray-corvete-welcome.json'}
                loop={false}
                autoplay={true}
            />
            <img
                className={'absolute mt-[17%] w-full object-contain'}
                src={'images/welcomePage/trail.png'}
            />
            <img
                className={'mt-[-6em] h-full w-full scale-[40%] object-contain'}
                src={'images/welcomePage/vehicle.png'}
            />
            <Lottie
                className={'absolute right-[3%] bottom-[0%] w-[50%]'}
                path={'lotties/welcomePage/exclusevely-on-flash.json'}
                loop={false}
                autoplay={true}
            />
            <Footer />
        </div>
    )
}
