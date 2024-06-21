import { useState } from 'react'

export default function ProgressBar() {

    const [progressInPercent, setProgressInPercent] = useState(33)

    return (
        <div className="container">
            <p className={"text-white mb-1"}>bonding curve progress: {progressInPercent}%</p>
            <div className="progress2 progress-moved" style={{
                "--progress": progressInPercent,
            }}>
                <div className="progress-bar2" />
            </div>
        </div>
    )
}
