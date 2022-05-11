import React, { useEffect, useState } from 'react'
import { ETHEREUM_CHART } from '../../constants/api'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const CryptoCurrencyChart = () => {
    const [date, setDate] = useState([])
    const [eth, setEth] = useState()

    useEffect(() => {
        fetch(ETHEREUM_CHART)
            .then(res => res.json())
            .then((body) => {
                const day = []
                const eth = []
                for (let i = 0; i < body.prices.length; i++) {
                    const e = body.prices[i];
                    day.push(new Date(e[0]).toGMTString())
                    eth.push(e[1])
                }
                setDate(day)
                setEth(eth)
            })
    }, [])

    return (
        <div>
            <Line
                data={{
                    labels: date?.map(e => e),
                    datasets: [{
                        label: 'ETH/USD',
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,250,192,0.5)',
                        borderDashOffset: 10.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgb(214, 196, 59)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgb(214, 196, 59)',
                        pointHoverBorderWidth: 3,
                        pointRadius: 2,
                        pointHitRadius: 10,
                        data: eth?.map((e) => e)
                    }],
                }}
                height={500}
                width={800}
                options={{
                    color: 'rgb(255, 255, 255)',
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                borderColor: 'rgb(255, 255, 255)'
                            },
                            ticks: {
                                color: 'rgb(255, 255, 255)',
                            },
                        },
                        y: {
                            grid: {
                                borderColor: 'rgb(255, 255, 255)'
                            },
                            ticks: {
                                color: 'rgb(255, 255, 255)',
                            }
                        }
                    }
                }}
            />

        </div>
    )
}

export default CryptoCurrencyChart