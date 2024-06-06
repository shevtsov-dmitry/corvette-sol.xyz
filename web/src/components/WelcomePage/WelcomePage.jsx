import { NavBar } from "./NavBar/NavBar.jsx";
import { Footer } from "./Footer/Footer.jsx";
import Lottie from "lottie-react";

export function WelcomePage() {
  return (
    <div className="min-w-dvw min-h-dvh">
      <NavBar />
      <img
        className={"absolute w-full mt-[-3%] h-full object-contain"}
        src={"images/welcomePage/trail.png"}
      />
      <div
        className={
          "absolute flex w-dvw h-dvh justify-center mt-[-5%] items-center"
        }
      >
        <img
          className={" w-full h-full object-contain scale-50"}
          src={"images/welcomePage/vehicle.png"}
        />
      </div>
      <Lottie
        className={"absolute w-[22%] left-[21%] mt-[1%]"}
        path={"lotties/gray-corvete-welcome.json"}
        loop={false}
        autoplay={true}
      />
      <Lottie
        className={"absolute w-[48%] right-[5%] bottom-[-3%]"}
        path={"lotties/exclusevely-on-flash.json"}
        loop={false}
        autoplay={true}
      />
      <Footer />
    </div>
  );
}
