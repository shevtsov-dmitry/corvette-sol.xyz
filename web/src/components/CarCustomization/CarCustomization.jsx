import React, { useRef, useState } from 'react'
import {
    CSSTransition,
    SwitchTransition,
    TransitionGroup,
} from 'react-transition-group'

export default function CarCustomization() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const totalBlocks = 7

    function switchToPrev() {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalBlocks - 1 : prevIndex - 1
        )
    }

    function switchToNext() {
        setCurrentIndex((prevIndex) =>
            prevIndex === totalBlocks - 1 ? 0 : prevIndex + 1
        )
    }

    function PreviewBlock({ index, position }) {
        const isMiddle = index === currentIndex
        const sizeClass = isMiddle ? 'w-1/2 h-5/6' : 'w-1/4 h-4/6'
        return (
            <div
                className={`${sizeClass} flex flex-shrink-0 items-center justify-center bg-amber-100`}
                onClick={(event) => {
                    if (position === 'right') {
                        switchToNext()
                    }
                    if (position === 'left') {
                        switchToPrev()
                    }
                }}
                style={{
                    backgroundColor: `${'#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0')}`,
                }}
            >
                <p className="text-6xl font-bold">{`Block ${index + 1}`}</p>
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
                    'flex h-[30em] w-full items-center justify-center gap-3'
                }
            >
                <PreviewBlock position={'left'} index={visibleBlocks[0]} />
                <PreviewBlock position={'mid'} index={visibleBlocks[1]} />
                <PreviewBlock position={'right'} index={visibleBlocks[2]} />
            </div>
        )
    }

    function CustomizationMenuBtn({ title }) {
        return (
            <button className={'customization-menu-btn'} onClick={() => {}}>
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
                    <CustomizationMenuBtn title={'COLOR'} />
                    <CustomizationMenuBtn title={'MODEL'} />
                    <CustomizationMenuBtn title={'BACKGROUND'} />
                    <CustomizationMenuBtn title={'RIMS'} />
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
