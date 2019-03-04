import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from '../../common/Modal';
import Button from '../../common/Button';
import styles from './DownloadReportModal.scss';

const DownloadReportModal = ({ onClose, open }) => {
  return (
    <ModalWindow
      open={open} onClose={onClose}
      center
    >
      <div className={styles.body}>
        <h3>The report will be sent to your email shortly</h3>
        <div className={styles.footer}>
          <Button
            onClick={onClose}
            color="green" text="OK"
          />
        </div>      
      </div> 
    </ModalWindow> 
  );
};

export default DownloadReportModal;

DownloadReportModal.defaultProps = {
  open: false,
};

DownloadReportModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};


