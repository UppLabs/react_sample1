import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import styles from './Switch.scss';

const Switch = ({ label, className, onSwitch, checked } ) => {
      
  const handleChange = () => {
    onSwitch && onSwitch(!checked);
  };

  return (
    <div className={cn(styles.container, className)}>
      {label ?
        <span>{label}</span>
      : null}
      <label
        className={styles.switch} htmlFor="name"
        onClick={handleChange}
      >
        <input
          type="checkbox" checked={checked}
          onChange={handleChange}
        />
        <span className={cn(styles.slider, styles.round)} />
      </label>
    </div>
  );
};

export default Switch;

Switch.defaultProps = {
    label: undefined,
    className: '',
};

Switch.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onSwitch: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
};
