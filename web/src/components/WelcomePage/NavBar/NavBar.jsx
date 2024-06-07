import Lottie from "lottie-react";

export function NavBar() {
  return (
    <div className="relative flex gap-4 flex-col w-dvw h-fit justify-center items-center">
      <header className="flex justify-around">
        <div id="nav-bar" className="w-fit flex justify-center items-end ">
          <div className="nav-btn-holder">
            <futton className="nav-btn">ROADMAP</futton>
            <button className="nav-btn">ABOUT US</button>
          </div>
          <div
            id="wheel-holder"
            className="relative w-[7%] mx-12 mt-[1%] mb-[-1.3%]"
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
      <img src="images/welcomePage/nav-bar-hr.png" width={"67%"} />
    </div>
  );
}
