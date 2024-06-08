import { useEffect, useRef, useState } from 'react'

export function Kaz() {
    const chanceToWinInPercent = 20,
        icons_amount = 9,
        icon_width = 128,
        background_image_init_step = 50,
        delta = 30,
        spin_speed_multiplier = 30,
        step_between_icons = 40,
        scroll_distance = 3803

    const reel1Ref = useRef()
    const reel2Ref = useRef()
    const reel3Ref = useRef()
    const reelsList = [reel1Ref.current, reel2Ref.current, reel3Ref.current]

    const [spinnedLength, setSpinnedLength] = useState(0)
    const [reelPositionIdxsArray, setReelPositionIdxsArray] = useState([])

    useEffect(() => {
        if (!reel1Ref.current) {
            return
        }
        const reelPositions = createRandomReelPositionsArray()
        reel1Ref.current.style.backgroundPositionY = `${reelPositions[0]}px`
        reel2Ref.current.style.backgroundPositionY = `${reelPositions[1]}px`
        reel3Ref.current.style.backgroundPositionY = `${reelPositions[2]}px`
    }, [])

    return (
        <div className="max-w-dvw h-dvh flex justify-center items-center">
            <div id="centered-holder" className="flex flex-col items-center">
                <img src="images/kaz/try-your-luck.png" width="75%" />
                <div
                    id="slot-machine-holder"
                    className="w-fit h-fit flex flex-col items-center"
                >
                    <img
                        src="images/kaz/slot-full-beta.png"
                        width="520px"
                        className="shadow-black z-20 my-8"
                    />
                    <div
                        id="reels-holder"
                        className="w-[29.5rem] absolute mt-[15em] z-10 flex justify-around "
                    >
                        <div className="reel" ref={reel1Ref}></div>
                        <div className="reel" ref={reel2Ref}></div>
                        <div className="reel" ref={reel3Ref}></div>
                    </div>
                </div>
                <button className="spin-btn" onClick={spinAll}>
                    SPIN!
                </button>
                <img src="images/kaz/get-3-wins-in-a-row.png" width="100%" />
            </div>
        </div>
    )

    function createRandomReelPositionsArray() {
        const reel_positions = []
        const amount_of_reels = 3
        for (let i = 0; i < amount_of_reels; i++) {
            while (true) {
                let rand_idx = setSlotsImagePosition(
                    Math.floor(Math.random() * icons_amount) + 1
                )
                if (!reel_positions.includes(rand_idx)) {
                    reel_positions.push(rand_idx)
                    break
                }
            }
        }
        setReelPositionIdxsArray(reel_positions)
        return reel_positions
    }

    function setSlotsImagePosition(image_idx) {
        return (
            background_image_init_step -
            icon_width * image_idx -
            step_between_icons * image_idx +
            image_idx * 2.3 // fix graduating shift down with last multiplier.
        )
    }

    function spinOne(reel, offset = 0) {
        // const delta = (offset + 2) * icons_amount + Math.round(Math.random() * icons_amount);
        const style = getComputedStyle(reel),
            backgroundPositionY = parseFloat(style['background-position-y'])
        const scroll_distance =
            backgroundPositionY + delta * icon_width - step_between_icons + 2.8
        setTimeout(() => {
            // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
            reel.style.transition = `background-position-y ${(2 + delta) * spin_speed_multiplier}ms cubic-bezier(.41,-0.01,.63,1.09)`
            if (spinnedLength === 0) {
                setSpinnedLength(scroll_distance)
            }
            reel.style.backgroundPositionY = `${scroll_distance}px` // fix graduating shift down.
        }, offset * 150)
    }

    function executeGuaranteedSpin() {
        const reel = reel1Ref.current
        const style = getComputedStyle(reel),
            backgroundPositionY = parseFloat(style['background-position-y'])
        const scroll_distance =
            backgroundPositionY + delta * icon_width - step_between_icons + 2.8
        setTimeout(() => {
            // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
            reel.style.transition = `background-position-y ${(2 + delta) * spin_speed_multiplier}ms cubic-bezier(.41,-0.01,.63,1.09)`
            if (spinnedLength === 0) {
                setSpinnedLength(scroll_distance)
            }
            reel.style.backgroundPositionY = `${scroll_distance}px` // fix graduating shift down.
        }, 2 * 150)
    }

    function spinAll() {
        if (reel1Ref.current === undefined) {
            return
        }
        const winCondition = Math.random() <= chanceToWinInPercent / 100
        // if (winCondition) {
        if (false) {
            executeGuaranteedSpin()
        } else {
            const reelsList = [
                reel1Ref.current,
                reel2Ref.current,
                reel3Ref.current,
            ]
            reelsList.forEach((reel, index) => spinOne(reel, index))
        }
        reelsList.forEach((reel, index) => spinOne(reel, index))
    }
}
