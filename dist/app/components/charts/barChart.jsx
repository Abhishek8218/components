'use client';
import 'chartjs-plugin-style';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { chartData } from './chart-data';
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
export var BarChart = function () {
    // Custom plugin for background color
    var plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDatasetsDraw: function (chart, easing, plugins) {
            var ctx = chart.ctx, _a = chart.chartArea, top = _a.top, bottom = _a.bottom, left = _a.left, right = _a.right, width = _a.width, height = _a.height, _b = chart.scales, x = _b.x, y = _b.y;
            ctx.save();
            ctx.fillStyle = 'rgba(251, 85, 85, 0.4)';
            ctx.fillRect(left, top, width, height);
        }
    };
    var options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
            tooltip: {
                backgroundColor: 'white',
                titleColor: 'black',
                borderColor: '#B4B4B8',
                borderWidth: 1,
                bodyColor: 'black',
            },
            chartArea: {
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
            },
            customCanvasBackgroundColor: {
                backgroundColor: 'rgba(251, 85, 85, 0.4)'
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Hide x-axis grid lines
                },
            },
            y: {
                grid: {
                    display: false, // Hide y-axis grid lines
                },
            },
        },
    };
    return (<div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full h-96 bg-white shadow-md rounded-lg flex items-center justify-center">
        <Bar data={chartData} options={options} plugins={[plugin]}/>
      </div>
    </div>);
};
