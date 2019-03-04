import React from 'react';
import PropTypes from 'prop-types';
import styles from './ActionLinkTop.scss';

 const ActionLinkTop = ({ title, onClick, red }) => {
  return (
    <div className={styles.container}>
      <a className={red ? styles.red : ''} onClick={onClick}>{title}</a>
    </div>
  );
};

export default ActionLinkTop;

ActionLinkTop.defaultProps = {
  red: false,
};

ActionLinkTop.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    red: PropTypes.bool,
};
