import Lottie from 'lottie-react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setIsHomeBtnVisible } from '../../store/homeBtnSlice.js'

export default function Roadmap() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsHomeBtnVisible(true))
    }, [])

    return (
        <div className="flex h-dvh w-dvw flex-col items-center justify-center">
            <img
                src={'images/roadmap/road.png'}
                className="max-mobile:hidden z-0 mt-10 w-full"
            />
            <img
                id={"mobile-roadmap"}
                src={'images/roadmap/roadmap-signs-and-text-mobile.png'}
                className="scale-[45%] min-[1000px]:hidden"
            />


            <Lottie
                className={'l-0 max-mobile:hidden absolute mt-[-2%] w-full'}
                path={'lotties/roadmap/car-roadmap.json'}
                loop={false}
                autoplay={true}
            />

            <div
                id="road-signs-and-text-holder"
                className="max-mobile:hidden absolute z-20 flex w-full items-end justify-end"
            >
                <img
                    src={'images/roadmap/roadmap-signs-and-text.png'}
                    className="mr-[2%] max-[1700px]:w-[80%]"
                />
            </div>
        </div>
    )
}
