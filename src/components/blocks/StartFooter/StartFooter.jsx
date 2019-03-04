import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classname';

import styles from './StartFooter.scss';

export default class StartFooter extends Component {

render() {
  return (
    <Fragment>
      <div className={styles.wrapper}>
        <div className={cn(styles['container-fluid'])}>
          <footer className={styles.welcome}>
            <div>
              <span><Link to='/learn'>Learn more</Link></span>
              <span><Link to='/terms'>Terms andconditions</Link></span>
              <span><Link to='/signup'>Sign Up</Link></span>
            </div>
            <div>
              <span>
                © 2018 devup |  Terms and conditions  |  Support
              </span>
              <span>
                + 1 000 000 00 00  |  email@mail.com
              </span>
            </div>
          </footer>
        </div>
      </div>
    </Fragment>);
  }
}

