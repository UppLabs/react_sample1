import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  getReplenishOrders, 
  setReplenishOrdersSort, 
  setReplenishOrdersSearchById, 
  setReplenishOrdersOffset, 
  getReplenishOrdersFilters,
} from '../../store/actions/replenishOrders';
import Spinner from '../../components/common/Spinner';
import Toolbar from '../../components/common/Toolbar';
import OrdersTable from '../../components/blocks/OrdersTable';

class ReplenishOrdersContainer extends PureComponent {

  componentDidMount() {
    this.props.getOrders();
    this.props.getOrdersFilters();
  }

  render() {
    const { 
      data,
      isLoading,
    } = this.props; 

    return isLoading ? <Spinner /> : ( data.length >= 0 ?
      <Fragment>
        <Toolbar name="Orders" />
        <OrdersTable {...this.props} />
      </Fragment>
      : null );
  }
}

const mapStateToProps = (state) => {
  const { 
    data, 
    isLoading, 
    retailers, 
    order, 
    offset, 
    perPage, 
    count, 
    sort, 
    statusCount,
  } = state.replenishOrders;

  return {
    data,
    isLoading,
    retailers,
    order,
    offset,
    perPage,
    count,
    sort,
    statusCount,
  };
};

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(getReplenishOrders()),
  getOrdersFilters: () => dispatch(getReplenishOrdersFilters()),
  setPage: offset => dispatch(setReplenishOrdersOffset(offset)),
  filterById: count => dispatch(setReplenishOrdersSearchById(count)),
  setSort: field => dispatch(setReplenishOrdersSort(field)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ReplenishOrdersContainer,
);


ReplenishOrdersContainer.propTypes = {
  data: PropTypes.array.isRequired,
  getOrders: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getOrdersFilters: PropTypes.func.isRequired,
};
