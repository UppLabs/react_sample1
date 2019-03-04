import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './StartPageLayout.scss';

export default class StartPageLayout extends Component {
  componentDidMount = () => {
    const element = document.getElementById('mainContainer');
    
    if(element) {
      element.classList.add(styles.mainContainer);
    }
  };

  componentWillUnmount() {
    const element = document.getElementById('mainContainer');

    if(element) {
      element.classList.remove(styles.mainContainer);
    }
  }
  
	render() {
    return (
      <div className={styles.center}>
        <div style={{ 'height': this.props.wallHeight + '%' }} className={styles.wrapper_wall}>
          <span className={styles.wall} />
        </div>
        { this.props.children }
      </div>);
	}
}

StartPageLayout.propTypes = {
  children: PropTypes.element.isRequired,
  wallHeight: PropTypes.string.isRequired,
};