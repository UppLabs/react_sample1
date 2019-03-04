import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import styles from './Checkbox.scss';

class Checkbox extends PureComponent {
	constructor(props) {
    super(props);
		this.state = {
			[this.props.value]: props.checked || false,
		};
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState[nextProps.value] !== nextProps.checked && nextProps.checked !== undefined) {
      return {
        [nextProps.value]: nextProps.checked,
      };
    }

    return null;
  }
  
  handleChange = (event) => {
    const checked = event.target.checked;

    this.setState({ [this.props.value]: checked }, () => {
      if(this.props.handler && this.props.filterKey) {
        this.props.handler(this.props.filterKey, this.state);
      } else if (this.props.handler) {
        this.props.handler(this.state);
      }

      this.props.onChange && this.props.onChange(checked, this.props.value);
    });
  };

  formattedLabel = (value, count) => {
        const { colorLabel } = this.props;
        return (
          <div className={styles.data_results}>
            <span className={
              cn(
                styles.formattedLabel,
                colorLabel !== undefined ? styles[colorLabel] : '',
              )
            }
            >{value}
            </span>
            { count ? <span className={count === 0 ? styles.count_zero : styles.count}>{count}</span> : null}
          </div>
        );
    }

    render() {
        const { 
            counter,
            value,
            hideLabel,
            id,
            colorLabel,
            } = this.props;

        return (
          <label className={styles.container} htmlFor={id ? id : value}>
            <input
              id={id ? id : value}
              type="checkbox" value={value}
              checked={this.state[value]}
              onChange={this.handleChange}
              className={styles.checkboxInput}
            />
            <div className={cn(styles.checkboxIcon, this.state[value] ? 'ic-checkbox' : 'ic-checkbox-outline')} />
            {
              !hideLabel ?
                <span className={styles.label}>{this.formattedLabel(value, counter)}</span>
              : null
            }
          </label>
        );
    }
}

export default Checkbox;

Checkbox.defaultProps = {
  // indeterminate: false,
  // disabled: false,
  counter: undefined,
  handler: undefined,
  filterKey: undefined,
  hideLabel: false,
  onChange: undefined,
  checked: undefined,
  id: undefined,
  colorLabel: undefined,
};

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  counter: PropTypes.number,
  // indeterminate: PropTypes.bool,
  // disabled: PropTypes.bool,
  handler: PropTypes.func,
  filterKey: PropTypes.string,
  hideLabel: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  id: PropTypes.string,
  colorLabel: PropTypes.string,
};