import React, { Component, Fragment } from 'react';
import cn from 'classname';
import PropTypes from 'prop-types';
import styles from './SearchRetailers.scss';

export default class SearchRetailers extends Component {
  render() {
    return (
      <Fragment>
        <div className={styles.wrapper_search}>
          <div className={styles.search}>
            <input
              onChange={event => this.props.search(event.target.value)} type='text'
              placeholder='Retailer`s name'
            />
            <span className={cn(styles['ic-search'] + ' ic-search')} /> 
          </div>
        </div>
      </Fragment>
    );
  }
}

SearchRetailers.propTypes = {
  search: PropTypes.func.isRequired,
};