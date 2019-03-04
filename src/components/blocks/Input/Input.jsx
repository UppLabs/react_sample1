import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import styles from './Input.scss';

class Input extends PureComponent {
  state = {
    error: {
      isError: false,
      message: '',
    },
  }

  handleChange = (event) => {
    this.props.onChange(event);
    this.validate(event.target.value);
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
      marginTop, 
      value, 
      marginBottom, 
      type, 
      name, 
      blur,
    } = this.props;

    return (
      <div className={
       cn(
         styles.wrapper_input, 
         error.isError ? ' ic-warning' : '',
         marginTop === false ? '' : styles.marginTop,
         marginBottom === false ? '' : styles.marginBottom)
     }
      >
        <input
          className={cn(
           styles.input,
           error.isError ? styles.error : '')
         } 
          name={name}
          type={type}
          placeholder={error.isError && value === '' ? error.message : placeholder}
          onChange={this.handleChange}
          value={value}
          onBlur={blur ? this.handleChange : null}
        />
      </div>
    );
  }
}

export default Input;

Input.defaultProps = {
  placeholder: '',
  marginTop: false,
  value: '',
  marginBottom: false,
  name: '',
  type: 'text',
  validate: [],
  blur: false,
};

Input.propTypes = {
  placeholder: PropTypes.string,
  marginTop: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  marginBottom: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  validate: PropTypes.arrayOf(PropTypes.func),
  blur: PropTypes.bool,
};