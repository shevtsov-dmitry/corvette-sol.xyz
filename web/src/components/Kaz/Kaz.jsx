import { useEffect, useRef, useState } from 'react'

export function Kaz() {
    const [is_allowed_to_spin, set_is_allowed_to_spin] = useState(true)
    const [spins_amount, set_spins_amount] = useState(0)

    const chance_to_win_in_percent = 100,
        icons_amount = 9,
        icon_width = 128,
        background_image_init_step = 50,
        step_between_icons = 40

    const reel_1_ref = useRef()
    const reel_2_ref = useRef()
    const reel_3_ref = useRef()

    const reels = [reel_1_ref.current, reel_2_ref.current, reel_3_ref.current]

    useEffect(() => {
        if (!reel_1_ref.current || !reel_2_ref.current || !reel_3_ref.current) {
            return
        }
        const reel_positions = createRandomReelPositionsArray()
        reel_1_ref.current.style.backgroundPositionY = `${reel_positions[0]}px`
        reel_2_ref.current.style.backgroundPositionY = `${reel_positions[1]}px`
        reel_3_ref.current.style.backgroundPositionY = `${reel_positions[2]}px`
    }, [])

    function createRandomReelPositionsArray() {
        function setSlotsImagePosition(image_idx) {
            return (
                background_image_init_step -
                icon_width * image_idx -
                step_between_icons * image_idx +
                image_idx * 2.3
            )
        }

        const reel_position = []
        const reels_amount = 3
        for (let i = 0; i < reels_amount; i++) {
            while (true) {
                const rand_idx = Math.floor(Math.random() * icons_amount) + 1
                const rand_px_pos = setSlotsImagePosition(rand_idx)
                if (!reel_position.includes(rand_px_pos)) {
                    reel_position[i] = rand_px_pos
                    break
                }
            }
        }
        return reel_position
    }

    const delta = 30
    const spin_speed_multiplier = 30

    function spinOne(reel, idx = 0) {
        set_spins_amount(spins_amount + 1)
        const style = getComputedStyle(reel)
        const background_position_y = parseFloat(style['background-position-y'])
        const cur_reel_scroll_distance =
            background_position_y +
            delta * icon_width -
            step_between_icons +
            2.8

        setTimeout(() => {
            reel.style.transition = `background-position-y ${(2 + delta) * spin_speed_multiplier}ms cubic-bezier(.41,-0.01,.63,1.09)`
            reel.style.backgroundPositionY = `${cur_reel_scroll_distance}px`
        }, idx * 150)
    }

    function executeGuaranteedSpin(reel, idx = 0) {
        set_is_allowed_to_spin(false)
        setTimeout(() => {
            reel.style.transition = `background-position-y ${(2 + delta) * spin_speed_multiplier}ms cubic-bezier(.41,-0.01,.63,1.09)`
            // const formula = -1449.5 * spins_amount - 38.5 * spins_amount + 46 - 1150
            const formula =
                1449.5 * spins_amount + 38.5 * spins_amount - 7820 + 3910

            reel.style.backgroundPositionY = `${-formula}px`
        }, idx * 150)
    }

    function spinAll() {
        if (!is_allowed_to_spin) {
            return
        }
        if (!reel_1_ref.current || !reel_2_ref.current || !reel_3_ref.current) {
            return
        }
        const win_condition =
            Math.random() <= chance_to_win_in_percent / 100 && spins_amount >= 1
        if (win_condition) {
            reels.forEach((reel, index) => executeGuaranteedSpin(reel, index))
        } else {
            const reels_references = [
                reel_1_ref.current,
                reel_2_ref.current,
                reel_3_ref.current,
            ]
            reels_references.forEach((reel, index) => spinOne(reel, index))
        }
    }

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
                        <div className="reel " ref={reel_1_ref}></div>
                        <div className="reel" ref={reel_2_ref}></div>
                        <div className="reel" ref={reel_3_ref}></div>
                    </div>
                </div>
                <button className="spin-btn" onClick={spinAll}>
                    SPIN!
                </button>
                <img src="images/kaz/get-3-wins-in-a-row.png" width="100%" />
            </div>
        </div>
    )
}
