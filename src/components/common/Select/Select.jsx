import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import styles from './Select.scss';

class Select extends PureComponent {
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
    const { error } = this.state;
    const { options, blur, name } = this.props;
    return (
      <div className={cn(styles.container, error.isError ? ' ic-warning' : '', error.isError ? styles.error : '')}>
        <select 
          name={name}
          onChange={this.handleChange}
          className={error.isError ? styles.error : ''}
          onBlur={blur ? this.handleChange : null}
        >
          {options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
        </select>
      </div>
    );
  }
}

export default Select;

Select.defaultProps = {
   options: [],
   blur: false,
   validate: [],
   name: '',
};

Select.propTypes = {
   options: PropTypes.arrayOf(PropTypes.object),
   validate: PropTypes.arrayOf(PropTypes.func),
   blur: PropTypes.bool, 
   onChange: PropTypes.func.isRequired,
   name: PropTypes.string,
};