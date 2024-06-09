import Lottie from "lottie-react";

export function Roadmap() {
    return <div className="max-w-dvw h-dvh flex flex-col items-center justify-center">
        <img src={"images/roadmap/road.png"} className="mt-10 z-0 w-full"/>
        <div id="road-signs-and-text-holder" className="z-20 absolute w-dvw flex justify-end items-end">
            <img src={"images/roadmap/roadmap-signs-and-text.png"} className="w-80% mr-[2%]"/>
        </div>
        <Lottie
            className={'absolute right-[5%] top-[10%] w-[50%]'}
            // path={'lotties/roadmap/roadmap-driving-car.json'}
            loop={false}
            autoplay={true}
        />
    </div>
}