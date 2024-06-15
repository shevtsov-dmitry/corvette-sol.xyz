import React, { useEffect, useRef, useState } from 'react'

export default function CarCustomization() {
    const [midElIdx, setMidElIdx] = useState(0)
    const [isScrollRight, setIsScrollRight] = useState(true)

    const [images, setImages] = useState([])

    const customizationSliderRef = useRef(null)

    const HOST = 'http://localhost:8080'

    async function fetchServerImages(type) {
        const res = await fetch(`${HOST}/cars/get/${type}`)
        const jsons = await res.json()
        setImages(
            jsons.map((json) => (
                // <img key={json.index} src={json.image} className={''} />
                <img
                    key={json.index}
                    src={`data:image/jpeg;base64,${json.image}`}
                    className={''}
                />
            ))
        )
    }

    useEffect(() => {
        fetchServerImages('models')
    }, [])

    const scrollDistancePx = 384

    function switchToPrev() {
        setMidElIdx((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
        setIsScrollRight(false)

        if (customizationSliderRef.current) {
            customizationSliderRef.current.scrollLeft -= scrollDistancePx
        }
    }

    function switchToNext() {
        setMidElIdx((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
        setIsScrollRight(true)

        if (customizationSliderRef.current) {
            customizationSliderRef.current.scrollLeft += scrollDistancePx
        }
    }

    function PreviewBlock({ index, image }) {
        const isLeft = index === midElIdx - 1
        const isMiddle = index === midElIdx
        const isRight = index === midElIdx + 1

        return isMiddle ? (
            <div
                className={`flex h-[20em] w-1/2 flex-shrink-0 items-center justify-center`}
            >
                <div className={'animate-scale-up flex w-1/2 justify-center'}>
                    {image}
                </div>
            </div>
        ) : (
            <div
                className={`${isRight && !isScrollRight ? 'animate-scale-down-right' : ''} ${isLeft && isScrollRight ? 'animate-scale-down-left' : ''} flex h-[15rem] w-1/4 flex-shrink-0 cursor-pointer items-center justify-center`}
                onClick={(event) => {
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

    function CustomizationMenuBtn({ title, customPartType }) {
        return (
            <button
                className={'customization-menu-btn'}
                onClick={() => {
                    fetchServerImages(customPartType)
                }}
            >
                {title}
            </button>
        )
    }

    return (
        <div
            className={
                'flex h-dvh w-dvw flex-col items-center justify-center gap-3'
            }
        >
            <img
                className={''}
                src={
                    'images/carCustomization/construct-your-corvette-heading.png'
                }
            />
            <div
                id="customization-menu-holder"
                // className="flex h-fit w-fit flex-col items-start"
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
                                key={index}
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
                <div className="flex w-fit justify-around gap-4">
                    <CustomizationMenuBtn
                        title={'COLOR'}
                        customPartType={'colors'}
                    />
                    <CustomizationMenuBtn
                        title={'MODEL'}
                        customPartType={'models'}
                    />
                    <CustomizationMenuBtn
                        title={'BACKGROUND'}
                        customPartType={'backgrounds'}
                    />
                    <CustomizationMenuBtn
                        title={'RIMS'}
                        customPartType={'rims'}
                    />
                    <button
                        className={
                            'customization-menu-btn bg-green-900 hover:bg-green-700'
                        }
                        onClick={() => {}}
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    )
}
