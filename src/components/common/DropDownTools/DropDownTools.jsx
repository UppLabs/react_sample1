import React, { Fragment, Component } from 'react';
import cn from 'classname';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './DropDownTools.scss';

export default class DropDownTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  render() {
    const { data } = this.props;
    const { drop } = this.state;

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
              <span>Select options</span>
              <span className={cn(styles['ic-dropup'], 'ic-dropup')} />
            </div>
            <div className={cn(styles.items, 'items')}>
              <div className={cn(styles.wrapper_items, 'wrapper_items')}>
                {data.map((item, i) => {
                  return (
                    <div
                      key={i}
                      onClick={item.handler}
                    >
                      <span>{item.type}</span>
                    </div>
                  );
              })}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

DropDownTools.propTypes = {
  data: PropTypes.array.isRequired,
};