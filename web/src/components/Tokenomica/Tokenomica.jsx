import { Pie } from 'react-chartjs-2'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useState } from 'react'

export default function Tokenomica() {
    const [data, setData] = useState([
        { name: 'ETH', percentage: 15 },
        { name: 'BTC', percentage: 30 },
        { name: 'AVAX', percentage: 10 },
        { name: 'SOL', percentage: 20 },
        { name:  "DOGE", percentage: 10 },
        { name: 'CORVETTE', percentage: 15 },
    ])

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
                            size: 14, // Optional: change the font size
                        },
                    },
                },
                datalabels: {
                    formatter: (value, context) => {
                        const label =
                            context.chart.data.labels[context.dataIndex]
                        return `${label}: ${value}%`
                    },
                    color: 'white', // Label text color
                    font: {
                        size: 15, // Optional: change the font size
                        family: 'sans',
                        weight: 'bold',
                    },
                },
            },
        }

        return <Pie data={chartData} options={options} />
    }

    function updateChart(type) {
        if(type === "before") {
            setData([
                { name: 'ETH', percentage: 15 },
                { name: 'BTC', percentage: 30 },
                { name: 'AVAX', percentage: 10 },
                { name: 'SOL', percentage: 20 },
                { name:  "DOGE", percentage: 10 },
                { name: 'CORVETTE', percentage: 15 },
            ])
        } else {
            setData([

                { name: 'AVAX', percentage: 5 },
                { name: 'BTC', percentage: 25 },
                { name: 'ETH', percentage: 15 },
                { name:  "DOGE", percentage: 10 },
                { name: 'SOL', percentage: 20 },
                { name: 'CORVETTE', percentage: 25 },
            ])
        }
    }


    return (
        <div className="flex h-dvh w-dvw items-end justify-end">
            <div className="flex h-[90%] w-full flex-col items-center justify-center">
                <h1 className="mb-8 font-nav-bar text-5xl font-bold text-white">
                    CORVETTE POPULARITY
                </h1>
                <div className={'mb-2 flex rounded'}>
                    <button
                        className="before-after-btn"
                        onClick={() => updateChart('before')}
                    >
                        BEFORE
                    </button>
                    <button
                        className="before-after-btn"
                        onClick={() => updateChart('after')}
                    >
                        AFTER
                    </button>
                </div>
                <div
                    id="chart-holder"
                    className="flex h-[60%] w-[60%] items-center justify-center"
                >
                    <Chart />
                </div>
            </div>
        </div>
    )
}
