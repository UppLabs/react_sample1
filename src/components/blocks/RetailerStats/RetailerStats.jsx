import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './RetailerStats.scss';
import LineChart from '../../common/LineChart';
import HorizontalBarChart from '../../common/HorizontalBarChart';
import BarChart from '../../common/BarChart';
import { centToDollars } from '../../../utils/formatHelper';
import { groupByMonth, groupByDate } from '../../../utils/dateHelper';

class RetailerStats extends PureComponent {

  state = {
    filter: this.props.filter,
    brands: this.props.brands,
    replenish: this.props.replenish,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.filter !== prevState.filter) {
      const isMonth = nextProps.filter === 'last_year' ? true : false;
      let brands = [];
      let replenish = [];

      if(isMonth) {
        brands = groupByMonth(nextProps.brands);
        replenish = groupByMonth(nextProps.replenish);
      } else {
        const dates = groupByDate(nextProps.brands, nextProps.replenish);
        brands = dates.brands;
        replenish = dates.replenish;
      }

      return {
        brands,
        replenish,
        filter: nextProps.filter,
      };
    }

    const dates = groupByDate(nextProps.brands, nextProps.replenish);

    return {
      brands: dates.brands,
      replenish: dates.replenish,
    };
  }

  render() {
    const { totalIncome, totalItems, totalOrders, filter } = this.props;
    const { brands, replenish } = this.state;

    return (
      <div className={styles.retailerStats}>
        {brands || replenish ? 
          <div className={styles.container}>
            <div className={styles.income}>
              <h1>$ {centToDollars(totalIncome)}</h1>
              <span>Total income</span>
            </div>
            <div className={styles.basket}>
              <h1>{totalItems}</h1>
              <span>Total items</span>
            </div>
            <div className={styles.pie}>
              <h1>{totalOrders}</h1>
              <span>Total orders</span>
            </div>
          </div>
        : null}
  
        <div className={styles.chartContainer}>
          <div>
            <h3>Income</h3>
            <LineChart
              filter={filter} brands={brands}
              replenish={replenish}
            />
          </div>
          <div>
            <h3>Orders</h3>
            <HorizontalBarChart
              filter={filter} brands={brands}
              replenish={replenish}
            />
          </div>
          <div>
            <h3>Items</h3>
            <BarChart
              filter={filter} brands={brands}
              replenish={replenish}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RetailerStats;

RetailerStats.propTypes = {
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  brands: PropTypes.array.isRequired,
  replenish: PropTypes.array.isRequired,
  totalIncome: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  totalOrders: PropTypes.number.isRequired,
};
