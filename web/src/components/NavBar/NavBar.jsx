import Lottie from "lottie-react";

export function NavBar() {
  return (
    <div className="fixed flex gap-1 flex-col w-dvw h-fit">
      <header className="justify-center items-center">
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
              path={"lotties/low-nonstop-wheel.json"}
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
      <img src="images/nav-bar-hr.png" width={"80%"} />
    </div>
  );
}
