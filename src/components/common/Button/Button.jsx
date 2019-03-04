import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import styles from './Button.scss';

const Button = ({ 
  color,
  type, 
  text, 
  onClick, 
  margin, 
  alignSelf, 
  disabled, 
  border, 
  margin_left, 
  full_width, 
  uppercase, 
}) => {
  return (
    <button
      className={cn(
        styles[color],
        styles.common,
        disabled ? styles.disabled : '',
        styles.container, 
        margin ? styles.margin : '', 
        alignSelf ? styles.alignSelf : '',
        border ? styles.border : '',
        margin_left ? styles.margin_left : '',
        full_width ? styles.full_width : '',
        uppercase ? styles.uppercase : '',
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;

Button.defaultProps = {
  type: 'button',
  color: 'green',
  margin: false,
  alignSelf: false,
  disabled: false,
  onClick: undefined,
  border: false,
  margin_left: false,
  full_width: false,
  uppercase: true,
};

Button.propTypes = {
  color: PropTypes.string, //green, white, blue
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  margin: PropTypes.bool,
  alignSelf: PropTypes.bool,
  disabled: PropTypes.bool,
  border: PropTypes.bool,
  margin_left: PropTypes.bool,
  full_width: PropTypes.bool,
  uppercase: PropTypes.bool,
};
