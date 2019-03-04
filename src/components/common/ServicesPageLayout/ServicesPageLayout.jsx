import React from 'react';
import PropTypes from 'prop-types';
import styles from './ServicesPageLayout.scss';

const ServicesPageLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      { children }
    </div>);
};

export default ServicesPageLayout;

ServicesPageLayout.propTypes = {
  children: PropTypes.array.isRequired,
};