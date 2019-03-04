import React, { PureComponent, Fragment } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';
import styles from './Picker.scss';
import Button from '../../common/Button';

class Picker extends React.Component {
	static defaultProps = {
    numberOfMonths: 1,
  };
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }
  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }
  handleResetClick() {
    this.setState(this.getInitialState());
  }
	render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className={styles.range}>
        <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
        </p>
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        <div className={styles.tools}>
          <Button
            text='OK' margin
            color='green'
            onClick={this.props.close}
          />
          <Button
            text='CENSEL' margin
            color='white'
            onClick={this.handleResetClick}
          />
          {from &&
            to && (
              <Button
                text='RESET' margin
                color='red'
                onClick={this.handleResetClick}
              />
            )}
        </div>
      </div>);
}
}

export default Picker;

Picker.propTypes = {
  numberOfMonths: PropTypes.number,
  close: PropTypes.func.isRequired,
}; 
