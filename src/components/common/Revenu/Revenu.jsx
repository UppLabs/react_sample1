import React, { PureComponent } from 'react';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
import styles from './Revenu.scss';

class Revenu extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
        };
    }

    handleChange = (value) => {
      this.setState({
        value: value,
      });

      this.props.onChange(value);
    }

  render() {
    return (
      <div className={styles.container}>
        <Slider
          className={styles.slider} 
          value={this.state.value} 
          onChange={this.handleChange}
          dotStyle={{
              borderColor: '#c8c8c9',
              backgroundColor: '#eeeeee',
          }}
          trackStyle={{
            backgroundColor: '#388e3c',
          }}
          railStyle={{
              backgroundColor: '#f57c00',
          }}
          min={this.props.min}
          max={this.props.max}
        />
      </div>
    );
  }
}


export default Revenu;

Revenu.defaultProps = {
  min: 0,
  max: 100,
  value: 0,
};


Revenu.propTypes = {
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
};