import React, { useEffect, useRef, useState } from 'react'
import WelcomePage from './WelcomePage/WelcomePage.jsx'
import CarCustomization from './CarCustomization/CarCustomization.jsx'
import Kaz from './Kaz/Kaz.jsx'
import { throttle } from 'lodash/function.js'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useDispatch } from 'react-redux'
import { setIsHomeBtnVisible } from '../../store/homeBtnSlice.js'

export default function Main() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsHomeBtnVisible(false))
    }, [])

    const [curSectionNum, setCurSectionNum] = useState(0)
    const [isAllowedToScrollAgain, setIsAllowedToScrollAgain] = useState(true)

    const timeNotAllowedToScrollMs = 400
    const sections = [
        { num: 0, component: <WelcomePage /> },
        { num: 1, component: <CarCustomization /> },
        {
            num: 2,
            component: <Kaz />,
        },
    ]

    const throttledHandleScroll = throttle((event) => {
        if (!isAllowedToScrollAgain) return
        const { deltaY } = event
        setCurSectionNum((prevSection) => {
            if (deltaY > 0) {
                return Math.min(prevSection + 1, sections.length - 1)
            } else {
                return Math.max(prevSection - 1, 0)
            }
        })
        setIsAllowedToScrollAgain(false)
        setTimeout(
            () => setIsAllowedToScrollAgain(true),
            timeNotAllowedToScrollMs
        )
    }, timeNotAllowedToScrollMs)

    let touchStartY = 0
    const handleTouchStart = (event) => {
        touchStartY = event.touches[0].clientY
    }
    const handleTouchEnd = (event) => {
        const touchEndY = event.changedTouches[0].clientY
        if (
            touchStartY - touchEndY > 50 &&
            curSectionNum < sections.length - 1
        ) {
            setCurSectionNum(curSectionNum + 1)
        } else if (touchEndY - touchStartY > 50 && curSectionNum > 0) {
            setCurSectionNum(curSectionNum - 1)
        }
    }

    useEffect(() => {
        window.addEventListener('wheel', throttledHandleScroll, {
            passive: false,
        })
        window.addEventListener('touchstart', handleTouchStart, {
            passive: false,
        })
        window.addEventListener('touchend', handleTouchEnd, { passive: false })
        return () => {
            window.removeEventListener('wheel', throttledHandleScroll)
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchend', handleTouchEnd)
        }
    }, [throttledHandleScroll])

    const components = [
        { component: <WelcomePage />, ref: useRef(null) },
        {
            component: <CarCustomization />,
            ref: useRef(null),
        },
        { component: <Kaz />, ref: useRef(null) },
    ]

    const currentRef = components[curSectionNum].ref

    return (
        <>
            <div
                className={
                    'fixed top-[15%] z-50 flex w-dvw scale-[50%] items-center justify-center max-mobile:scale-[35%] max-mobile:mt-[-10%]'
                }
            >
                {curSectionNum !== 0 ? (
                    <img
                        id={'up-arrow'}
                        className={
                            'absolute contrast-[.2] transition-all hover:cursor-pointer hover:contrast-125 max-laptop:w-24 ml-4 max-mobile:ml-0'
                        }
                        src={'images/main/up-arrow.png'}
                        alt={'swipe down'}
                        onClick={() => setCurSectionNum(curSectionNum - 1)}
                    />
                ) : (
                    <div />
                )}
            </div>
            <SwitchTransition>
                <CSSTransition
                    key={curSectionNum}
                    nodeRef={currentRef}
                    timeout={{
                        appear: 300,
                        enter: 300,
                        exit: 200,
                    }}
                    addEndListener={(done) => {
                        currentRef.current.addEventListener(
                            'transitionend',
                            done,
                            false
                        )
                    }}
                    classNames="swipe"
                >
                    <div ref={currentRef}>
                        {components[curSectionNum].component}
                    </div>
                </CSSTransition>
            </SwitchTransition>
            <div
                className={
                    'fixed bottom-0 z-50 mb-[-1rem] flex w-dvw scale-[50%] items-center justify-center max-mobile:scale-[35%]'
                }
            >
                {curSectionNum !== sections.length - 1 ? (
                    <img
                        id={'down-arrow'}
                        className={
                            'contrast-[.2] transition-all hover:cursor-pointer hover:contrast-125 max-laptop:w-24'
                        }
                        src={'images/main/down-arrow.png'}
                        alt={'swipe down'}
                        onClick={() => setCurSectionNum(curSectionNum + 1)}
                    />
                ) : (
                    <div />
                )}
            </div>
        </>
    )
}
