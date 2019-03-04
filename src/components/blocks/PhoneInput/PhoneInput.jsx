import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Phone from 'react-phone-number-input';
import cn from 'classname';
import styles from './PhoneInput.scss';

class PhoneInput extends PureComponent {
  state = {
    error: {
      isError: false,
      message: '',
    },
  }

  handleBlur = () => {
    this.validate(this.props.value);
  }

  handleChange = (inputValue) => {
    const input = {
      target: {
        name: this.props.name,
        value: inputValue,
      },
    };

    this.props.onChange(input);
    this.validate(inputValue);
  }

  validate = (value) => {
    for(let validator of this.props.validate) {
      const result = validator(value);
      this.setState({
        error: result,
      });

      if(result.isError) break;
    }
  }

  render() {
    const {
      error,
    } = this.state;

    const { 
      placeholder, 
      value, 
      name, 
      blur,
    } = this.props;

    return (
      <div className={cn(styles.wrapper_input, error.isError === false ? '' : styles.isError + ' ic-warning')}>
        <Phone 
          name={name}
          country='US'
          placeholder={error.isError && value === '' ? error.message : placeholder}
          onChange={this.handleChange}
          value={value}
          onBlur={blur ? this.handleBlur : null}
        />
      </div>
    );
  }
}

export default PhoneInput;

PhoneInput.defaultProps = {
  placeholder: '',
  value: '',
  name: '',
  validate: [],
  blur: false,
};

PhoneInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  validate: PropTypes.arrayOf(PropTypes.func),
  blur: PropTypes.bool,
};