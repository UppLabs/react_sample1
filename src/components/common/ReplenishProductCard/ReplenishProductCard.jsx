import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './ReplenishProductCard.scss';
import { currencyFormat } from '../../../utils/formatHelper';
import BuyProductModal from '../../blocks/BuyProductModal';

class ReplenishProductCard extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      open: false,
    };
  }

  openModal = (model) => {
    this.props.buyProduct(model);
    this.setState({
      open: true,
    });
  }

  closeModal = () => {
    this.props.resetModalProduct();
    this.setState({
      open: false,
    });
  }

  render() {
    const { product, modalProduct } = this.props;
    return (product ?
      <Fragment>
        <BuyProductModal
          product={product} open={this.state.open} 
          onClose={this.closeModal}
          modalProduct={modalProduct}
        />
        <div className={styles.resultsProduct} onClick={() => this.openModal(product.model)}>
          <div className={styles.wrapper}>
            <div className={styles.wp}>
              <div className={styles.top} />
              <div className={styles.img_block}>
                <img alt="" src={product.square_images[0]} />
              </div>
              <div className={styles.desc}>
                <p className={styles.pt}>{product.title}</p>
                <p className={styles.price}>
                  <span>
                    {product.wholesale_price_max !== product.wholesale_price_min ? 
                      `${currencyFormat(product.wholesale_price_max)} - ` +
                      `${currencyFormat(product.wholesale_price_min)}` 
                      : currencyFormat(product.wholesale_price_max)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    : null);
  }
}

export default ReplenishProductCard;

ReplenishProductCard.propTypes = {
  buyProduct: PropTypes.func.isRequired,
  product: PropTypes.shape({
    images: PropTypes.array,
    variants: PropTypes.array,
    model: PropTypes.string,
  }).isRequired,
  modalProduct: PropTypes.object.isRequired,
  resetModalProduct: PropTypes.func.isRequired,
};
