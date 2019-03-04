/* eslint-disable global-require */
import React, { PureComponent } from 'react';
import cn from 'classname';
import PropTypes from 'prop-types';
import styles from './Search.scss';

class Search extends PureComponent {

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Search product</div>
        <div className={cn('search', styles.search)}>
          <input 
            type='text' value={this.props.searchQuery} 
            placeholder='Title, sku, description'
            onChange={event => this.props.search(event.target.value)} 
          />
          <div className='ic-search' />
        </div>
      </div>
    );
  }
}

export default Search;

Search.propTypes = {
  search: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
}; 
