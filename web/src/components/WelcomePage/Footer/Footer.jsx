export function Footer() {
    return (
        <div
            className={"z-50 fixed bottom-0 w-full flex justify-center mb-[1%] h-[6.5%] "}
        >
            <div id={"footer-panel"} className={"w-[67%] flex justify-between"}>
                <div id="left-icons" className={"flex gap-4"}>
                    <img
                        className={"footer-icon"}
                        src={"images/welcomePage/twitter.png"}
                    />
                    <img
                        className={"footer-icon"}
                        src={"images/welcomePage/telegram.png"}
                    />
                </div>
                <div id="right-icons" className={"flex gap-3"}>
                    <img className={"footer-icon"} src={"images/welcomePage/pill.png"}/>
                    <img
                        className={"footer-icon"}
                        src={"images/welcomePage/tensor.png"}
                    />
                </div>
            </div>
        </div>
    );
}

