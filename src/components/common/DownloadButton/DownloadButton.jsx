import React from 'react';
import PropTypes from 'prop-types';
import styles from './DownloadButton.scss';

const DownloadButton = ({ onClick, size }) => {
  return (
    <div
      style={{ fontSize: `${size}px` }} 
      className={styles.container}
      onClick={onClick}
    >
      <span className='ic-email_arrow' />
    </div>
  );
};

export default DownloadButton;

DownloadButton.defaultProps = {
    size: 30,
};

DownloadButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    size: PropTypes.number,
};
