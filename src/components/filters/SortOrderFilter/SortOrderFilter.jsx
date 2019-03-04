import cn from 'classname';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './SortOrderFilter.scss';

class SortOrderFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
    };
  }
  handleClick = () => {
    this.setState({
      order: this.state.order === 'asc' ? 'desc' : 'asc',
    }, () => {
      this.props.onChange(this.state.order);
    });
  };

  render() {    
    const { order } = this.state;
    return (
      <div onClick={this.handleClick} className={styles.sort}>
        <span className={order === 'asc' ? 'ic-sort' : cn('ic-sort', styles.down)} />
      </div>
    );
  }
}
export default SortOrderFilter;


SortOrderFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
