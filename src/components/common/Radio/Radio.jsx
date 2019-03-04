import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import styles from './Radio.scss';

class Radio extends Component {
  render() {
    const { name, selectedValue, onChange } = this.context.radioGroup;
    const optional = {};
    if(selectedValue !== undefined) {
      optional.checked = (this.props.value === selectedValue);
    }
    if(typeof onChange === 'function') {
      optional.onChange = onChange.bind(null, this.props.value);
    }

    const { id, value, label } = this.props;
    return (
      <label className={styles.container} htmlFor={id}>
        <input
          {...this.props}
          type="radio" id={id}
          name={name} value={value}
          aria-checked={optional.checked}
          {...optional} 
        />
        <div className={cn(styles.icon, optional.checked ? 'ic-radiobutton' : 'ic-radiobutton-outline')} />
        <span className={styles.label}>{label}</span>
      </label>
    );
  }
}

export default Radio;

Radio.contextTypes = {
  radioGroup: PropTypes.object,
};

Radio.defaultProps = {
  label: undefined,
};

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};
