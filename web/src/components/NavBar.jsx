import Lottie from "lottie-react";
import spinningWheelNormal from "../assets/.json";

export function NavBar() {
  return (
    <header className="fixed my-[1%] w-dvw h-[10%] bg-cyan-300">
      <div id="nav-bar" className="flex">
        <div className="flex gap-3">
          <button className="">ROADMAP</button>
          <button className="">ABOUT US</button>
        </div>
        <div id="wheel-holder" className="max-w-20 max-h-20">
          <Lottie
            animationData={spinningWheelNormal}
            loop={true}
            autoplay={true}
          />
        </div>
        <div className="flex gap-3">
          <button className="">GARAGE</button>
          <button className="">OUR MERCH</button>
        </div>
      </div>
    </header>
  );
}
