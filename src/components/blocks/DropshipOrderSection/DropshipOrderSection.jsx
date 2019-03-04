import React, { Component } from 'react';
import cn from 'classname';
import PropTypes from 'prop-types';
import styles from './DropshipOrderSection.scss';
import ProductCard from '../../common/ProductCard';
import Button from '../../common/Button';

const arr = [1, 2, 3, 4, 5, 6, 7];

class DropshipOrderSection extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: 'all',
    // };
  }

  render() {
    const { status } = this.props;
    return (
      <div className={styles.section}>
        <div className={styles.top}>
          <div>
            <div className={styles.topLeft}>
              <Button
                variant="raised"
                color="primary"
                text="REORDER"
              />
              <Button
                variant="raised"
                color="blue"
                text="ASK RETURN"
              />
            </div>
          </div>

          <hr />
        </div>
        <div className={styles.body}>
          <div className={styles.products}>
            {arr.map(i => (
              <ProductCard
                // partial={this.isPartial(this.state.value)}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DropshipOrderSection;

DropshipOrderSection.propTypes = {
  status: PropTypes.string.isRequired,
};
