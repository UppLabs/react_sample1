/* eslint-disable global-require */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classname';

import styles from './Footer.scss';

export default class Footer extends Component {

render() {
  return (
    <Fragment>
      <div className={styles.wrapper}>
        <div className={cn(styles['container-fluid'])}>
          <footer className={styles.another}>
            <div>
              © 2018 devup |  Terms and conditions  |  Support
            </div>
            <div>
              + 1 000 000 00 00  |  email@mail.com
            </div>
          </footer>
        </div>
      </div>
    </Fragment>);
  }
}