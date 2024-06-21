import { useState } from 'react'

export default function ProgressBar() {

    const [progressInPercent, setProgressInPercent] = useState(33)

    return (
        <div className="container max-mobile:scale-75 max-mobile:mt-[-75%] max-mobile:ml-[-1.5em]">
            <p className={"text-white mb-1 max-mobile:text-[0.8em] max-mobile:text-nowrap"}>bonding curve progress: {progressInPercent}%</p>
            <div className="progress2 progress-moved" style={{
                "--progress": progressInPercent,
            }}>
                <div className="progress-bar2 " />
            </div>
        </div>
    )
}
