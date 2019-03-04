import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber } from 'antd';
import styles from './SliderInput.scss';
import { numberFormatter } from '../../../utils/formatHelper';

export default class SliderInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      inputValue: 0,
      price: this.props.variants.wholesale_price,
      sum: 0,
    };
    return initialState;
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.clearAll) {
      nextProps.reset();
      return {
        inputValue: 0,
        price: nextProps.variants.wholesale_price,
      };
    }
    return null;
  }

  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
    this.props.setItemsWithSum(value, this.props.size, this.state.price);
  }

  sliderHeight = (height) => {
    return height * 100/50 + 'px';
  }

  render() {
    const { variants, max, clearAll, setItemsWithSum, size, reset } = this.props;
    const { price, sum } = this.state;

    return (
      <div className={styles.wrapper}>
        <div
          style={{ 'height': max === +variants.available_inventory ? 
          +variants.available_inventory * 100/50 + 'px' : 
        this.sliderHeight(+variants.available_inventory) }} className={styles.slider}
        >
          <Slider
            vertical
            tipFormatter={null}
            min={0} max={variants.available_inventory}
            onChange={this.onChange} value={this.state.inputValue}
          />
          <div className={styles.count}>{variants.available_inventory}</div>
        </div>
        <div className={styles.number}>
          <InputNumber
            min={0}
            max={variants.available_inventory}
            style={{ marginLeft: 16 }}
            value={this.state.inputValue}
            onChange={this.onChange}
            formatter={numberFormatter}
          />
        </div>
        <div className={styles.size}>
          <span>{variants.options.size}</span>
        </div>
      </div>
    );
  }
}

SliderInput.defaultProps = {
  variants: {},
  max: 0,
  clearAll: false,
};

SliderInput.propTypes = {
  variants: PropTypes.object,
  max: PropTypes.number,
  clearAll: PropTypes.bool,
  setItemsWithSum: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
};