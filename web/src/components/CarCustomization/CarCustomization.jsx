import React, { useEffect, useRef, useState } from 'react'

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
    const [isSaved, setIsSaved] = useState(false)

    const customizationSliderRef = useRef(null)

    // TODO make env
    const HOST = 'http://localhost:8080'
    let scrollDistancePx = 384
    if (customizationSliderRef.current) {
        scrollDistancePx = customizationSliderRef.current.offsetWidth / 3 - 128
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
        setIsForbidAnimation(switchedCarsAmount === 0)
    }, [switchedCarsAmount])

    useEffect(() => {
        fetchImages()
        // setIsForbidAnimation(true)
        // setTimeout(() => setIsForbidAnimation(false), 500)
    }, [curCustomizationBtn])

    async function fetchImages() {
        try {
            const m = customizationProps
            const res = await fetch(
                `${HOST}/cars/get/assets?show=${m['show']}&model=${m['model']}&color=${m['color']}&rims=${m['rims']}`
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

    function CustomizationMenuBtn({ title }) {
        return (
            <button
                className={'customization-menu-btn'}
                onClick={() => {
                    if (title === curCustomizationBtn) {
                        return
                    }
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

    function parseFilenameProps(name) {
        const filenameSplit = images[midElIdx].key.split('-')
        if (name === 'model') return filenameSplit[0]
        if (name === 'color') return filenameSplit[1]
        if (name === 'rims') return filenameSplit[2]
    }

    return (
        <div
            className={
                'flex h-dvh w-dvw flex-col items-center justify-center gap-12'
            }
        >
            <img
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
                            'no-scrollbar flex h-fit w-fit select-none overflow-x-scroll scroll-smooth'
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
                <div
                    id={'buttons-holder'}
                    className={
                        'mt-[2%] flex w-screen items-center justify-center'
                    }
                >
                    <div className="flex w-fit justify-around gap-4">
                        <CustomizationMenuBtn title={'MODEL'} />
                        <CustomizationMenuBtn title={'COLOR'} />
                        <CustomizationMenuBtn title={'RIMS'} />
                        <button
                            className={
                                'customization-menu-btn bg-green-900 hover:bg-green-700'
                            }
                            onClick={async () => {
                                const m = customizationProps
                                const res = await fetch(
                                    `${HOST}/cars/get/constructed-car?model=${m['model']}&color=${m['color']}&rims=${m['rims']}`
                                )
                                const imageBytes = await res.blob()
                                const imageUrl = URL.createObjectURL(imageBytes)
                                setIsSaved(true)
                                setConstructedCarImg(imageUrl)
                            }}
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            </div>
            {isSaved ? (
                <div className={'absolute h-screen w-screen bg-red-300'}>
                    <img src={constructedCarImg} />
                </div>
            ) : (
                <div />
            )}
        </div>
    )
}
