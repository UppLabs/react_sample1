import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderSection from '../../components/blocks/OrderSection';
import { postBrandOrdersReturns } from '../../store/actions/brandOrders';
// import { getBrandOrder } from '../../store/actions/brandOrders';

class OrderSectionContainer extends PureComponent {
  render() {
    const { 
     expanded,
     row,
     postReturns,
    } = this.props; 

    // check expanded lenght if need empty
    return (row && row.id && expanded[row.id] ?
      <OrderSection
        postReturns={postReturns} data={expanded[row.id]}
        status={row.processing_state}
      />
     : null );
  }
}

const mapStateToProps = (state) => {
  const { expanded } = state.brandOrders;
  return {
    expanded,
  };
};

const mapDispatchToProps = dispatch => ({
  postReturns: (data, retailer_order_id, id) => dispatch(postBrandOrdersReturns(data, retailer_order_id, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    OrderSectionContainer,
);

OrderSectionContainer.defaultProps = {
  row: undefined,
};

OrderSectionContainer.propTypes = {
  row: PropTypes.object,
  expanded: PropTypes.object.isRequired,
  postReturns: PropTypes.func.isRequired,
};
