import {useRef} from "react";

export function Kaz() {
    const reel1Ref = useRef();
    const reel2Ref = useRef();
    const reel3Ref = useRef();

    return (<div className="min-w-dvw min-h-dvh flex justify-center items-center">
            <div id="centered-holder" className="flex flex-col items-center">
                <img src="images/kaz/try-your-luck.png" width="45%"/>
                <div
                    id="slot-machine-holder"
                    className="w-dvw h-fit flex flex-col items-center"
                >
                    <img
                        src="images/kaz/slot-full-beta.png"
                        width="520px"
                        className="shadow-black z-20 my-8"
                    />
                    <div id="reels-holder" className="w-[29.5rem] absolute mt-[15em] z-10 flex justify-around">
                        <div className="reel" ref={reel1Ref}></div>
                        <div className="reel" ref={reel2Ref}></div>
                        <div className="reel" ref={reel3Ref}></div>
                    </div>
                </div>
                <button className="spin-btn" onClick={spinAll}>SPIN!</button>
                <img src="images/kaz/get-3-wins-in-a-row.png" width="50%"/>
            </div>
        </div>);


    function spinOne(reel, offset = 0) {
        // Minimum of 2 + the reel offset rounds
        const icons_amount =  9,
            icon_width = 128,
            spin_time = 1,
            step_between_icons = 40;
        // const delta = (offset + 2) * icons_amount + Math.round(Math.random() * icons_amount);
        const delta = 30;
        return new Promise((resolve, reject) => {
            const style = getComputedStyle(reel), // Current background position
                backgroundPositionY = parseFloat(style["background-position-y"]), // Target background position
                targetBackgroundPositionY = backgroundPositionY + delta * icon_width, // Normalized background position, for reset
                normTargetBackgroundPositionY = targetBackgroundPositionY % (icons_amount * icon_width);
            // let startup_idx = Math.round(Math.random() * icons_amount ) * icon_width
            // console.log(startup_idx)
            // reel.style.backgroundPositionY = `${startup_idx}px`
             // Delay animation with timeout, for some reason a delay in the animation property causes stutter
            setTimeout(() => {
                // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
                reel.style.transition = `background-position-y ${(2 + delta) * spin_time}ms cubic-bezier(.41,-0.01,.63,1.09)`;
                console.log(backgroundPositionY + delta * icon_width - step_between_icons)
                reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_width - step_between_icons}px`;
            }, offset * 150);

            // After animation
            // setTimeout(() => {
            //     // Reset position, so that it doesn't get higher without limit
            //     reel.style.transition = `none`;
            //     reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
            //     // Resolve this promise
            //     resolve(delta % icons_amount);
            // }, (8 + delta) * spin_time + offset * 150);
        });
    }

    function spinAll() {
        const iconMap = [], num_icons = 9, indexes = [0, 0, 0];
        if (reel1Ref.current === undefined) {
            return
        }
        const reelsList = [reel1Ref.current, reel2Ref.current, reel3Ref.current];
        // Activate each reel, must convert NodeList to Array for this with spread operator
        // When all reels done animating (all promises solve)

        Promise
            .all([...reelsList].map((reel, i) => spinOne(reel, i)))
            .then((deltas) => {
                // add up indexes
                deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta) % num_icons);
                // debugEl.textContent = indexes.map((i) => iconMap[i]).join(' - ');

                // Win conditions
                // if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {
                //     const winCls = indexes[0] == indexes[2] ? "win2" : "win1";
                //     document.querySelector(".slots").classList.add(winCls);
                //     setTimeout(() => document.querySelector(".slots").classList.remove(winCls), 2000)
                // }

                // spin Again!
                // setTimeout(spinAll, 3000);
            });
    }

// // Kickoff
// setTimeout(spinAll, 1000);
}