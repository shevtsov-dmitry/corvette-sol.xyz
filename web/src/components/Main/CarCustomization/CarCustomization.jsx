import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNavBarDimmed } from '../../../store/navBarSlice.js'

export default function CarCustomization() {
    const [midElIdx, setMidElIdx] = useState(0)
    const [images, setImages] = useState([])
    const [switchedCarsAmount, setSwitchedCarsAmount] = useState(0)
    const [curCustomizationBtn, setCurCustomizationBtn] = useState('model')
    const [customizationProps, setCustomizationProps] = useState({
        show: 'model',
        model: 1,
        color: 'blue',
        rims: 1,
    })
    const [constructedCarImg, setConstructedCarImg] = useState('')

    const [isScrollRight, setIsScrollRight] = useState(true)
    const [isForbidAnimation, setIsForbidAnimation] = useState(true)
    const [isSaveFormActive, setIsSaveFormActive] = useState(false)

    const customizationSliderRef = useRef(null)
    const dispatch = useDispatch()

    const SERVER_HOST = 'http://localhost:8080' //env

    let scrollDistancePx = 384
    if (customizationSliderRef.current) {
        scrollDistancePx = customizationSliderRef.current.offsetWidth / 4
    }
    const customizationButtons = {
        model: 'model',
        color: 'color',
        rims: 'rims',
        save: 'save',
    }

    useEffect(() => {
        fetchImages()
    }, [])

    useEffect(() => {
        fetchImages()
    }, [customizationProps])

    useEffect(() => {
        setIsForbidAnimation(switchedCarsAmount === 0)
    }, [switchedCarsAmount])

    async function fetchImages() {
        try {
            const m = customizationProps
            const res = await fetch(
                `${SERVER_HOST}/cars/get/assets?show=${m['show']}&model=${m['model']}&color=${m['color']}&rims=${m['rims']}`
            )
            if (res.status === 404) {
                console.error(
                    'no such type of car in database: ',
                    customizationProps
                )
                return
            }

            const resData = await res.json()
            const filenames = []
            resData.forEach((item) => {
                filenames.push(atob(item['filename']))
            })
            setImages(
                resData.map((imageAndFileName) => (
                    <img
                        key={atob(imageAndFileName['filename'])}
                        src={`data:image/jpeg;base64,${imageAndFileName['image']}`}
                    />
                ))
            )
        } catch (e) {
            console.error("can't get car images from server", e)
        }
    }

    function switchToPrev() {
        setMidElIdx((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
        setSwitchedCarsAmount(switchedCarsAmount + 1)
        setIsScrollRight(false)
        if (customizationSliderRef.current) {
            customizationSliderRef.current.scrollLeft -= scrollDistancePx
        }
    }

    function switchToNext() {
        setMidElIdx((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
        setSwitchedCarsAmount(switchedCarsAmount + 1)
        setIsScrollRight(true)
        if (customizationSliderRef.current) {
            customizationSliderRef.current.scrollLeft += scrollDistancePx
        }
    }

    function PreviewBlock({ index, image }) {
        const isLeft = index === midElIdx - 1
        const isMiddle = index === midElIdx
        const isRight = index === midElIdx + 1
        const switchRightAnim =
            isRight && !isScrollRight ? 'animate-scale-down-right' : ''
        const switchLeftAnim =
            isLeft && isScrollRight ? 'animate-scale-down-left' : ''
        const scaleMidUp = isForbidAnimation ? 'w-full' : 'animate-scale-up '

        return isMiddle ? (
            <div
                className={
                    'flex h-[20em] w-1/2 flex-shrink-0 items-center justify-center'
                }
            >
                <div className={`${scaleMidUp} flex w-1/2 justify-center`}>
                    {image}
                </div>
            </div>
        ) : (
            <div
                className={`${switchRightAnim} ${switchLeftAnim} flex h-[15rem] w-1/4 flex-shrink-0 cursor-pointer items-center justify-center`}
                onClick={() => {
                    setSwitchedCarsAmount(0)
                    if (isRight) {
                        switchToNext()
                    }
                    if (isLeft) {
                        switchToPrev()
                    }
                }}
            >
                {image}
            </div>
        )
    }

    function SaveForm() {
        return (
            <div
                className={
                    'absolute flex h-screen w-screen items-center justify-center'
                }
            >
                <div
                    id={'save-black-dim-bg'}
                    className={'absolute h-full w-full bg-black opacity-70 z-[60]'}
                />
                <div
                    className={
                        'z-[70] flex flex-col justify-center gap-2 rounded-2xl bg-neutral-800 p-10 text-white'
                    }
                >
                    <div className={'relative w-full'}>
                        <div
                            id={'close-sign-save-form'}
                            className={
                                'absolute right-0 mr-[-25px] mt-[-33px] text-3xl font-bold text-white hover:cursor-pointer'
                            }
                            onClick={() => {
                                dispatch(setIsNavBarDimmed(false))
                                setIsSaveFormActive(false)
                            }}
                        >
                            X
                        </div>
                    </div>
                    <img src={constructedCarImg} className={'p-2'} />
                    <p className={'text-center text-2xl'}>
                        Nice! You've just constructed your own lovely{' '}
                        <span className={'text-amber-600'}>$corvette</span> car.
                    </p>
                    <p className={'text-center'}>
                        Now you can download a car image and imagine yourself cruising down a scenic highway!
                    </p>
                    <div
                        className={
                            'mt-2 flex w-full items-center justify-center'
                        }
                    >
                        <button className={'save-car-form-btn'}>
                            download
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    function CustomizationButtons() {
        return (
            <div
                id={'buttons-holder'}
                className={
                    'mt-[2%] flex w-screen select-none items-center justify-center'
                }
            >
                <div className="flex w-fit justify-around gap-4">
                    <CustomizationMenuBtn title={'MODEL'} />
                    <CustomizationMenuBtn title={'COLOR'} />
                    <CustomizationMenuBtn title={'RIMS'} />
                    <SaveBtn />
                </div>
            </div>
        )

        function CustomizationMenuBtn({ title }) {
            return (
                <button
                    className={'customization-menu-btn'}
                    onClick={() => {
                        // if (title === curCustomizationBtn) {
                        //     return
                        // }
                        setCustomizationProps({
                            show: title.toLowerCase(),
                            model: parseFilenameProps('model'),
                            color: parseFilenameProps('color'),
                            rims: parseFilenameProps('rims'),
                        })
                        setCurCustomizationBtn(
                            customizationButtons[title.toLowerCase()]
                        )
                        setMidElIdx(0)
                        if (customizationSliderRef.current) {
                            customizationSliderRef.current.scrollTo({
                                left: 0,
                                behavior: 'instant',
                            })
                        }
                    }}
                >
                    {title}
                </button>
            )
        }

        function SaveBtn() {
            return (
                <button
                    className={
                        'customization-menu-btn bg-green-900 hover:bg-green-700'
                    }
                    onClick={async () => {
                        dispatch(setIsNavBarDimmed(true))
                        const m = {
                            model: parseFilenameProps('model'),
                            color: parseFilenameProps('color'),
                            rims: parseFilenameProps('rims'),
                        }
                        const res = await fetch(
                            `${SERVER_HOST}/cars/get/constructed-car?model=${m['model']}&color=${m['color']}&rims=${m['rims']}`
                        )
                        const imageBytes = await res.blob()
                        const imageUrl = URL.createObjectURL(imageBytes)
                        setIsSaveFormActive(true)
                        setConstructedCarImg(imageUrl)
                    }}
                >
                    SAVE
                </button>
            )
        }

        function parseFilenameProps(name) {
            const filenameSplit = images[midElIdx].key.split('-')
            if (name === 'model') return filenameSplit[0]
            if (name === 'color') return filenameSplit[1]
            if (name === 'rims') return filenameSplit[2]
        }
    }

    return (
        <div
            className={
                'flex h-dvh w-dvw flex-col items-center justify-center gap-12 max-laptop:scale-75'
            }
        >
            <img
                className={'mt-[8.5%]'}
                src={
                    'images/carCustomization/construct-your-corvette-heading.png'
                }
            />
            <div
                id="customization-menu-holder"
                className="h-fit w-fit flex-col items-start"
            >
                <div className="mx-[10%] flex w-[80%]">
                    <div
                        ref={customizationSliderRef}
                        className={
                            'no-scrollbar flex h-fit w-screen select-none overflow-x-scroll scroll-smooth'
                        }
                    >
                        <div
                            id={'left-empty-space'}
                            className={`w-1/4 flex-shrink-0`}
                        />
                        {images.map((image, index) => (
                            <PreviewBlock
                                key={image.key}
                                index={index}
                                image={image}
                            />
                        ))}
                        <div
                            id={'right-empty-space'}
                            className={`w-1/4 flex-shrink-0`}
                        />
                    </div>
                </div>
                <CustomizationButtons />
            </div>
            {isSaveFormActive ? <SaveForm /> : <div />}
        </div>
    )
}
