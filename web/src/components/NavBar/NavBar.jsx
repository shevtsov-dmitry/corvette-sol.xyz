import Lottie from "lottie-react";
import lowNonstopWheel from "../../assets/lottie-low-nonstop-whell.json";

export function NavBar() {
  return (
    <>
      <header className="flex justify-center items-center fixed w-dvw h-fit">
        <div id="nav-bar" className="w-[80%] flex justify-center items-end">
          <div className="nav-btn-holder">
            <button className="nav-btn">ROADMAP</button>
            <button className="nav-btn">ABOUT US</button>
          </div>
          <div
            id="wheel-holder"
            className="max-w-24 max-h-24 mx-12 mt-[1%] mb-[-10px]"
          >
            <Lottie
              animationData={lowNonstopWheel}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="nav-btn-holder">
            <button className="nav-btn">GARAGE</button>
            <button className="nav-btn">OUR MERCH</button>
          </div>
        </div>
      </header>
      <img src="../../assets/mainunderline.png" />
    </>
  );
}
