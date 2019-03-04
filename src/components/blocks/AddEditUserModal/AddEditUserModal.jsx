/*eslint no-useless-escape: 1 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Phone from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import ModalWindow from '../../common/Modal';
import Button from '../../common/Button';
import styles from './AddEditUserModal.scss';

 class AddEditUserModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      form: {},
      open: this.props.open, 
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.open != nextProps.open) {
      return {
        open: nextProps.open,
        editPlatform: false,
      };
    }

    return null;
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

    handleChange = (event) => {
      console.log(event.target.name, event.target.value);
      this.setState({
        form: {
          ...this.state.form,
          [event.target.name]: event.target.value, 
        }, 
      });
    }

    handleSubmit = (event) => {
      console.log(this.state.form);
      alert('Submitted');
      event.preventDefault();
      this.props.onClose();
    }

    render() {
        const { onClose, user } = this.props;
        const { open, editPlatform } = this.state;

        return (
          <ModalWindow
            open={open} onClose={onClose}
          >
            <form onSubmit={this.handleSubmit}>
              <h2>Edit user</h2>
              <hr />
              <div className={styles.body}>
                <div>
                  <label htmlFor="userType">
                    <span>User type</span>
                    <select name="userType" onChange={this.handleChange}>
                      <option>Administrator</option>
                      <option>Replenish manager</option>
                      <option>Dropship manager</option>                      
                    </select>
                  </label>
                  <label htmlFor="firstName">
                    <span>First name</span>
                    <input
                      onChange={this.handleChange}
                      name="firstName" type="text"
                    />
                  </label>
                  <label htmlFor="lastName">
                    <span>Last name</span>
                    <input
                      onChange={this.handleChange}
                      name="lastName" type="text"
                    />
                  </label>
                  <label htmlFor="jobPosition">
                    <span>Job position (optional)</span>
                    <input
                      onChange={this.handleChange}
                      name="jobPosition" type="text"
                    />
                  </label>
                  <label htmlFor="phone">
                    <span>Phone number</span>
                    <Phone
                      placeholder="Enter phone number"
                      value={this.state.form.phone}
                      onChange={value => this.setState({
                        form: {
                          ...this.state.form,
                          phone: value, 
                        }, 
                      })}
                    />
                  </label>
                  <label htmlFor="email">
                    <span>Email address</span>
                    <input
                      onChange={this.handleChange}
                      name="email" type="text"
                      placeholder="mail@mail.com"
                    />
                  </label>
                  <label htmlFor="password">
                    <span>Password</span>
                    <input
                      onChange={this.handleChange}
                      name="password" type="password"
                    />
                  </label>
                  <label htmlFor="retypePassword">
                    <span>Retype password</span>
                    <input
                      onChange={this.handleChange}
                      name="retypePassword" type="password"
                    />
                  </label>
                </div>
                <hr />
              </div>
              <hr />
              <div className={styles.footer}>
                <Button
                  type="submit"
                  color="green" text="SAVE"
               //  disabled={!(this.state.tags.length > 0) || !this.validateAll()}
                  // onClick={() => alert('save')}
                />
                <Button
                  color="white" text="CANCEL"
                  onClick={onClose}
                />
              </div>    
            </form>       
          </ModalWindow> 
        );
    }
}

export default AddEditUserModal;

AddEditUserModal.defaultProps = {
  open: false,
};

AddEditUserModal.propTypes = {
    user: PropTypes.object.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
};


