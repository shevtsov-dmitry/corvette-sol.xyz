import Lottie from 'lottie-react'
export default function Roadmap() {
    return (
        <div className="flex h-dvh w-dvw flex-col items-center justify-center">
            <img src={'images/roadmap/road.png'} className="z-0 mt-10 w-full" />

            <Lottie
                className={'l-0 absolute mt-[-2%] w-full'}
                path={'lotties/roadmap/car-roadmap.json'}
                loop={true}
                autoplay={true}
            />

            <div
                id="road-signs-and-text-holder"
                className="absolute z-20 flex w-full items-end justify-end"
            >
                <img
                    src={'images/roadmap/roadmap-signs-and-text.png'}
                    className="mr-[2%] max-[1700px]:w-[80%]"
                />
            </div>
        </div>
    )
}
