import { Pie } from 'react-chartjs-2'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'

export default function Tokenomica() {
    ChartJS.register(ArcElement, Tooltip, Legend)

    function Chart({ data }) {
        const chartData = {
            labels: data.map((item) => item.name),
            datasets: [
                {
                    data: data.map((item) => item.percentage),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                    ],
                },
            ],
        }

        const options = {
            plugins: {
                legend: {
                    labels: {
                        color: 'white', // Change the color here
                        font: {
                            size: 14, // Optional: change the font size
                        },
                    },
                },
                datalabels: {
                    color: 'white', // Label text color
                    formatter: (value, context) => {
                        const label =
                            context.chart.data.labels[context.dataIndex]
                        return `${label}: ${value}%`
                    },
                    font: {
                        size: 14, // Optional: change the font size
                    },
                },
            },
        }

        return <Pie data={chartData} options={options} />
    }

    const data = [
        { name: 'BTC', percentage: 30 },
        { name: 'ETH', percentage: 20 },
        { name: 'SOL', percentage: 25 },
        { name: 'CORVETTE', percentage: 15 },
        { name: 'XRP', percentage: 10 },
    ]

    return (
        <div className="flex h-dvh w-dvw items-end justify-end">
            <div className="flex h-[90%] w-full flex-col items-center justify-center gap-8">
                <h1 className="font-nav-bar text-5xl font-bold text-white">
                    CORVETTE POPULARITY
                </h1>
                <div
                    id="chart-holder"
                    className="flex h-[60%] w-[60%] items-center justify-center"
                >
                    <Chart data={data} />
                </div>
            </div>
        </div>
    )
}
