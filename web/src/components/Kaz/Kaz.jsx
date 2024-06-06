export function Kaz() {
  return (
    <div className="min-w-dvw min-h-dvh flex justify-center items-center">
      <div id="centered-holder" className="flex flex-col items-center">
        <img src="images/kaz/try-your-luck.png" width="45%" />
        <img
          src="images/kaz/slot-full-beta.png"
          width="55%"
          className="shadow-black"
        />
        <button className="spin-btn">SPIN!</button>
        <img src="images/kaz/get-3-wins-in-a-row.png" width="50%" />
      </div>
    </div>
  );
}
