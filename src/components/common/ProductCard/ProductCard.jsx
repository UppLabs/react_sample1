import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import cn from 'classname';
import styles from './ProductCard.scss';
import { currencyFormat } from '../../../utils/formatHelper';
import Checkbox from '../Checkbox';
import SimpleSlider from '../SliderImagesProducts';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

class ProductCard extends PureComponent {
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

  getWSP = () => {
    const { product } = this.props;
    
    return (
      <span>
        <strong>WSP: </strong>
        {
              product.wholesale_price_max !== product.wholesale_price_min ? 
                    `${currencyFormat(product.wholesale_price_max)} - ` +
                    `${currencyFormat(product.wholesale_price_min)}` 
                    : currencyFormat(product.wholesale_price_max)
            }
      </span>
    );
  }

  getDesc = () => {
    const { product, assignedTo } = this.props;
    return (
      <Fragment>
        <p>{product.available_inventory} units - {product.variants.length} variants</p>
        {assignedTo ? <p>Assigned to {product.retailers_count} retailers</p> : null}
      </Fragment>
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
      slider,
      open,
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
                {modal ? <a onClick={() => open(product)}>Approved</a> : null }
              </div>
              <div className={!slider && hover ? cn(styles.img_block, styles.img_hover) : styles.img_block}>
                {
                    slider ? <img alt="" src={product.square_images[0]} /> : 
                    hover ? <SimpleSlider images={product.square_images} /> : 
                    <img alt="" src={product.square_images[0]} />
                }
              </div>
              <div className={styles.desc}>
                <div
                  className={styles.pt}
                >
                  <ResponsiveEllipsis 
                    text={product.title}
                    maxLine='2'
                    ellipsis='...'
                  />
                </div>
                <p className={styles.price}>
                  <span>
                    <strong>MSRP: </strong>
                    {product.retail_price_max !== product.retail_price_min ? 
                      `${currencyFormat(product.retail_price_max)} - ` +
                      `${currencyFormat(product.retail_price_min)}` 
                      : currencyFormat(product.retail_price_max)}
                  </span>
                  {
                    this.getWSP()
                  }
                </p>
              </div>
            </div>
            <div className={styles.details}>
              {
                this.getDesc()
              }
              <p>SKU: {product.model}</p>
            </div>
          </div>
        </div>
      </Fragment>
    : null);
  }
}

export default ProductCard;

ProductCard.defaultProps = {
  checkbox: false,
  checked: false,
  onCheck: undefined,
  modal: false,
  assignedTo: true,
  slider: false,
  open: undefined,
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.array,
    variants: PropTypes.array,
    model: PropTypes.string,
  }).isRequired,
  checkbox: PropTypes.bool,
  onCheck: PropTypes.func,
  checked: PropTypes.bool,
  modal: PropTypes.bool,
  assignedTo: PropTypes.bool,
  slider: PropTypes.bool,
  open: PropTypes.func,
};
