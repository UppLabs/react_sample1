import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cart from '../../components/blocks/Cart';
import { 
  getStores,
  sendOrder,
 } from '../../store/actions/cart';


class CartContainer extends PureComponent {
  componentDidMount() {
    this.props.getStores();
  }

  render() {
    const { sendOrder, data } = this.props;
    return (
      <Fragment>
        <Cart cart={data} sendOrder={sendOrder} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state.cart;

  return {
    data,
  };
};

const mapDispatchToProps = dispatch => (
  {
    getStores: () => dispatch(getStores()),
    sendOrder: (data, store_id) => dispatch(sendOrder(data, store_id)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);

CartContainer.propTypes = {
  getStores: PropTypes.func.isRequired,
  sendOrder: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};