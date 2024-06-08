import { useEffect, useRef, useState } from 'react'

export function Kaz() {
    const [debug_idx, set_debug_idx] = useState(0)
    const [is_allowed_to_spin, set_is_allowed_to_spin] = useState(true)
    // const [scroll_distance, set_scroll_distance] = useState(0)
    const [first_reel_dist, set_first_reel_dist] = useState(0)

    const chance_to_win_in_percent = 20,
        icons_amount = 9,
        icon_width = 128,
        background_image_init_step = 50,
        delta = 30,
        spin_speed_multiplier = 30,
        step_between_icons = 40,
        one_step_size_px = (icon_width - step_between_icons) * 2 - 10.6,
        spinned_distances = [],
        scroll_distance = 3802

    const reel_1_ref = useRef()
    const reel_2_ref = useRef()
    const reel_3_ref = useRef()

    const reels_list = [
        reel_1_ref.current,
        reel_2_ref.current,
        reel_3_ref.current,
    ]

    const [reel_positions, set_reel_positions] = useState([])
    const [reel_idxs, set_reel_idxs] = useState([])

    useEffect(() => {
        if (!reel_1_ref.current) {
            return
        }
        const reel_positions = createRandomReelPositionsArray()
        reel_1_ref.current.style.backgroundPositionY = `${reel_positions[0]}px`
        reel_2_ref.current.style.backgroundPositionY = `${reel_positions[1]}px`
        reel_3_ref.current.style.backgroundPositionY = `${reel_positions[2]}px`
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
                        <div className="reel" ref={reel_1_ref}></div>
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

    function createRandomReelPositionsArray() {
        const local_reel_idx = []
        const local_reel_position = []
        const reels_amount = 3
        for (let i = 0; i < reels_amount; i++) {
            while (true) {
                const rand_idx = Math.floor(Math.random() * icons_amount) + 1
                const rand_px_pos = setSlotsImagePosition(rand_idx)
                if (!local_reel_position.includes(rand_px_pos)) {
                    local_reel_idx[i] = rand_idx
                    local_reel_position[i] = rand_px_pos
                    break
                }
            }
        }
        set_reel_idxs(local_reel_idx)
        set_reel_positions(local_reel_position)
        console.log(
            'in init: ',
            'idx',
            local_reel_idx[0],
            'pos',
            local_reel_position[0]
        )
        return local_reel_position
    }

    function setSlotsImagePosition(image_idx) {
        return (
            background_image_init_step -
            icon_width * image_idx -
            step_between_icons * image_idx +
            image_idx * 2.3 // fix graduating shift down with last multiplier.
        )
    }

    function spinOne(reel, idx = 0) {
        // const delta = (offset + 2) * icons_amount + Math.round(Math.random() * icons_amount);
        const style = getComputedStyle(reel)
        const background_position_y = parseFloat(style['background-position-y'])
        const cur_reel_scroll_distance =
            background_position_y +
            delta * icon_width -
            step_between_icons +
            2.8
        // ! DEBUG
        if (idx === 0) {
            set_first_reel_dist(cur_reel_scroll_distance)
        }
        spinned_distances[idx] = cur_reel_scroll_distance
        // set_scroll_distance(cur_reel_scroll_distance)
        setTimeout(() => {
            // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
            reel.style.transition = `background-position-y ${(2 + delta) * spin_speed_multiplier}ms cubic-bezier(.41,-0.01,.63,1.09)`
            reel.style.backgroundPositionY = `${cur_reel_scroll_distance}px` // fix graduating shift down.
        }, idx * 150)
    }

    function executeGuaranteedSpin() {
        set_is_allowed_to_spin(false)
        const reel = reel_1_ref.current
        const style = getComputedStyle(reel),
            background_position_y = parseFloat(style['background-position-y'])
        // const scroll_distance =
        //     backgroundPositionY + delta * icon_width - step_between_icons + 2.8

        setTimeout(() => {
            // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
            reel.style.transition = `background-position-y ${(2 + delta) * spin_speed_multiplier}ms cubic-bezier(.41,-0.01,.63,1.09)`
            // console.log('in init: ', 'idx', reel_idxs[0], 'pos', reel_positions[0])
            // const formula = first_reel_dist + 128 * 30
            // const formula = first_reel_dist + 1024 * 2
            const steps_to_go = 8 - reel_idxs[0]
            const formula = first_reel_dist - one_step_size_px * steps_to_go
            console.log(formula)
            reel.style.backgroundPositionY = `${formula}px` // fix graduating shift down.
        }, 2 * 150)
    }

    function spinAll() {
        if (!is_allowed_to_spin) {
            return
        }
        if (reel_1_ref.current === undefined) {
            return
        }

        const win_condition = Math.random() <= chance_to_win_in_percent / 100
        if (debug_idx > 0) {
            executeGuaranteedSpin()
        } else {
            set_debug_idx(debug_idx + 1)
            const reelsList = [
                reel_1_ref.current,
                reel_2_ref.current,
                reel_3_ref.current,
            ]
            reelsList.forEach((reel, index) => spinOne(reel, index))
        }
    }
}
