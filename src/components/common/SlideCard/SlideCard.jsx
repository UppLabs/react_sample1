import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import styles from './SlideCard.scss';

class SlideCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active : false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.disabled && nextProps.disabled !== prevState.disabled) {
      return {
        disabled: nextProps.disabled,
      };
    }
    return null;
  }
  
  handleClick = () => {
    !this.props.disabled && this.setState({ 
        active: !this.state.active,
    });
  };
      
  render() {
    const { title, description, children, right, disabled } = this.props;
    return (
      <div className={styles.container}>
        <div
          className={
            this.state.active
              ? styles.active
              : styles.inactive
          }
        >
          <div className={styles.top}>
            <div className={cn(styles.left, disabled ? styles.disabled : '')} onClick={this.handleClick}>
              <h4>{title}</h4>
              <span>{description}</span>
            </div>
            {right ? 
              <div className={styles.right}>
                {right}
              </div>
              : null
            }

          </div>
          {this.state.active ?
            <div className={styles.body}>
              <hr />
              <div>
                {children}
              </div>                 
            </div>
          : null}

        </div>
      </div>
    );
  }
}
export default SlideCard;

SlideCard.defaultProps = {
    children: null,
    right: null,
    disabled: false,
    description: '',
};

SlideCard.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    description: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    right: PropTypes.element,
    disabled: PropTypes.bool,
};
