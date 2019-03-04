/*eslint no-useless-escape: 1 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';
import DayPicker, { DateUtils } from 'react-day-picker';
import Button from '../../common/Button';
import ModalWindow from '../../common/Modal';
import styles from './DatePickerModal.scss';

 class DatePickerModal extends PureComponent {
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

  handleOkay = () => {
    var interval = `From ${this.state.from.toLocaleDateString()} to
                ${this.state.to.toLocaleDateString()}`;
    var start = this.state.from.toISOString().substring(0, 10);
    var end = this.state.to.toISOString().substring(0, 10);
    this.props.onClose(interval, start, end);
  }

    render() {
      const { from, to } = this.state;
      const modifiers = { start: from, end: to };
      const today = new Date();

        return (
          <ModalWindow open={this.props.open} onClose={this.props.onClose}>
            <div className={styles.body}>
              <div style={{ 'textAlign': 'center', fontFamily: 'Roboto-Regular' }}>
                {!from && !to && 'Please select the first day.'}
                {from && !to && 'Please select the last day.'}
                {
                  to ? 
                    <p>
                      <span className={styles.selected_date}>Selected from</span>
                      {from.toLocaleDateString()} to {to.toLocaleDateString()}
                    </p> : ''
                }
              </div>
              <div className={styles.range}>
                <DayPicker
                  disabledDays={{ after: today }}
                  className="Selectable"
                  numberOfMonths={this.props.numberOfMonths}
                  selectedDays={[from, { from, to }]}
                  modifiers={modifiers}
                  onDayClick={this.handleDayClick}
                />
                <div className={styles.tools}>
                  <Button
                    text='OK' margin
                    disabled={from !==undefined && to != undefined ? false : true}
                    color='green'
                    onClick={() => this.handleOkay()}
                  />
                  {from &&
                   to && (
                     <Button
                       text='RESET' margin
                       color='white'
                       onClick={this.handleResetClick}
                     />
                  )}
                </div>
              </div>
            </div>
          </ModalWindow>
       );
 }
 }

export default DatePickerModal;

DatePickerModal.defaultProps = {
  open: false,
};

DatePickerModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    numberOfMonths: PropTypes.number,
};