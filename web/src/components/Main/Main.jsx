import React, {createRef, useEffect, useRef, useState} from "react";
import {WelcomePage} from "../WelcomePage/WelcomePage.jsx";
import CarCustomization from "../CarCustomization/CarCustomization.jsx";
import {Kaz} from "../Kaz/Kaz.jsx";
import {throttle} from "lodash/function.js";
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";
import {Route, Routes, useLocation} from "react-router-dom";

export default function Main() {
    const [curSectionNum, setCurSectionNum] = useState(0);
    const [isAllowedToScrollAgain, setIsAllowedToScrollAgain] = useState(true);

    const sections = [
        {num: 0, component: <WelcomePage/>},
        {num: 1, component: <CarCustomization/>},
        {num: 2, component: <Kaz/>},
    ];

    const mainBlockRef = useRef()

    const handleScroll = (event) => {
        if (!isAllowedToScrollAgain) return;
        const {deltaY} = event;
        setCurSectionNum((prevSection) => {
            if (deltaY > 0) {
                return Math.min(prevSection + 1, sections.length - 1);
            } else {
                return Math.max(prevSection - 1, 0);
            }
        });
        // mainBlockRef.current.scrollIntoView({ behavior: 'smooth' })
        setIsAllowedToScrollAgain(false);
        setTimeout(() => setIsAllowedToScrollAgain(true), 200);
        // if (event.deltaY > 0 && curSectionNum < sections.length - 1) {
        //     setCurSectionNum(curSectionNum + 1);
        // } else if (event.deltaY < 0 && curSectionNum > 0) {
        //     setCurSectionNum(curSectionNum - 1);
        // }
    };

    const throttledHandleScroll = throttle(handleScroll, 200);

    let touchStartY = 0;
    const handleTouchStart = (event) => {
        touchStartY = event.touches[0].clientY;
    };
    const handleTouchEnd = (event) => {
        const touchEndY = event.changedTouches[0].clientY;
        if (touchStartY - touchEndY > 50 && curSectionNum < sections.length - 1) {
            setCurSectionNum(curSectionNum + 1);
        } else if (touchEndY - touchStartY > 50 && curSectionNum > 0) {
            setCurSectionNum(curSectionNum - 1);
        }
    };

    useEffect(() => {
        //     window.addEventListener('wheel', handleScroll, {passive: false});
        window.addEventListener('wheel', throttledHandleScroll, {passive: false});
        window.addEventListener('touchstart', handleTouchStart, {passive: false});
        window.addEventListener('touchend', handleTouchEnd, {passive: false});
        return () => {

            window.removeEventListener('wheel', throttledHandleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };

    }, [throttledHandleScroll]);

    const components = [
        {component: <WelcomePage/>, ref: useRef(null)},
        {component: <CarCustomization/>, ref: useRef(null)},
        {component: <Kaz/>, ref: useRef(null)},
    ];

    const currentRef = components[curSectionNum].ref;

    return (
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
                    currentRef.current.addEventListener("transitionend", done, false);
                }}
                classNames='swipe'
            >
                <div ref={currentRef}>
                    {components[curSectionNum].component}
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
}