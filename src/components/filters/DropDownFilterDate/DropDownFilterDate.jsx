import cn from 'classname';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './DropDownFilterDate.scss';

class DropDownFilterDate extends Component {
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

    if (index === 7) {
      var lastIndex = this.state.lastSelectItem;
      this.setState({
        index: index,
      });
      this.props.onChange(value, lastIndex);
    } else {
      this.setState({
        index: index,
      });
      this.props.onChange(value, index);
    }
  }

  render() {
    const { values, from, to, last } = this.props;
    const { drop, index } = this.state;
    if(!values || !(values.length > 0)) return null;

    const current = values.find((item, i) => {
      return item.value === last;
    });
    
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
            { current.value === 'custom' ? `From ${from} to ${to}` : current.label }
            <span className={cn(styles['ic-dropup'], 'ic-dropup')} />
          </div>
          <div className={cn(styles.items, 'items')}>
            <div className={cn(styles.wrapper_items, 'wrapper_items')}>
              {values.map((item, i) => {
                if (item.value === last) {
                  return (

                    <div
                      key={item.value}
                      className={cn(styles.active, 'active')}
                      onClick={() => this.handleSwitchItem(i)}
                    >
                      { item.label }
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={item.value} onClick={() => this.handleSwitchItem(i)}
                    >
                      { item.label }
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

export default DropDownFilterDate;

DropDownFilterDate.defaultProps = {
  currentIndex: 0,
  from: {},
  to: {},
  last: '',
};

DropDownFilterDate.propTypes = {
  currentIndex: PropTypes.number,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  last: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
