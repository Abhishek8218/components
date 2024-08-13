

export const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales 2020 (M)',
        data: [3, 2, 2, 1, 5, 6, 7],
        borderColor: ['rgba(255, 206, 86, 0.2)'],
        backgroundColor: ['red'],
        pointBackgroundColor: 'rgba(255, 206, 86, 0.2)',
        pointBorderColor: 'rgba(255, 206, 86, 0.2)',
        borderRadius:5,
        bevelWidth: 3,

      bevelHighlightColor: 'rgba(255, 255, 255, 0.75)',

      bevelShadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      {
        label: 'Sales 2021 (M)',
        data: [1, 3, 2, 2, 3, 4, 6],
        borderColor: ['rgba(54, 162, 235, 0.2)'],
        backgroundColor: ['green'],
        pointBackgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointBorderColor: 'rgba(54, 162, 235, 0.2)',
        borderRadius:10
      },
    ],
}