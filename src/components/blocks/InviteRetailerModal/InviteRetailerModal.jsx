/* eslint react/prop-types: 0 */
/*eslint no-useless-escape: 1 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import cn from 'classname';
import flatten from 'lodash/flatten';
import 'react-tagsinput/react-tagsinput.css';
import ModalWindow from '../../common/Modal';
import Button from '../../common/Button';
import styles from './InviteRetailerModal.scss';

 class InviteRetailerModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      tags: [],
      open: this.props.open, 
    };

    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.open != nextProps.open) {
      return {
        tags: [],
        open: nextProps.open,
      };
    }

    return null;
  }
  
    handleChange(tags) {
      let newTags = flatten(tags.map(x => x.replace(/[\n,;]/g, ' ').split(' '))).filter(x => x !== '');

      this.setState({ tags: newTags });
    }

    //validate email
    validate = (tag) => {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!reg.test(tag)) return false;
      return true;
    }

    validateAll = () => {
      for(let i of this.state.tags) {
        if(!this.validate(i)) {
          return false;
        }
      }
      return true;
    }


    renderTag = (props) => {
      let { tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other } = props;

      return (
        <span 
          key={key} 
          {...other}
          className={cn(!this.validate(tag) ? styles.invalid : '', other.className)} 
        >
          {getTagDisplayValue(tag)}
          {!disabled &&
            <span className={classNameRemove} onClick={e => onRemove(key)} />
          }
        </span>
      );
    }

    render() {
        const { onClose, sendEmail } = this.props;
        return (
          <ModalWindow
            open={this.state.open} onClose={onClose}
            showCloseIcon={false}
          >
            <h2>Invite Retailers</h2>
            <div className={styles.body}>
              <p>
                Retailers you invite will receive an invitation email to register. 
              </p>
              <p>
                Once registered you will be notified and you will need to approve them.
              </p>
              <TagsInput
                value={this.state.tags} onChange={this.handleChange}
                renderTag={this.renderTag}
                inputProps={{ placeholder: 'Enter email' }}
              />
            </div>
            <div className={styles.footer}>
              <Button
                color="white" text="CANCEL"
                onClick={onClose}
              />
              <Button
                color="green" text="INVITE"
                disabled={!(this.state.tags.length > 0) || !this.validateAll()}
                onClick={() => sendEmail(this.state.tags)}
              />
            </div>           
          </ModalWindow> 
        );
    }
}

export default InviteRetailerModal;

InviteRetailerModal.defaultProps = {
  open: false,
};

InviteRetailerModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    sendEmail: PropTypes.func.isRequired,
};


