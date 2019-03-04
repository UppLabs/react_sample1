import cn from 'classname';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './DropDownFilter.scss';

class DropDownFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.currentIndex,
      drop: false,
    };
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), false);
  }

  handleClickOutside(event) {
    try {
      const domNode = ReactDOM.findDOMNode(this);

    if ((!domNode || !domNode.contains(event.target))) {
        this.setState({
            drop : false,
        });
    }
  }catch(e) {
    return false;
  }
  }

  handleDrop = () => {
    this.setState({
      drop: !this.state.drop,
    });
  };
  handleSwitchItem(index) {
    const value = this.props.values[index].value;
    this.props.onChange(value);
    this.setState({
      index: index,
    });
  }

  render() {
    const { values, type, customDate, staticPoint } = this.props;
    const { drop, index } = this.state;

    if(!values || !(values.length > 0)) return null;
    
    const current = values[index];

    return (
      <div className={styles.toolbar_right}>
        <div
          onClick={this.handleDrop}
          className={
            drop === false 
            ? cn(styles.drop_down, styles.passive, 'drop_down', 'passive') 
            : cn(styles.drop_down, 'drop_down')
          }
        >
          <div className={cn(styles.target, 'target')}>
            {type === 'images' ? (
              <img src={current.label} alt="" />
            ) : staticPoint === true ? 'Sort by' : customDate !== null ? customDate : current.label }
            <span className={cn(styles['ic-dropup'], 'ic-dropup')} />
          </div>
          <div className={cn(styles.items, 'items')}>
            <div className={cn(styles.wrapper_items, 'wrapper_items')}>
              {values.map((item, i) => {
                if (index === i) {
                  return (
                    <div
                      key={item.value}
                      className={cn(styles.active, 'active')}
                      onClick={() => this.handleSwitchItem(i)}
                    >
                      {type === 'images' ? (
                        <img src={item.label} alt="" />
                      ) : item.label }
                    </div>
                  );
                } else {
                  return (
                    <div key={item.value} onClick={() => this.handleSwitchItem(i)}>
                      {type === 'images' ? (
                        <img src={item.label} alt="" />
                      ) : item.label }
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DropDownFilter;

DropDownFilter.defaultProps = {
  currentIndex: 0,
  type: null,
  customDate: null,
  staticPoint: false,
};

DropDownFilter.propTypes = {
  currentIndex: PropTypes.number,
  type: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  customDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  staticPoint: PropTypes.bool,
};
