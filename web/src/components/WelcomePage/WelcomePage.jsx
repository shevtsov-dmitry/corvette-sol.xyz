import {NavBar} from "./NavBar/NavBar.jsx";
import {Footer} from "./Footer/Footer.jsx";
import Lottie from "lottie-react";

export function WelcomePage() {
    return (
        <div className="max-w-dvw h-dvh">
            <NavBar/>
            <img
                className={"absolute w-full mt-[10%] object-contain"}
                src={"images/welcomePage/trail.png"}
            />
            <img
                className={" w-full h-full object-contain scale-[44%] mt-[-6em]"}
                src={"images/welcomePage/vehicle.png"}
            />
            <Lottie
                className={"absolute w-[22%] left-[21%] top-[12%] mt-[1%]"}
                path={"lotties/gray-corvete-welcome.json"}
                loop={false}
                autoplay={true}
            />
            <Lottie
                className={"absolute w-[48%] right-[5%] bottom-0"}
                path={"lotties/exclusevely-on-flash.json"}
                loop={false}
                autoplay={true}
            />
            <Footer/>
        </div>
    );
}
