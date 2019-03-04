import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { getMonthById } from '../../../utils/dateHelper';

const options = {
  maintainAspectRatio: false,
  responsive: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: function(value) {
            if (parseInt(value) >= 1000) {
              return (
                '$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              );
            } else {
              return '$ ' + value;
            }
          },
        },
      },
    ],
  },
};

const LineChart = ({ filter, brands, replenish }) => {

  const totalIncome = () => {
    const result = [];

    for(let i=0; i < brands.length; i++) {
      result.push(+brands[i].total_income + +replenish[i].total_income);
    }

    return result;
  };

  const getData = () => {
    return {
        labels: brands.map((item) => {
          return filter === 'last_year' ? getMonthById(item.date) : item.date;
        }),
        datasets: [
        {
          label: 'Replenish income',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#303f9f',
          borderColor: '#303f9f',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(48,63,159)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(48,63,159)',
          pointHoverBorderColor: 'rgb(48,63,159)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 5,
          data: replenish.map((item) => {
            return item.total_income;
          }),
        },
        {
          label: 'Drop income',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#d50000',
          borderColor: '#d50000',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#d50000',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#d50000',
          pointHoverBorderColor: '#d50000',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 5,
          data: brands.map((item) => {
            return item.total_income;
          }),
        },
        {
          label: 'Total income',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#388e3c',
          borderColor: '#388e3c',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#388e3c',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#388e3c',
          pointHoverBorderColor: '#388e3c',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 5,
          data: totalIncome(),
        },
      ],
    };
  };

  return (
    <div>
      <Line
        options={options} width={560}
        height={200} data={getData()}
      />
    </div>
  );
};

export default LineChart;

LineChart.propTypes = {
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  brands: PropTypes.array.isRequired,
  replenish: PropTypes.array.isRequired,
};

