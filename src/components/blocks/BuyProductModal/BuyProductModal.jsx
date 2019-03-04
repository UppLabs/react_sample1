import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalWindow from '../../common/Modal';
import Button from '../../common/Button';
import styles from './BuyProductModal.scss';
import { currencyFormat } from '../../../utils/formatHelper';
import SliderInput from '../../common/SliderInput';

 class BuyProductModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      open: this.props.open,
      clear: false,
      items: 0,
      size: [],
      total: 0,
      price: 0,
    };
    this.helper_size = []; 
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.open != nextProps.open) {
      return {
        open: nextProps.open,
        total: 0,
        price: 0,
      };
    }

    return null;
  }

  getMax = (variants) => {
    var first = 0;

    variants.forEach((item) => {
      if (+item.available_inventory >= first) {
        first = +item.available_inventory;
      }
    });
    return first;
  }

  setItemsWithSum = (value, size, price) => {
    var sum_value = 0;
    var sum_price = 0;

    var check = true;

    var newSize = {};
    var dataSize = {};
    dataSize.count = value;
    dataSize.price = price; 
    newSize[size] = dataSize;

    if (this.helper_size.length === 0) {
      this.helper_size.push(newSize);
    } else {
      this.helper_size.forEach((item, i, arr) => {
                  if (size === Object.keys(item)[0]) {
                      item[size].count = value;
                      item[size].price = price;
                      check = false;
                  }
              });
      check ? this.helper_size.push(newSize) : '';
    }

    this.helper_size.forEach((item) => {
        for(var key in item) {
            sum_value += item[key].count;
            sum_price += item[key].count * item[key].price;
        }
    });
    this.setState({
      items: value,
      size: this.helper_size,
      total: sum_value,
      price: sum_price,
    });
  }

  addToBag = () => {
    this.props.onClose();
  }

  checkOutNow = () => {
    this.props.onClose();
  }

  reset = () => {
    this.setState({
      clear: false,
      total: 0,
      price: 0,
      size: [],
    });
  }

  clearAll = (bool) => {
     this.setState({
      clear: !this.state.clear,
     });
  }

  render() {
    const { onClose, product, modalProduct } = this.props;
    const { open, clear, items, total, size, price } = this.state;

    return (
      <ModalWindow
        open={open} onClose={onClose}
        center
      >
        <div className={styles.product_wrapper}>
          <div className={styles.product_img}>
            <p className={styles.name}>
              {
                product.title
              }
            </p>
            <img src={product.square_images[0]} alt='' />
            <p className={styles.desc}>
              {product.description}
            </p>
          </div>
          <div className={styles.line} />
          <div className={styles.wrapper_available}>
            <div className={styles.product_available}>
              <div className={styles.column}>
                <div className={styles.counts}>
                  <span>Available</span>
                  <span>Amount</span>
                  <span>Size</span>
                </div>
              </div>
              <div className={styles.slider_input}>
                {
                Object.keys(modalProduct.product).length === 0 ? <div className={styles.loading}>Loading</div> : 
                [].concat(modalProduct.product)
                .sort((sizeA, sizeB) => +sizeA.options.size > +sizeB.options.size)
                .map((item, i) => {
                  return (<SliderInput
                    variants={item} key={i}
                    max={this.getMax(modalProduct.product)}
                    clearAll={clear ? true : false}
                    size={item.options.size}
                    setItemsWithSum={(items, sum, price) => this.setItemsWithSum(items, item.options.size, price)}
                    total={total}
                    reset={this.reset}
                  />);
                },
                )
                }
              </div>
            </div>
            <div className={styles.info}>
              <div onClick={() => this.clearAll(false)}>Clear All</div>
              <div>
                <span>{total}</span>
                <span className={styles.items}>items</span>
                <span>{currencyFormat(price)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            color="green" text="ADD TO BAG"
            onClick={this.addToBag}
          />
          <Button
            type="submit"
            color="orange" text="CHECK OUT NOW"
            onClick={this.checkOutNow}
          />
        </div>    
      </ModalWindow> 
    );
  }
}

export default BuyProductModal;

BuyProductModal.defaultProps = {
  open: false,
  modalProduct: {},
};

BuyProductModal.propTypes = {
  product: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  modalProduct: PropTypes.object,
};