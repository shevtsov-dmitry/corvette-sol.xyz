import { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'
import placeholder from 'lodash/fp/placeholder.js'

export function Kaz() {
    const [debugIdx, setDebugIdx] = useState(0)
    const [spinAmount, setSpinsAmount] = useState(0)
    const [saveWalletStatus, setSaveWalletStatus] = useState('none')

    const [isAllowedToSpin, setIsAllowedToSpin] = useState(true)
    const [isWin, setIsWin] = useState(false)
    const [isWinConfettiEnabled, setIsWinConfettiEnabled] = useState(false)
    const [isCongratulationShown, setIsCongratulationShown] = useState(false)

    const chance_to_win_in_percent = 100,
        icons_amount = 9,
        icon_width = 128,
        spin_speed_multiplier = 75,
        time_difference_between_reel_stops = 300,
        // overall_one_spin_time = 3400,
        overall_one_spin_time = 1,
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

    const spinBtnRef = useRef(null)
    const congratsBlockRef = useRef(null)
    const loadingCircle = useRef(null)

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
        const sound = document.getElementById('run-slots-sound')
        sound.play()
        setDebugIdx(debugIdx + 1)
        setSpinsAmount(spinAmount + 1)
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
        if (isWin) {
            return
        }
        setIsWin(true)
        const sound = document.getElementById('win-in-slots-sound')
        sound.play()
        setIsAllowedToSpin(false)
        setTimeout(() => {
            reel.style.transition = spin_animation
            let final_position_with_price
            if (spinAmount < 7) {
                final_position_with_price =
                    image_init_step + full_round * 3 * spinAmount + full_round
            } else {
                final_position_with_price =
                    image_init_step + full_round * 3 * spinAmount - full_round
            }
            reel.style.backgroundPositionY = `${final_position_with_price}px`
        }, idx * time_difference_between_reel_stops)
        setTimeout(() => {
            setIsWinConfettiEnabled(true)
        }, 3300)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsWinConfettiEnabled(false)
            setIsCongratulationShown(true)
        }, 1500)
    }, [isWinConfettiEnabled])

    function spinAll() {
        if (!isAllowedToSpin) {
            return
        }
        setTimeout(() => {
            setIsAllowedToSpin(true)
        }, overall_one_spin_time)
        setIsAllowedToSpin(false)

        if (!reel_1_ref.current || !reel_2_ref.current || !reel_3_ref.current) {
            return
        }
        const win_condition =
            Math.random() <= chance_to_win_in_percent / 100 && spinAmount >= 2
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

    // function SlotMachine() {
    //     return (
    //         <>
    //             <img
    //                 src="images/kaz/get-3-wins-in-a-row.png"
    //                 width="30%"
    //                 className="absolute left-12"
    //             />
    //             <div
    //                 id="slot-machine-holder"
    //                 className="flex h-fit w-fit flex-col items-center"
    //             >
    //                 <img
    //                     src="images/kaz/slot-full-beta.png"
    //                     width="580px"
    //                     className="z-30 mt-6 shadow-black"
    //                 />
    //                 <div
    //                     id="reels-holder"
    //                     className="absolute mt-[15em] flex w-[29.8rem] justify-around"
    //                 >
    //                     <div className="reel" ref={reel_1_ref} />
    //                     <div className="reel" ref={reel_2_ref} />
    //                     <div className="reel" ref={reel_3_ref} />
    //                 </div>
    //                 <div id="slots-bg"></div>
    //             </div>
    //         </>
    //     )
    // }

    function SaveWalletStatus(props) {
        const map = {
            ok: <p className={'absolute ml-2 text-5xl text-green-500'}>✓</p>,
            bad: (
                <p className={'absolute ml-2 pt-[7px] text-2xl text-green-500'}>
                    ❌
                </p>
            ),
            loading: (
                <Lottie
                    className={'absolute z-50 w-12 p-0'}
                    path={'lotties/kaz/loading-circle.json'}
                    loop={true}
                    autoplay={true}
                />
            ),
            none: <div />,
        }
        return map[props.type]
    }

    function showSaveWalletTransactionStatus() {
        setSaveWalletStatus('loading')
        setTimeout(() => {
            const fiftyFifty = ['ok', 'bad']
            setSaveWalletStatus(fiftyFifty[parseInt(Math.random() * 2)])
        }, 1000)
        setTimeout(() => {
            setSaveWalletStatus('none')
        }, 5000)
    }

    function CongratsMessage() {
        return (
            <div
                id="congratulation-message-holder"
                ref={congratsBlockRef}
                className="z-50 mt-[-10%] flex h-fit w-1/2 flex-col justify-between gap-10 rounded-2xl bg-[#692931] px-9 pb-5 text-white"
            >
                <div className="flex w-full justify-end">
                    <div
                        id="congrats-message-close-sign"
                        className="absolute mr-[-22px] select-none pb-3 font-mono text-6xl font-bold hover:cursor-pointer"
                        onClick={() => {
                            congratsBlockRef.current.style.display = 'none'
                        }}
                    >
                        x
                    </div>
                </div>
                <h2 className="text-center font-nav-bar text-6xl text-[#FFFF00]">
                    CONGRATULATIONS!
                </h2>
                <div className="mt-[-18px] flex w-full items-center justify-center">
                    <p
                        className={
                            'w-5/6 text-justify text-4xl font-bold'
                            // 'w-5/6 text-center text-4xl font-bold'
                        }
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam sit amet pretium dolor. Nam cursus urna erat,
                        vitae mollis nibh laoreet eu. Ut fermentum dolor sed
                        scelerisque gravida. In leo ex, maximus placerat dictum
                        sit amet, bibendum in mi. Duis mollis eu diam non
                        fringilla.
                    </p>
                </div>
                <div className="flex h-fit w-full items-center justify-center">
                    <div className="mr-[-1.5%] flex h-12 w-[90%] gap-3">
                        <input
                            className="flex-grow-[12] rounded-md pl-3 text-[1.2em] text-black"
                            placeholder="enter your wallet here"
                        />
                        <button
                            className="flex-grow rounded-md bg-[#5D161E] transition-colors hover:bg-red-500"
                            style={{
                                boxShadow:
                                    'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
                            }}
                            onClick={() => {
                                /* show lottie*/
                            }}
                        >
                            <p
                                className="pr-1 pt-2 font-nav-bar text-3xl font-bold text-[#FFFF00]"
                                onClick={showSaveWalletTransactionStatus}
                            >
                                SUBMIT
                            </p>
                        </button>
                        <div
                            ref={loadingCircle}
                            className="relative h-fit w-fit"
                        >
                            <SaveWalletStatus type={saveWalletStatus} />
                        </div>
                    </div>
                </div>
            </div>
        )
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
                        width="580px"
                        className="z-30 mt-6 shadow-black"
                    />
                    <div
                        id="reels-holder"
                        className="absolute mt-[15em] flex w-[29.8rem] justify-around"
                    >
                        <div className="reel" ref={reel_1_ref} />
                        <div className="reel" ref={reel_2_ref} />
                        <div className="reel" ref={reel_3_ref} />
                    </div>
                    <div id="slots-bg"></div>
                </div>
                <button className="spin-btn" onClick={spinAll} ref={spinBtnRef}>
                    SPIN!
                </button>
                {isWinConfettiEnabled ? (
                    <div
                        id="confetti-holder"
                        className="absolute flex h-full w-full items-center justify-center"
                    >
                        <Lottie
                            className={'z-50 mt-[-20em] scale-150 bg-pink-400'}
                            path={'lotties/kaz/confetti.json'}
                            loop={false}
                            autoplay={true}
                        />
                    </div>
                ) : (
                    <div />
                )}
                {/*{isCongratulationShown ? (*/}
                <div className="absolute flex h-full w-full items-center justify-center">
                    <CongratsMessage />
                </div>
                {/*) : (  <div />*/}
                {/*)}*/}
                <img
                    src="images/kaz/win-big.png"
                    width="30%"
                    className="absolute right-20 mt-[400px]"
                />
                {isWin && !isCongratulationShown ? (
                    <div className="m-0 flex w-full items-center justify-center p-0">
                        <p
                            className="absolute select-none text-white opacity-50 transition-all hover:cursor-pointer hover:opacity-100"
                            onClick={() => {
                                congratsBlockRef.current.style.display = 'flex'
                            }}
                        >
                            Open win message again.
                        </p>
                    </div>
                ) : (
                    <div />
                )}
            </div>
            <audio
                id="run-slots-sound"
                src="sounds/play.mp3"
                preload="auto"
            ></audio>
            <audio
                id="win-in-slots-sound"
                src="sounds/play-win.mp3"
                preload="auto"
            ></audio>
        </div>
    )
}
