import React, { useEffect, useRef, useState } from 'react'

export default function CarCustomization() {
    // TODO make env
    const HOST = 'http://localhost:8080'

    const [midElIdx, setMidElIdx] = useState(0)
    const [isScrollRight, setIsScrollRight] = useState(true)
    const [images, setImages] = useState([])
    const [customizationItemIdx, setCustomizationItemIdx] = useState(0)
    const [customizationProps, setCustomizationProps] = useState({
        show: 'model',
        model: 1,
        color: 'blue',
        rims: 1,
    })
    const customizationSliderRef = useRef(null)

    const customizationTabs = {
        0: 'model',
        1: 'color',
        2: 'rims',
    }

    async function fetchColorsForModels() {
        const res = await fetch(HOST + '/cars/get/colors-for-models')
        if (!res.ok) {
            console.error("can't get colors for models hashmap from server")
            return
        }
        const json = await res.json()
    }

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
            console.log(filenames)

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

    useEffect(() => {
        fetchImages()
        fetchColorsForModels()
    }, [])

    // TODO count distance with formula curScreenSize / 3
    const scrollDistancePx = 384

    function switchToPrev() {
        setCustomizationItemIdx(customizationItemIdx - 1)
        setMidElIdx((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
        setIsScrollRight(false)
        if (customizationSliderRef.current) {
            customizationSliderRef.current.scrollLeft -= scrollDistancePx
        }
    }

    function switchToNext() {
        setCustomizationItemIdx(customizationItemIdx + 1)
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

    function CustomizationMenuBtn({ title }) {
        return (
            <button
                className={'customization-menu-btn'}
                onClick={() => {
                    setCustomizationProps({
                        show: title.toLowerCase(),
                        model: parseFilenameProps('model'),
                        color: parseFilenameProps('color'),
                        rims: parseFilenameProps('rims'),
                    })
                    fetchImages()
                    setCustomizationItemIdx(0)
                }}
            >
                {title}
            </button>
        )
    }

    function parseFilenameProps(name) {
        const filenameSplit = images[customizationItemIdx].key.split('-')
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
                className={''}
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
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
