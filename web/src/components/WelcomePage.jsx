import Lottie from "lottie-react";
import lottieFlash from "../assets/lottie-flash-exclusevely-on.json";
import lottieGrayWelcome from "../assets/lottie-gray-corvete-welcome.json";

<Lottie
  // animationData={"./assets/first.mp4.lottie.json"}
  animationData={lottieGrayWelcome}
  size={30}
  loop={false}
  autoplay={true}
/>;

export function WelcomePage() {
  return <div className="w-96 h-96"></div>;
}
