import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './EmptyData.scss';

const EmptyData = () => {
	return (
  <div className={styles.empty}>
    <div className='icons_empty'>
      <div className='icons'>
        <FontAwesomeIcon 
          className='info_icon' icon={faInfo}
          color='#dfdfdf'
        />
        <FontAwesomeIcon
          className='search_icon'
          icon={faSearch}
          color='#dfdfdf'
          rotation={90}
        />
      </div>
    </div>
    <span>No data found by your request. Please try to change searching requirements.</span>
  </div>
    );
};

export default EmptyData;