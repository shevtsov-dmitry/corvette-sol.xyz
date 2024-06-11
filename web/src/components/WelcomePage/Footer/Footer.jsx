export function Footer() {
    return (
        <div
            className={
                'fixed bottom-0 z-40 mb-[1%] flex h-[6.5%] w-full justify-center'
            }
        >
            <div id={'footer-panel'} className={'flex w-[67%] justify-between'}>
                <div id="left-icons" className={'flex gap-4'}>
                    <img
                        className={'footer-icon'}
                        src={'images/welcomePage/twitter.png'}
                    />
                    <img
                        className={'footer-icon'}
                        src={'images/welcomePage/telegram.png'}
                    />
                </div>
                <div id="right-icons" className={'flex gap-3'}>
                    <img
                        className={'footer-icon'}
                        src={'images/welcomePage/pill.png'}
                    />
                    <img
                        className={'footer-icon'}
                        src={'images/welcomePage/tensor.png'}
                    />
                </div>
            </div>
        </div>
    )
}
