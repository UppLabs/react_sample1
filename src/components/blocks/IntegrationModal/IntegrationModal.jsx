import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalWindow from '../../common/Modal';
import Button from '../../common/Button';
import styles from './IntegrationModal.scss';

 class IntegrationModal extends PureComponent {
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

  render() {
    const { onClose } = this.props;
    const { open } = this.state;

    return (
      <ModalWindow
        open={open} onClose={onClose}
        center
      >
        <h2>Add eCom integration</h2>
        <hr />
        <div className={styles.body}>
          <p>
            In most cases integration
            with devup takes about 10
            mins.
          </p>
          <p>
            Please contact <a href="mailto:Integration@test.com">Integration@test.com</a> to receive
            instructions
          </p>
        </div>
        <hr />
        <div className={styles.footer}>
          <Button
            color="green" text="OK"
            onClick={onClose}
          />
        </div>    
      </ModalWindow> 
    );
  }
}

export default IntegrationModal;

IntegrationModal.defaultProps = {
  open: false,
};

IntegrationModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};


