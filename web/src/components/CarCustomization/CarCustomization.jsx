import React, { useEffect, useRef, useState } from 'react'

export default function CarCustomization() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [images, setImages] = useState([])

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

    function switchToPrev() {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    function switchToNext() {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }

    function PreviewBlock({ index, position }) {
        const isMiddle = position === 'mid'
        const sizeClass = isMiddle ? 'w-1/2 h-5/6' : 'w-1/4 h-4/6'

        return (
            <div
                className={`${sizeClass} flex flex-shrink-0 items-center justify-center bg-neutral-600`}
                onClick={(event) => {
                    if (position === 'right') {
                        switchToNext()
                    }
                    if (position === 'left') {
                        switchToPrev()
                    }
                }}
                style={
                    position !== 'mid'
                        ? {
                              cursor: 'pointer',
                          }
                        : {}
                }
            >
                {images[index]}
            </div>
        )
    }

    function SliderSection() {
        const visibleBlocks = [
            (currentIndex - 1 + images.length) % images.length,
            currentIndex,
            (currentIndex + 1) % images.length,
        ]

        return (
            <div
                className={
                    'flex h-[30em] w-full select-none items-center justify-center gap-3'
                }
            >
                <PreviewBlock position={'left'} index={visibleBlocks[0]} />
                <PreviewBlock position={'mid'} index={visibleBlocks[1]} />
                <PreviewBlock position={'right'} index={visibleBlocks[2]} />
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
                className="flex h-fit w-3/4 flex-col items-center"
            >
                <SliderSection />
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
