import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../components/common/Spinner';
import { 
  getDropshipOrders, 
  getDropshipOrdersFilters, 
  setDropshipOrdersOffset, 
  setDropshipOrdersSearchById, 
  setDropshipOrdersSort,
  setDropshipOrdersLoading,
} from '../../store/actions/dropshipOrders';
import Toolbar from '../../components/common/Toolbar';
import OrdersTable from '../../components/blocks/OrdersTable';

class DropshipOrdersContainer extends PureComponent {

  componentDidMount() {
    this.props.setDropshipOrdersLoading(true);
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
  } = state.dropshipOrders;

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
  getOrders: () => dispatch(getDropshipOrders()),
  getOrdersFilters: () => dispatch(getDropshipOrdersFilters()),
  setPage: offset => dispatch(setDropshipOrdersOffset(offset)),
  filterById: count => dispatch(setDropshipOrdersSearchById(count)),
  setSort: field => dispatch(setDropshipOrdersSort(field)),
  setDropshipOrdersLoading: bool => dispatch(setDropshipOrdersLoading(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DropshipOrdersContainer,
);

DropshipOrdersContainer.propTypes = {
  data: PropTypes.array.isRequired,
  getOrders: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getOrdersFilters: PropTypes.func.isRequired,
  setDropshipOrdersLoading: PropTypes.func.isRequired,
};
