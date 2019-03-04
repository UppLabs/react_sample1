import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import styles from './RadioGroup.scss';

 class RadioGroup extends Component {
    getChildContext() {
      const { name, selectedValue, onChange } = this.props;
      return {
        radioGroup: {
          name, selectedValue, onChange,
        },
      };
    }
  
    render() {
      const { Component, name, selectedValue, onChange, row, children, ...rest } = this.props;
      return (
        <Component
          className={cn(styles.container, row ? styles.row : '' )} role="radiogroup"
          {...rest}
        >{children}
        </Component>
      );
    }
  }

  export default RadioGroup;

  RadioGroup.defaultProps = {
    Component: 'div',
    row: false,
  };

  RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    selectedValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    Component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object,
    ]),
    row: PropTypes.bool,
  };

  RadioGroup.childContextTypes = {
    radioGroup: PropTypes.object,
  };
  
