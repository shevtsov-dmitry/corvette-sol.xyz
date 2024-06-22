import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ProgressBar() {

    const [progressInPercent, setProgressInPercent] = useState(0)

    const serverHostState = useSelector((state) => state.serverHost)
    const SERVER_HOST = serverHostState.serverHost

    useEffect(() => {
        async function getProgressNum() {
            const resp = await fetch(SERVER_HOST + "/urls/get/pumpfun_bonding_curve") //env
            const percentageStr = await resp.text()
            setProgressInPercent(parseInt(percentageStr))
        }
        getProgressNum()
    }, [])

    return (
        <div className="container max-mobile:scale-75 max-mobile:mt-[-100%] max-mobile:ml-[-1.5em]">
            <p className={"text-white mb-1 max-mobile:text-[0.8em] max-mobile:text-nowrap"}>bonding curve progress: {progressInPercent}%</p>
            <div className="progress2 progress-moved" style={{
                "--progress": progressInPercent,
            }}>
                <div className="progress-bar2 " />
            </div>
        </div>
    )
}
