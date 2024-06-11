import {useEffect, useRef, useState} from "react";
import {WelcomePage} from "../WelcomePage/WelcomePage.jsx";
import CarCustomization from "../CarCustomization/CarCustomization.jsx";
import {Kaz} from "../Kaz/Kaz.jsx";

export default function Main(props) {
    const [currentSectionNum, setCurrentSectionNum] = useState(null);
    const [isScrollLocked, setIsScrollLocked] = useState(false);

    const section1 = useRef(),
        section2 = useRef(),
        section3 = useRef();
    const sections = [section1, section2, section3];

    const mainBlockRef = useRef()

    useEffect(() => {
        if(!currentSectionNum){
            return
        }
        // if (isScrollLocked) {
        //     setTimeout(()=> {
        //         setIsScrollLocked(false)
        //         console.log('unlocked')
        //     },200)
        //     return;
        // }
        console.log("scrolling")
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        const keys = {37: 1, 38: 1, 39: 1, 40: 1};
        let touchStartY = 0;

        function handleScroll(event) {
            event.preventDefault();
            if (event.deltaY > 0 && currentSectionNum < sections.length - 1) {
                setCurrentSectionNum(currentSectionNum + 1);
            } else if (event.deltaY < 0 && currentSectionNum > 0) {
                setCurrentSectionNum(currentSectionNum - 1);
            }
        }

        function handleTouchStart(event) {
            touchStartY = event.touches[0].clientY;
        }

        function handleTouchEnd(event) {
            const touchEndY = event.changedTouches[0].clientY;
            if (touchStartY - touchEndY > 50 && currentSectionNum < sections.length - 1) {
                setCurrentSectionNum(currentSectionNum + 1);
            } else if (touchEndY - touchStartY > 50 && currentSectionNum > 0) {
                setCurrentSectionNum(currentSectionNum - 1);
            }
        }

        setIsScrollLocked(true)
        window.addEventListener('wheel', handleScroll, {passive: false});
        window.addEventListener('touchstart', handleTouchStart, {passive: false});
        window.addEventListener('touchend', handleTouchEnd, {passive: false});
        sections[currentSectionNum].current.scrollIntoView({behavior: 'smooth'});

        return ()   => {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        }
    }, [currentSectionNum]);

    return <div className={"max-w-dvw h-full"} ref={mainBlockRef}>
        <div ref={section1}>
            <WelcomePage/>
        </div>
        <div ref={section2}>
            <CarCustomization/>
        </div>
        <div ref={section3}>
            <Kaz/>
        </div>
    </div>
}