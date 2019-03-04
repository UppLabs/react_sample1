import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import { Link } from 'react-router-dom';
import styles from './DropshipProductCard.scss';
import { currencyFormat } from '../../../utils/formatHelper';
import Checkbox from '../Checkbox';
import SimpleSlider from '../SliderImagesProducts';

class DropshipProductCard extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      checked: this.props.checked,
      hover: false,
    };
  }
  
  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.checked !== nextProps.checked) {
      return {
        checked: nextProps.checked,
      };
    }

    return null;
  }

  onMouseEnter = (event) => {
    this.setState({
      hover: true,
    });
  }

  onMouseLeave = (event) => {
    this.setState({
      hover: false,
    });
  }

  showImagesHover = (images) => {
    return (
        images.map((item, i) => {
          return (
            <div key={i} className={styles.slide}>
              <img
                src={item}
                alt=''
              />
            </div>
          );
        })
    );
  }

  handleCheck = (event, checked, value) => {
    if (event === true || event === false) {
      this.props.onCheck(!checked, value);
      return false;
    } else {
      if (event.target.tagName === 'A') {
        return false;
      }
    }
    this.props.onCheck(!checked, value);
  }

  render() {
    const { 
      product, 
      checkbox,  
      modal, 
    } = this.props;

    const { hover } = this.state;

    return (product ?
      <Fragment>
        <div
          className={styles.resultsProduct} 
          onClick={event => this.handleCheck(event, this.state.checked, product.model)}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <div className={styles.wrapper}>
            <div className={styles.wp}>
              <div className={styles.top}>
                {checkbox ?
                  <div>
                    <Checkbox
                      onChange={event => this.handleCheck(event, this.state.checked, product.model)}
                      checked={this.state.checked}
                      value={product.model}
                      hideLabel
                    />
                  </div>
                  : null}
                {
                  modal && product.retailer_approved_variants_count > 0 
                  ? <a onClick={this.openModal}>Approved</a> 
                  : null 
                }
              </div>
              <div className={hover ? cn(styles.img_block, styles.img_hover) : styles.img_block}>
                {
                    hover ? <SimpleSlider images={product.square_images} /> : 
                    <img alt="" src={product.square_images[0]} />
                }
              </div>
              <div className={styles.desc}>
                <p className={styles.pt}>
                  <Link to={`/dropship/product/${product.model}`}>{product.title}</Link>
                </p>
                <p className={styles.price}>
                  <span>
                    {product.retail_price_max !== product.retail_price_min ? 
                      `${currencyFormat(product.retail_price_max)} - ` +
                      `${currencyFormat(product.retail_price_min)}` 
                      : currencyFormat(product.retail_price_max)}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.details}>
              <p>SKU: {product.model}</p>
            </div>
          </div>
        </div>
      </Fragment>
    : null);
  }
}

export default DropshipProductCard;

DropshipProductCard.defaultProps = {
  checkbox: false,
  checked: false,
  onCheck: undefined,
  modal: false,
};

DropshipProductCard.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.array,
    variants: PropTypes.array,
    model: PropTypes.string,
    retailer_approved_variants_count: PropTypes.number,
  }).isRequired,
  checkbox: PropTypes.bool,
  onCheck: PropTypes.func,
  checked: PropTypes.bool,
  modal: PropTypes.bool,
};
