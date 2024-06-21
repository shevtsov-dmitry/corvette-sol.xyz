import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setIsHomeBtnVisible } from '../../store/homeBtnSlice.js'

export default function Garage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsHomeBtnVisible(true))
    }, [])

    return <div className="w-dvw h-dvh flex flex-col items-center justify-center bg-inherit">
        <h1 className="text-5xl font-bold text-white text-center">GARAGE. <br/> WORK IN PROGRESS...</h1>
    </div>
}