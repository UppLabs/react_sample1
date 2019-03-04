import React, { PureComponent, Fragment } from 'react';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import PropTypes from 'prop-types';
import cn from 'classname';
import styles from './OrderProductCard.scss';
import { currencyFormat, numberFormatter } from '../../../utils/formatHelper';

class OrderProductCard extends PureComponent{  
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  static getDerivedStateFromProps(nextProps){
    if(nextProps.status === 'max') {
      return {
        value: nextProps.product.quantity,
      };
    }
    if(nextProps.status === 'clear') {
      return {
        value: 0,
      };
    }

    return null;
  }

  componentDidUpdate(){
    this.setTotal(this.state.value);
  }  

  setTotal = (value) => {
    const { product, onChange, addFulfillment } = this.props;
    
    const validValue = value > product.quantity ? product.quantity : value;

    onChange && onChange(((product.unit_price * validValue) / 100));
    addFulfillment && addFulfillment(validValue, product.fulfillment_id);

    this.setState({
      value: validValue,
    });
  };

  render() {
    const { product, partial, strikethrough } = this.props;

    return ( product ?
      <div className={cn('column', styles.mobile)}>
        <div className={styles.container}>
          <div className={styles.images_block}>
            <img alt="" src={product.variant.square_images[0]} />
          </div>
          <div className={styles.wrapper_desc}>
            <div className={styles.desc}>
              {partial ? (
                <Fragment>
                  <InputNumber
                    min={0}
                    max={product.quantity}
                    style={{ width: 80 }}
                    value={this.state.value}
                    onChange={this.setTotal}
                    formatter={numberFormatter}
                  />
                  {`/ ${product.quantity}`}
                </Fragment>
              ) : null}
              <p className={strikethrough ? styles.strikethrough : ''}>
                {product.variant.title}
              </p>
              <p className={styles.price}>
                <span>
                  <strong>MSRP:</strong>{currencyFormat(product.unit_price)}
                </span>
              </p>
            </div>
            <div className={styles.details}>
              <p>SKU: {product.variant.sku}</p>
            </div>
          </div>
        </div>
      </div>
    : null);
  }
}

export default OrderProductCard;

OrderProductCard.defaultProps = {
  partial: false,
  strikethrough: false,
  onChange: undefined,
  addFulfillment: undefined,
};

OrderProductCard.propTypes = {
  partial: PropTypes.bool,
  strikethrough: PropTypes.bool,
  product: PropTypes.shape({
    images: PropTypes.array,
    unit_price: PropTypes.number,
    fulfillment_id: PropTypes.number,
    variant: PropTypes.object,
  }).isRequired,
  onChange: PropTypes.func,
  addFulfillment: PropTypes.func,
};
