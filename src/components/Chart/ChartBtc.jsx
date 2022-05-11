import React, { useEffect, useRef, useState } from 'react'
import { BITCOIN_CHART } from '../../constants/api'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);


const CryptoCurrencyChart = () => {
    const [date, setDate] = useState([])
    const [btc, setBtc] = useState()
    const chartRef = useRef();

    useEffect(() => {
        fetch(BITCOIN_CHART)
            .then(res => res.json())
            .then((body) => {
                const day = []
                const btc = []
                for (let i = 0; i < body.prices.length; i++) {
                    const e = body.prices[i];
                    day.push(new Date(e[0]).toGMTString())
                    btc.push(e[1])
                }
                setDate(day)
                setBtc(btc)
            })
    }, [])

    return (
        <div>
            <Line 
                color='rgb(255, 255, 255)'
                data={{
                    labels: date?.map(e => e),
                    datasets: [{
                        label: 'BTC/USD',
                        fill: true,
                        lineTension: 0.2,
                        backgroundColor: 'rgba(255,73,217,0.46)',
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
                        data: btc?.map((e) => e)
                    }],
                }}
                ref={chartRef}
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