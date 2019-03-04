import React, { Component, Fragment } from 'react';
import cn from 'classname';
import styles from './Line.scss';

export default class Line extends Component {
  render() {
    return (
      <Fragment>
        <div className={styles.wrapper_line}>
          <div className={styles.brand}>
            <span>Browse by Brand</span>
          </div>
          <div className={styles.line} />
        </div>
      </Fragment>
    );
  }
}