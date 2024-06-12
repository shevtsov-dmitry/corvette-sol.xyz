import React, { useState } from 'react'

export default function CarCustomization() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const totalBlocks = 7

    function handlePrev() {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalBlocks - 1 : prevIndex - 1
        )
    }

    function handleNext() {
        setCurrentIndex((prevIndex) =>
            prevIndex === totalBlocks - 1 ? 0 : prevIndex + 1
        )
    }

    function PreviewBlock({ index }) {
        const isMiddle = index === 1
        const sizeClass = isMiddle ? 'w-1/2 h-5/6' : 'w-1/4 h-4/6'
        return (
            <div className={`${sizeClass} flex-shrink-0 bg-amber-100`}>
                {`Block ${index + 1}`}
            </div>
        )
    }

    function SliderSection() {
        const visibleBlocks = [
            (currentIndex - 1 + totalBlocks) % totalBlocks,
            currentIndex,
            (currentIndex + 1) % totalBlocks,
        ]

        return (
            <div
                className={
                    'flex h-2/5 w-full items-center justify-center gap-3'
                }
            >
                {visibleBlocks.map((index, i) => (
                    <PreviewBlock key={i} index={index} />
                ))}
            </div>
        )
    }

    return (
        <div
            className={
                'flex h-dvh w-dvw flex-col items-center justify-center gap-3'
            }
        >
            <h1 className="mt-12 font-nav-bar text-5xl font-bold text-white">
                CREATE YOUR OWN CORVETTE!
            </h1>
            <div
                id="customization-menu-holder"
                className="flex h-4/6 w-3/4 flex-col items-center bg-neutral-600"
            >
                <SliderSection />
                <div className="mt-4 flex w-full justify-between">
                    <button
                        onClick={handlePrev}
                        className="rounded bg-gray-700 p-2 text-white"
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNext}
                        className="rounded bg-gray-700 p-2 text-white"
                    >
                        Next
                    </button>
                </div>
                <div className="flex w-1/2 justify-around">
                    <button
                        className={'customization-menu-btn'}
                        onClick={() => {}}
                    >
                        COLOR
                    </button>
                    <button
                        className={'customization-menu-btn'}
                        onClick={() => {}}
                    >
                        MODEL
                    </button>
                    <button
                        className={'customization-menu-btn'}
                        onClick={() => {}}
                    >
                        BACKGROUND
                    </button>
                    <button
                        className={'customization-menu-btn'}
                        onClick={() => {}}
                    >
                        RIMS
                    </button>
                    <button
                        className={'customization-menu-btn'}
                        onClick={() => {}}
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    )
}
