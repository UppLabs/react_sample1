import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import styles from './Modal.scss';

const ModalWindow = ({ open, onClose, children, center, showCloseIcon }) => {
  return (
    <div>
      <Modal
        open={open} onClose={onClose}
        center={center}
        classNames={{ modal: styles.modal }}
        showCloseIcon={showCloseIcon}
      >
        <div className={styles.body}>
          {children}
        </div>
      </Modal>
    </div>
  );
};

export default ModalWindow;

ModalWindow.defaultProps = {
  center: false,
  showCloseIcon: true,
};

ModalWindow.propTypes = {
  showCloseIcon: PropTypes.bool,
  center: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
};