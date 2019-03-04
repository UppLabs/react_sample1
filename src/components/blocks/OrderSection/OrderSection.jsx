import React, { Component } from 'react';
import cn from 'classname';
import PropTypes from 'prop-types';
import { MONEY_PARTIALLY_RETURNED, PROCESSING, COMPLETED } from '../../../constants/retailerStatus';
import styles from './OrderSection.scss';
import OrderProductCard from '../../common/OrderProductCard';
import Button from '../../common/Button';
import Radio from '../../common/Radio';
import RadioGroup from '../../common/RadioGroup/RadioGroup';
import ReturnProductModal from '../ReturnProductModal';

class OrderSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'all',
      total: this.total(),
      fulfillments: [],
      status: 'none',
      open: false,
    };
  }

  setMax = () => {
    this.setState({
      status: 'max',
    });
  }

  modalOpen = () => {
    this.setState({
      open: true,
    });
  };

  modalClose = () => {
    this.setState({
      open: false,
    });
  }

  clear = () => {
    this.setState({
      status: 'clear',
    });
  }

  addFulfillment = (count, id) => {
    const fullfillment = {
      'reason': '',
      'quantity': count,
      'fulfillment_line_id': id,
    };

    let array = [...this.state.fulfillments];

    let isExist = false;
    for (let index = 0; index < array.length; index++) {
      if(array[index].fulfillment_line_id == id) {
        array[index] = fullfillment;
        isExist = true;
        break;
      }
    }
    if(!isExist) {
      array.push(fullfillment);
    }
    
    this.setState({
      fulfillments: array,
    });
  }

  handleChange = (value) => {
    this.setState({ value: value });
  };

  byValue = (value) => {
    if (value == 'partial') {
      return (
        <div className={styles.addition}>
          <a className={styles.max} onClick={this.setMax}>Set all max</a>
          <a className={styles.clear} onClick={this.clear}>Clear</a>
        </div>
      );
    }
  };

  isPartial = (value) => {
    if (value == 'partial') {
      return true;
    }

    return false;
  };

  textByStatus = () => {
    switch (this.props.status) {
      case PROCESSING:
        return 'Return the rest';
      default:
        return 'Return all';
    }
  };

  changeCount = (value) => {
    this.setState({
      total: value,
      status: 'none',
    });
  }

  isRest = (products) => {
    if (this.props.status === MONEY_PARTIALLY_RETURNED) {
      return (
        <div>
          <h4>Money returned for</h4>
          <div className={cn(styles.products, 'row vertical-indent')}>
            {products.map(item => (
              <OrderProductCard
                product={item}
                partial={this.isPartial(this.state.value)}
                key={item.variant.sku}
                strikethrough
                onChange={this.changeCount}
                addFulfillment={this.addFulfillment}
                status={this.state.status}
              />
            ))}
          </div>
          <h4>Money not returned for</h4>
        </div>
      );
    }
  };

  allTotal = () => {
    const products = this.props.data.fulfillments[0].fulfillment_lines;
    let total = 0;

    products.map((item) => {
      total += item.unit_price * item.quantity;
    });

    return total/100;
  }

  total = () => {
    const products = this.props.data.fulfillments[0].fulfillment_lines;
    let total = 0;

    products.map((item) => {
      total += item.unit_price * item.quantity;
    });

    return total/100;
  }

  header = (data) => {
    return this.props.status === COMPLETED ? (        
      <div className={styles.top}>
        <div>
          <div className={styles.topLeft}>
            <RadioGroup 
              name={`order ${data.id}`} selectedValue={this.state.value} 
              onChange={this.handleChange} row
            >
              <Radio
                id={`all${data.id}`} value="all"
                label={`Return all ${this.allTotal()} $`}
              />
              <Radio
                id={`partial${data.id}`} value="partial"
                label="Partial return"
              />
            </RadioGroup>
            {this.byValue(this.state.value)}
          </div>
          <div className={styles.topRight}>
            <Button
              variant="raised"
              color="green"
              text={`RETURN ${this.state.value === 'all' ? this.allTotal() : this.state.total}$`}
              onClick={this.modalOpen}
            />
          </div>
        </div>

        <hr />
      </div>
    ) : null;
  }

  render() {
    const { data, postReturns } = this.props;
    const products = data ? data.fulfillments[0].fulfillment_lines : null;

    return ( products ? 
      <div className={styles.section}>
        <ReturnProductModal
          open={true || this.state.open} onClose={this.modalClose}
          sendEmail={this.sendEmail}
          data={data}
          postReturns={postReturns}
          value={this.state.value}
          fulfillments={this.state.fulfillments}
        />
        {this.header(data)}
        <div className={styles.body}>
          {this.isRest(products)}
          <div className='row vertical-indent'>
            {products.map(item => (
              <OrderProductCard
                product={item}
                partial={this.isPartial(this.state.value)}
                key={item.variant.sku}
                onChange={this.changeCount}
                addFulfillment={this.addFulfillment}
                status={this.state.status}
              />
            ))}
          </div>
        </div>
      </div>
    : null);
  }
}

export default OrderSection;

OrderSection.propTypes = {
  data: PropTypes.shape({
    fulfillments: PropTypes.array,
  }).isRequired,
  status: PropTypes.string.isRequired,
  postReturns: PropTypes.func.isRequired,
};
