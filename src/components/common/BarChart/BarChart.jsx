import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { getMonthById } from '../../../utils/dateHelper';

const options = {
    maintainAspectRatio: false,
    responsive: false,
  };

const BarChart = ({ filter, brands, replenish }) => {
  const getData = () => {
    return {
      labels: brands.map((item) => {
        return filter === 'last_year' ? getMonthById(item.date) : item.date;
      }),
      datasets: [
        {
          label: 'Dropship items',
          backgroundColor: '#f57c00',
          borderColor: '#f57c00',
          borderWidth: 1,
          hoverBackgroundColor: '#d57008',
          hoverBorderColor: '#d57008',
          data: brands.map((item) => {
            return item.total_items;
          }),
        },
        {
          label: 'Replenish items',
          backgroundColor: '#388e3c',
          borderColor: '#388e3c',
          borderWidth: 1,
          hoverBackgroundColor: '#1c7120',
          hoverBorderColor: '#1c7120',
          data: replenish.map((item) => {
            return item.total_items;
          }),
        },
      ],
    };
};

  return (
    <div>
      <Bar 
        options={options}
        width={560}
        height={200} 
        data={getData()}
      />
    </div>
  );
};

export default BarChart;

BarChart.propTypes = {
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  brands: PropTypes.array.isRequired,
  replenish: PropTypes.array.isRequired,
};
