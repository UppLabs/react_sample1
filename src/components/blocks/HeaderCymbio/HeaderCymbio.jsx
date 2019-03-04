import React, { PureComponent } from 'react';
import styles from './Headerdevup.scss';

const Headerdevup = () => {
	return (
  <div className={styles.header}>
    <div className={styles.logo}>
      <img alt="" src={require('../../../images/logo.png')} />
      <span>devup</span>
    </div>
  </div>
    );
};

export default Headerdevup;