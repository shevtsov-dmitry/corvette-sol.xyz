import { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNavBarDimmed } from '../../../store/navBarSlice.js'
import ProgressBar from '../../ProgressBar/ProgressBar.jsx'

export default function Kaz() {
    const serverHostState = useSelector((state) => state.serverHost)
    const SERVER_HOST = serverHostState.serverHost

    const [debugIdx, setDebugIdx] = useState(0)
    const [spinAmount, setSpinsAmount] = useState(0)

    const [isAllowedToSpin, setIsAllowedToSpin] = useState(true)
    const [isWin, setIsWin] = useState(false)
    const [isWinConfettiEnabled, setIsWinConfettiEnabled] = useState(false)
    const [isCongratulationVisible, setIsCongratulationVisible] =
        useState(false)
    const [isUserSavedWallet, setIsUserSavedWallet] = useState(false)
    const [isAllowedToChangeSpinBtnScale, setIsAllowedToChangeSpinBtnScale] =
        useState(true)

    const chance_to_win_in_percent = Math.floor(1/13 * 100),
        icons_amount = 9,
        icon_width = 128,
        spin_speed_multiplier = 75,
        time_difference_between_reel_stops = 300,
        overall_one_spin_time = 3500,
        full_round = 1488,
        image_init_step = 50,
        step_between_icons = 40,
        delta = 30

    const spin_animation = `background-position-y ${(2 + delta) * spin_speed_multiplier}ms cubic-bezier(.41,-0.01,.63,1.09)`

    const reel_1_ref = useRef()
    const reel_2_ref = useRef()
    const reel_3_ref = useRef()
    const reels = [reel_1_ref.current, reel_2_ref.current, reel_3_ref.current]

    const currentSectionWindowRef = useRef(null)
    const spinBtnRef = useRef(null)
    const loadingCircleRef = useRef(null)
    const openWinMessageAgainRef = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!reel_1_ref.current || !reel_2_ref.current || !reel_3_ref.current) {
            return
        }
        const reel_positions = createRandomReelPositionsArray()
        reel_1_ref.current.style.backgroundPositionY = `${reel_positions[0]}px`
        reel_2_ref.current.style.backgroundPositionY = `${reel_positions[1]}px`
        reel_3_ref.current.style.backgroundPositionY = `${reel_positions[2]}px`
    }, [])

    useEffect(() => {
        if (!isWinConfettiEnabled) {
            return
        }
        setTimeout(() => {
            setIsWinConfettiEnabled(false)
            setIsCongratulationVisible(true)
        }, 1500)
    }, [isWinConfettiEnabled])

    useEffect(() => {
        if (isWin && isCongratulationVisible) {
            dispatch(setIsNavBarDimmed(true))
        } else {
            dispatch(setIsNavBarDimmed(false))
        }
    }, [isWin, isCongratulationVisible])

    useEffect(() => {
        if (currentSectionWindowRef) {
            setIsAllowedToChangeSpinBtnScale(
                currentSectionWindowRef.current.offsetWidth > 1000
            )
        }
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
        setIsWin(true)
        setIsAllowedToSpin(false)

        const sound = document.getElementById('win-in-slots-sound')
        sound.play()

        setTimeout(() => {
            reel.style.transition = spin_animation
            let final_position_with_price =
                image_init_step + full_round * 3 * spinAmount + full_round
            // if (spinAmount < 8) {
            //     final_position_with_price =
            //         image_init_step + full_round * 3 * spinAmount + full_round
            // } else {
            //     final_position_with_price =
            //         image_init_step + full_round * 3 * spinAmount - full_round
            // }
            reel.style.backgroundPositionY = `${final_position_with_price}px`
        }, idx * time_difference_between_reel_stops)

        setTimeout(() => {
            setIsWinConfettiEnabled(true)
        }, 3300)
    }

    function spinAll() {
        if (!isAllowedToSpin || isWin) {
            return
        }
        setTimeout(() => {
            if (isAllowedToChangeSpinBtnScale) {
                spinBtnRef.current.style.scale = '100%'
            }
            setIsAllowedToSpin(true)
        }, overall_one_spin_time)
        setIsAllowedToSpin(false)

        if (isAllowedToChangeSpinBtnScale) {
            spinBtnRef.current.style.scale = '75%'
        }

        if (!reel_1_ref.current || !reel_2_ref.current || !reel_3_ref.current) {
            return
        }
        const win_condition =
            Math.random() <= chance_to_win_in_percent / 100 && spinAmount > 2
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

    function CongratsMessage() {
        const loadingTime = 1000
        const [placeholderMessage, setPlaceholderMessage] = useState(
            'enter you wallet here'
        )
        const [resp, setResp] = useState(null)
        const [responseIconType, setResponseIconType] = useState('none')
        const [isAbleToSubmitForm, setIsAbleToSubmitForm] = useState(true)

        const walletInputRef = useRef()

        function SaveWalletStatusIcon(props) {
            const map = {
                ok: (
                    <p className={'absolute ml-2 text-5xl text-green-500'}>✓</p>
                ),
                bad: (
                    <p
                        className={
                            'absolute ml-2 pt-[7px] text-2xl text-green-500'
                        }
                    >
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
            return (
                <div className={'absolute mb-[4.5rem] ml-[60px]'}>
                    {map[props.type]}
                </div>
            )
        }

        async function saveUserWallet() {
            if (!isAbleToSubmitForm || isUserSavedWallet) {
                return
            }
            let userWalletValue = ''
            if (walletInputRef.current) {
                userWalletValue = walletInputRef.current.value
                walletInputRef.current.value = ''
            }
            if (userWalletValue === '') {
                return
            }
            setResponseIconType('loading')
            const checkResp = await fetch(
                SERVER_HOST + '/wallets/check/' + userWalletValue
            )
            if (checkResp.status === 409) {
                showSaveWalletTransactionStatusIcon(checkResp.status)
                setResp(checkResp)
            } else if (checkResp.status === 404) {
                const saveResp = await fetch(
                    SERVER_HOST + '/wallets/save/' + userWalletValue,
                    {
                        method: 'POST',
                    }
                )
                setResp(saveResp)
                showSaveWalletTransactionStatusIcon(saveResp.status)
                setIsAbleToSubmitForm(false)
            } else if (checkResp.status === 400) {
                showSaveWalletTransactionStatusIcon(checkResp.status)
                setResp(checkResp)
            } else {
                showSaveWalletTransactionStatusIcon(checkResp.status)
                setResp(checkResp)
            }

            function showSaveWalletTransactionStatusIcon(status) {
                setTimeout(() => {
                    if (status === 200) {
                        setResponseIconType('ok')
                    } else {
                        setResponseIconType('bad')
                    }
                }, loadingTime)
            }
        }

        useEffect(() => {
            if (responseIconType !== 'ok' && responseIconType !== 'bad') {
                return
            }
            if (resp.status === 200) {
                setPlaceholderMessage('the wallet was successfully saved')
            } else if (resp.status === 409) {
                setPlaceholderMessage('the wallet was already saved')
            } else if (resp.status === 400) {
                setPlaceholderMessage('invalid wallet format')
            } else {
                setPlaceholderMessage(
                    'undefined problem happened in the server'
                )
            }
        }, [responseIconType])

        return (
            <div
                id="congratulation-message-holder"
                className={
                    'max-laptop:mt-25% z-40 mt-[-10%] flex h-fit w-[45%] flex-col justify-between gap-10 rounded-2xl ' +
                    'bg-[#692931] pb-5 text-white max-laptop:mt-0 max-laptop:scale-75 max-mobile:w-[90%]'
                }
                style={{
                    boxShadow:
                        'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
                }}
            >
                <div className="flex w-full justify-end">
                    <div
                        id="congrats-message-close-sign"
                        className="absolute mr-3 select-none pb-3 font-mono text-6xl font-bold hover:cursor-pointer max-mobile:text-3xl"
                        onClick={() => {
                            dispatch(setIsNavBarDimmed(true))
                            setIsUserSavedWallet(!isAbleToSubmitForm)
                            setIsCongratulationVisible(false)
                            openWinMessageAgainRef.current.style.display =
                                'block'
                        }}
                    >
                        x
                    </div>
                </div>
                <h2 className="text-center font-nav-bar text-6xl text-[#FFFF00] max-laptop:text-5xl max-mobile:text-[1.5rem]">
                    CONGRATULATIONS!
                </h2>
                <div className="mt-[-18px] flex w-full items-center justify-center">
                    <p
                        className={
                            'w-5/6 text-center text-4xl font-bold leading-[1.4em] max-laptop:text-3xl max-mobile:text-[1rem] max-mobile:leading-normal'
                        }
                    >
                        You've won your share in our token airdrop. Enter your
                        wallet so we could record it. <br />
                        To get more info about the airdrop conditions, check on
                        our socials.
                        <br /> Also look into 'Tokenomics' section. It contains
                        some important diagrams that shows the{' '}
                        <span className={'font-bold text-amber-500'}>
                            $CORVETTE
                        </span>{' '}
                        distribution.
                    </p>
                </div>
                <div className="flex h-fit w-full items-center justify-center max-mobile:mt-[-2em]">
                    <div className="mr-[-1.5%] flex h-12 w-[90%] gap-2 max-mobile:flex-col max-mobile:gap-[0]">
                        <input
                            ref={walletInputRef}
                            type={'text'}
                            className="flex-grow-[12] rounded-md pl-3 text-[1.2em] text-black"
                            placeholder={placeholderMessage}
                        />
                        <div
                            className={
                                'relative flex h-5 flex-grow-[0] items-end bg-blue-100'
                            }
                        >
                            <SaveWalletStatusIcon type={responseIconType} />
                        </div>
                        <button
                            className="flex-grow rounded-md bg-[#5D161E] transition-colors hover:bg-red-500 max-mobile:scale-75"
                            style={{
                                boxShadow:
                                    'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
                            }}
                            onClick={saveUserWallet}
                        >
                            <p className="pr-1 pt-2 font-nav-bar text-3xl font-bold text-[#FFFF00]">
                                SUBMIT
                            </p>
                        </button>
                        <div
                            ref={loadingCircleRef}
                            className="relative h-fit w-fit"
                        ></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className="max-w-dvw flex h-dvh items-center justify-center"
            ref={currentSectionWindowRef}
        >
            {isWin && isCongratulationVisible ? (
                <div
                    id="black-dimmed-transparent-bg"
                    className={
                        't-0 l-0 absolute z-40 h-screen w-screen bg-black opacity-70'
                    }
                />
            ) : (
                <div />
            )}
            <div
                id="centered-holder"
                className="flex h-fit w-fit flex-col items-center"
            >
                <Lottie
                    className={
                        'absolute left-[8%] top-[20%] scale-[200%] max-laptop:left-[4%] max-laptop:scale-[155%] ' +
                        'max-mobile:top-2 max-mobile:scale-100'
                    }
                    path={'lotties/kaz/get-3-wins.json'}
                    loop={false}
                    autoplay={true}
                />

                <div
                    id="slot-machine-holder"
                    className="mt-[17%] flex h-fit w-fit flex-col items-center max-laptop:scale-75"
                >
                    <img
                        src="images/kaz/slot-full-beta.png"
                        width="580px"
                        className="z-30 mt-6 shadow-black"
                    />
                    <div
                        id="reels-holder"
                        className="absolute mt-[15em] flex w-[29.8rem] justify-around max-mobile:mt-[33%] max-mobile:w-fit max-mobile:scale-[60%] max-mobile:gap-11"
                    >
                        <div className="reel" ref={reel_1_ref} />
                        <div className="reel" ref={reel_2_ref} />
                        <div className="reel" ref={reel_3_ref} />
                    </div>
                    <div id="slots-bg" />
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
                            className={'z-40 mt-[-20em] scale-150'}
                            path={'lotties/kaz/confetti.json'}
                            loop={false}
                            autoplay={true}
                        />
                    </div>
                ) : (
                    <div />
                )}

                {isWin && isCongratulationVisible ? (
                    <div className="absolute mt-[-2%] flex h-full w-screen items-center justify-center">
                        <CongratsMessage />
                    </div>
                ) : (
                    <div />
                )}

                <Lottie
                    className={
                        'absolute bottom-[-4%] right-[-11%] max-laptop:bottom-[-15%] max-laptop:right-[-19%] max-laptop:scale-75 max-mobile:hidden'
                    }
                    path={'lotties/kaz/claim-your-airdrop.json'}
                    loop={false}
                    autoplay={true}
                />

                <div className="m-0 flex w-full items-center justify-center p-0">
                    <p
                        className="absolute z-30 select-none text-white opacity-50 transition-all hover:cursor-pointer hover:opacity-100 max-laptop:mt-[-2rem] max-mobile:opacity-0"
                        style={{ display: 'none' }}
                        onClick={() => {
                            setIsCongratulationVisible(true)
                            openWinMessageAgainRef.current.style.display =
                                'none'
                        }}
                        ref={openWinMessageAgainRef}
                    >
                        Open win message again.
                    </p>
                </div>
            </div>

            <div
                id={'progress-bar-holder'}
                className={
                    'absolute bottom-0 z-0 mb-[2.8%] flex w-screen items-center justify-center'
                }
            >
                <div className={'absolute w-[30%]'}>
                    <ProgressBar />
                </div>
            </div>

            <audio
                id="run-slots-sound"
                src="sounds/run-slots-machine.mp3"
                preload="auto"
            ></audio>

            <audio
                id="win-in-slots-sound"
                src="sounds/win-in-slots.mp3"
                preload="auto"
            ></audio>
        </div>
    )
}
