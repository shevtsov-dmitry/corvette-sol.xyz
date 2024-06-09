import { useEffect, useRef, useState } from 'react'

import Lottie from 'lottie-react'

export function Kaz() {
    const [debug_idx, set_debug_idx] = useState(0)
    const [is_allowed_to_spin, set_is_allowed_to_spin] = useState(true)
    const [spin_amount, set_spins_amount] = useState(0)

    const chance_to_win_in_percent = 100,
        icons_amount = 9,
        icon_width = 128,
        spin_speed_multiplier = 75,
        time_difference_between_reel_stops = 300,
        full_round = 1488,
        // spin_speed_multiplier = 30,
        // time_difference_between_reel_stops = 100,
        image_init_step = 50,
        step_between_icons = 40,
        // whole_scroll_distance = 3306,
        delta = 30

    const spin_animation = `background-position-y ${(2 + delta) * spin_speed_multiplier}ms cubic-bezier(.41,-0.01,.63,1.09)`

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
                image_init_step -
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

    function spinOne(reel, idx = 0) {
        set_debug_idx(debug_idx + 1)
        set_spins_amount(spin_amount + 1)
        const style = getComputedStyle(reel)
        const background_position_y = parseFloat(style['background-position-y'])
        const cur_reel_scroll_distance =
            background_position_y +
            delta * icon_width -
            step_between_icons +
            2.8

        setTimeout(() => {
            reel.style.transition = spin_animation
            reel.style.backgroundPositionY = `${cur_reel_scroll_distance}px`
        }, idx * time_difference_between_reel_stops)
    }

    function executeGuaranteedSpin(reel, idx = 0) {
        set_is_allowed_to_spin(false)
        setTimeout(() => {
            reel.style.transition = spin_animation

            let final_position_with_price
            if (spin_amount < 7) {
                final_position_with_price =
                    image_init_step + full_round * 3 * spin_amount + full_round
            } else {
                final_position_with_price =
                    image_init_step + full_round * 3 * spin_amount - full_round
            }
            reel.style.backgroundPositionY = `${final_position_with_price}px`
        }, idx * time_difference_between_reel_stops)
    }

    function spinAll() {
        if (!is_allowed_to_spin) {
            return
        }
        if (!reel_1_ref.current || !reel_2_ref.current || !reel_3_ref.current) {
            return
        }
        const win_condition =
            Math.random() <= chance_to_win_in_percent / 100 && spin_amount >= 2
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
        <div className="max-w-dvw flex h-dvh items-center justify-center">
            <div
                id="centered-holder"
                className="flex h-fit w-fit flex-col items-center"
            >
                <img
                    src="images/kaz/get-3-wins-in-a-row.png"
                    width="30%"
                    className="absolute left-12"
                />
                <div
                    id="slot-machine-holder"
                    className="flex h-fit w-fit flex-col items-center"
                >
                    <img
                        src="images/kaz/slot-full-beta.png"
                        width="520px"
                        className="z-10 my-8 shadow-black"
                    />
                    <div
                        id="reels-holder"
                        className="absolute mt-[15em] flex w-[29.5rem] justify-around"
                    >
                        <div className="reel" ref={reel_1_ref}></div>
                        <div className="reel" ref={reel_2_ref}></div>
                        <div className="reel" ref={reel_3_ref}></div>
                    </div>
                </div>
                <button className="spin-btn" onClick={spinAll}>
                    SPIN!
                </button>
                {/*<Lottie*/}
                {/*    className={'relative'}*/}
                {/*    path={'lotties/kaz/confetti-casino.json'}*/}
                {/*    loop={false}*/}
                {/*    autoplay={true}*/}
                {/*/>*/}
                <img
                    src="images/kaz/win-big.png"
                    width="30%"
                    className="absolute right-12 mt-[400px]"
                />
            </div>
        </div>
    )
}
