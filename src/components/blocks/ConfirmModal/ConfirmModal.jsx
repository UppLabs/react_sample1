/*eslint no-useless-escape: 1 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button';
import ModalWindow from '../../common/Modal';
import styles from './ConfirmModal.scss';

 class ConfirmModal extends PureComponent {
    handleClickConfirm = () => {
      this.props.onClose();
      this.props.isAllProducts();
    }
    handleClickCancel = () => {
      this.props.onClose();
    }
    render() {
        return (
          <ModalWindow open={this.props.open} onClose={this.props.onClose}>
            <div className={styles.body}>
              <span>Are you sure you want to give this retailer permissions for all products?</span>
              <div className={styles.buttons}>
                <Button
                  text='OK' margin
                  color='green'
                  onClick={this.handleClickConfirm}
                />
                <Button
                  text='CANCEL' margin
                  color='white'
                  onClick={this.handleClickCancel}
                />
              </div>
            </div>
          </ModalWindow>
       );
 }
 }

 export default ConfirmModal;

ConfirmModal.defaultProps = {
  open: false,
  isAllProducts: null,
};

ConfirmModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    isAllProducts: PropTypes.func,
};