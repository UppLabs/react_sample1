import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  getBrandOrders, 
  getBrandOrder, 
  getBrandOrdersFilters, 
  postBrandOrdersReturns,
  setBrandOrdersOffset,
  setBrandOrdersSearchById,
  setSortAscOrDesc,
  setBrandOrdersLoading,
} from '../../store/actions/brandOrders';
import Spinner from '../../components/common/Spinner';
import IsMobile from '../common/IsMobile';
import Retailers from '../../components/blocks/Retailers';
import RetailersMobile from '../../components/blocks/RetailersMobile';

class BrandOrdersContainer extends PureComponent {

  componentDidMount() {
    this.props.setBrandOrdersLoading(true);
    this.props.getBrandOrders();
    this.props.getOrdersFilters();
  }

  render() {
    const { 
     data,
     isLoading,
    } = this.props; 
    return isLoading ? <Spinner /> : ( data.length >= 0 ?
      <IsMobile
        desctop={
          <Retailers {...this.props} />
      }
        mobile={<RetailersMobile {...this.props} />}
      />
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
  } = state.brandOrders;

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
    getOrder: id => dispatch(getBrandOrder(id)),
    getBrandOrders: () => dispatch(getBrandOrders()),
    getOrdersFilters: () => dispatch(getBrandOrdersFilters()),
    postReturns: (data, retailer_order_id, id) => dispatch(postBrandOrdersReturns(data, retailer_order_id, id)),
    setPage: offset => dispatch(setBrandOrdersOffset(offset)),
    filterById: count => dispatch(setBrandOrdersSearchById(count)),
    setSortAscOrDesc: field => dispatch(setSortAscOrDesc(field)),
    setBrandOrdersLoading: bool => dispatch(setBrandOrdersLoading(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    BrandOrdersContainer,
);

BrandOrdersContainer.propTypes = {
  data: PropTypes.array.isRequired,
  getBrandOrders: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getOrdersFilters: PropTypes.func.isRequired,
  setBrandOrdersLoading: PropTypes.func.isRequired,
};
