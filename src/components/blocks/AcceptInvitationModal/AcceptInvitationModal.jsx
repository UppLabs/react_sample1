/*eslint no-useless-escape: 1 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalWindow from '../../common/Modal';
import Button from '../../common/Button';
import styles from './AcceptInvitationModal.scss';

 class AcceptInvitationModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      open: this.props.open, 
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.open != nextProps.open) {
      return {
        open: nextProps.open,
      };
    }

    return null;
  }

  accept = () => {
    const data = {
      supplier_id: this.props.supplier.id,
    };

    this.props.acceptInvitation && this.props.acceptInvitation(data);
    this.props.onClose();
  }

  render() {
    const { onClose, supplier } = this.props;
    const { open } = this.state;

    return (
      <ModalWindow
        open={open} onClose={onClose}
        center
      >
        <h2>Accept invitation</h2>
        <hr />
        <div className={styles.body}>
          <p>
          You are about to accept an
          invitation from {supplier.name}.
          </p>
          <p>
          Once you accept, {supplier.name} will be
          requested to approve you.
          </p>
        </div>
        <hr />
        <div className={styles.footer}>
          <Button
            color="white" text="CANCEL"
            onClick={onClose}
          />
          <Button
            type="submit"
            color="green" text="ACCEPT"
            onClick={this.accept}
          />
        </div>    
      </ModalWindow> 
    );
  }
}

export default AcceptInvitationModal;

AcceptInvitationModal.defaultProps = {
  open: false,
};

AcceptInvitationModal.propTypes = {
    supplier: PropTypes.object.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    acceptInvitation: PropTypes.func.isRequired,
};


