import React, { Component, Fragment } from 'react';
import cn from 'classname';
import styles from './SearchProduct.scss';

export default class SearchProduct extends Component {
  render() {
    return (
      <Fragment>
        <div className='container-fluid'>
          <div className={styles.wrapper_search}>
            <p className={styles.find_search}>Find products you are out of</p>
            <div className={styles.search}>
              <input placeholder='Search products' type='text' />
              <span className={cn(styles['ic-search'] + ' ic-search')} /> 
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}