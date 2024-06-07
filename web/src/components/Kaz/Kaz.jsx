import { useRef } from "react";

export function Kaz() {
  const reel1 = useRef();
  const reel2 = useRef();
  const reel3 = useRef();

  return (
    <div className="min-w-dvw min-h-dvh flex justify-center items-center">
      <div id="centered-holder" className="flex flex-col items-center">
        <img src="images/kaz/try-your-luck.png" width="45%" />
        <div
          id="slot-machine-holder"
          className="w-dvw h-fit flex flex-col items-center"
        >
          <img
            src="images/kaz/slot-full-beta.png"
            width="520px"
            className="shadow-black z-20 my-8"
          />
          <div id="reels-holder" className="w-[29.5rem] absolute mt-[15em] z-50 flex justify-around">
            <div className="reel" ref={reel1}></div>
            <div className="reel" ref={reel2}></div>
            <div className="reel" ref={reel3}></div>
          </div>
        </div>
        <button className="spin-btn">SPIN!</button>
        <img src="images/kaz/get-3-wins-in-a-row.png" width="50%" />
      </div>
    </div>
  );
}
