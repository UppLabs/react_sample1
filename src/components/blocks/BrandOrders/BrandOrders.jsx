import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Retailers from '../../blocks/Retailers';
import IsMobile from '../../../containers/common/IsMobile';
import RetailersMobile from '../../blocks/RetailersMobile';

class BrandOrders extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { orders, getOrder, order } = this.props;

    return (
      <IsMobile
        desctop={
          <Retailers
            orders={orders}
            getOrder={getOrder}
            order={order}
          />
        }
        mobile={<RetailersMobile orders={orders} />}
      />
    );
  }
}

export default BrandOrders;

BrandOrders.propTypes = {
  order: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  getOrder: PropTypes.func.isRequired,
};
