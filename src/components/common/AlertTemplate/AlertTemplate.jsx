import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import styles from './AlertTemplate.scss';
import InfoIcon from './icons/InfoIcon';
import SuccessIcon from './icons/SuccessIcon';
import ErrorIcon from './icons/ErrorIcon';
import CloseIcon from './icons/CloseIcon';

class AlertTemplate extends PureComponent {
   constructor(props) {
      super(props);
   }

   startTimer = (id) => {
     setTimeout(() => {
      this.props.close(id);
     }, 2000);
   }

   render() {
      const { messages, close } = this.props;
      return (
        <div
          className={styles.container}
        >
          <TransitionGroup>
            {messages.map((message) => { 
              this.startTimer(message.id);
              return (
                <CSSTransition
                  key={message.id}
                  timeout={400}
                  classNames="fade"
                >
                  <div className={styles.alert}>
                    {message.success && <SuccessIcon />}
                    {message.error && <ErrorIcon />}
                    <span>{message.text}</span>
                    <button onClick={() => close(message.id)}>
                      <CloseIcon />
                    </button>
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      );
   }
}

export default  AlertTemplate;

AlertTemplate.defaultProps = {
  messages: [],
};

AlertTemplate.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    success: PropTypes.bool,
    error: PropTypes.bool,
    text: PropTypes.string,
  })),
  close: PropTypes.func.isRequired,
};
