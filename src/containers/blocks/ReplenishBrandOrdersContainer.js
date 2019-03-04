import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBrandOrders, getBrandOrder } from '../../store/actions/replenishOrders';
import BrandOrders from '../../components/blocks/BrandOrders';
import OrderSectionContainer from './OrderSectionContainer';

class ReplenishBrandOrdersContainer extends PureComponent {

  componentDidMount() {
    this.props.getBrandOrders();
  }

  render() {
    const { 
     data,
     getOrder,
    } = this.props; 

    return ( data.length > 0 ?
      <BrandOrders 
        getOrder={getOrder} 
        expandComponent={OrderSectionContainer} 
        orders={data} 
      />
     : null );
  }
}

const mapStateToProps = (state) => {
  const { data } = state.brandOrders;
  return {
    data,
  };
};

const mapDispatchToProps = dispatch => ({
    getOrder: id => dispatch(getBrandOrder(id)),
    getBrandOrders: () => dispatch(getBrandOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ReplenishBrandOrdersContainer,
);


ReplenishBrandOrdersContainer.propTypes = {
  data: PropTypes.array.isRequired,
  getBrandOrders: PropTypes.func.isRequired,
  getOrder: PropTypes.func.isRequired,
};
