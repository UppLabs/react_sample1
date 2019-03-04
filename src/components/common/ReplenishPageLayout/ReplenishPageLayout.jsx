import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../PageLayout';
import styles from './ReplenishPageLayout.scss';

const ReplenishPageLayout = ({ top, children }) => {
  return (
    <div className={styles['replenish']}>
      {top}
      <PageLayout>{children}</PageLayout>
    </div>
  );
};

export default ReplenishPageLayout;

ReplenishPageLayout.defaultProps = {
  children: undefined,
  top: undefined,
};

ReplenishPageLayout.propTypes = {
  top: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
