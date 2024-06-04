export function Footer() {
    return <div className={"absolute bottom-0 w-dvw flex justify-center mb-[1%]"}>
        <div id={"footer-panel"} className={"w-[67%] flex justify-between"}>
            <div id="left-icons" className={"flex gap-3"}>
                <img className={"footer-icon"} src={"images/twitter.png"}/>
                <img className={"footer-icon"} src={"images/telegram.png"}/>
            </div>
            <div id="right-icons" className={"flex gap-3"}>
                <img className={"footer-icon"} src={"images/pill.png"}/>
                <img className={"footer-icon"} src={"images/tensor.png"}/>
            </div>
        </div>
    </div>

}