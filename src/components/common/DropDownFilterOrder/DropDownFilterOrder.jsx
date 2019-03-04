import React, { Fragment, Component } from 'react';
import cn from 'classname';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './DropDownFilterOrder.scss';

export default class DropDownFilterOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
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
  handleSwitchItem(index, item) {
    this.props.onClick(item);
    this.setState({
      index: index,
    });
  }
  
	render() {
		const { data, activeCount } = this.props;
    const { drop, index } = this.state;

    const current = data[index];
    return (
      <Fragment>
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
              <span>{current.type}</span>
              <span className={styles.box}>{current.count}</span>
              <span className={cn(styles['ic-dropup'], 'ic-dropup')} />
            </div>
            <div className={cn(styles.items, 'items')}>
              <div className={cn(styles.wrapper_items, 'wrapper_items')}>
                {data.map((item, i) => {
                if (index === i) {
                  return (
                    <div
                      key={i}
                      className={cn(styles.active, 'active')}
                      onClick={() => this.handleSwitchItem(i, item.type)}
                    >
                      <span>{item.type}</span>
                      <span className={styles.box}>{item.count}</span>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} onClick={() => this.handleSwitchItem(i, item.type)}>
                      <span>{item.type}</span>
                      <span className={styles.zero}>{item.count}</span>
                    </div>
                  );
                }
              })}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
	}
}

DropDownFilterOrder.propTypes = {
	data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  activeCount: PropTypes.string.isRequired,
};