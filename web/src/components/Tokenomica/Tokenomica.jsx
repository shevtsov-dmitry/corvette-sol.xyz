import { Pie } from 'react-chartjs-2'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsHomeBtnVisible } from '../../store/homeBtnSlice.js'

export default function Tokenomica() {
    const currentSectionRef = useRef()

    const [chartFontSize, setChartFontSize] = useState(18)

    const [data, setData] = useState([
        { name: 'AIRDROP', percentage: 3 },
        { name: 'TEAM', percentage: 10 },
        { name: 'MARKETING', percentage: 2 },
        { name: 'PUBLIC', percentage: 85 },
    ])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsHomeBtnVisible(true))
        if (!currentSectionRef.current) {
            return
        }
        if (currentSectionRef.current.offsetWidth < 1000) {
            setChartFontSize(15)
        }
    }, [])

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

    function Chart() {
        const chartData = {
            labels: data.map((item) => item.name),
            datasets: [
                {
                    data: data.map((item) => item.percentage),
                    backgroundColor: [
                        '#FF6384',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                        '#36A2EB',
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                        '#36A2EB',
                    ],
                },
            ],
        }

        const options = {
            labels: {
                color: 'white',
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white', // Change the color here
                        font: {
                            family: 'sans-serif',
                            size: chartFontSize - 1, // Optional: change the font size
                        },
                    },
                },
                datalabels: {
                    formatter: (value, context) => {
                        const label =
                            context.chart.data.labels[context.dataIndex]
                        return `${value}%`
                    },
                    color: 'black', // Label text color
                    font: {
                        size: chartFontSize, // Optional: change the font size
                        family: 'Verdana, sans',
                        weight: 'bold',
                    },
                    // display: "auto",
                },
            },
        }

        return <Pie data={chartData} options={options} />
    }

    function updateChart(type) {
        if (type === 'before') {
            setData([
                { name: 'AIRDROP', percentage: 3 },
                { name: 'TEAM', percentage: 10 },
                { name: 'MARKETING', percentage: 2 },
                { name: 'PUBLIC', percentage: 85 },
            ])
        } else {
            setData([
                { name: 'TEAM', percentage: 7 },
                { name: 'MARKETING', percentage: 1 },
                { name: 'PUBLIC', percentage: 92 },
            ])
        }
    }

    return (
        <div
            className="flex h-dvh w-dvw items-end justify-end"
            ref={currentSectionRef}
        >
            <div className="mb-[-1%] flex h-full w-full flex-col items-center justify-center">
                <div className={'mb-2 flex rounded'}>
                    <button
                        className="before-after-btn"
                        onClick={() => updateChart('before')}
                    >
                        PUMPFUN
                    </button>
                    <button
                        className="before-after-btn"
                        onClick={() => updateChart('after')}
                    >
                        RAYDIUM
                    </button>
                </div>
                <div
                    id="chart-holder"
                    className="flex h-[60%] w-[60%] items-center justify-center max-mobile:h-[60%] max-mobile:w-full"
                >
                    <Chart />
                </div>
            </div>
        </div>
    )
}
