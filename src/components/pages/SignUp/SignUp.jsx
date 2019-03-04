/*eslint no-useless-escape: 1 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './SignUp.scss';
import Button from '../../common/Button';
import Input from '../../blocks/Input';
import { requiredValidator, emailValidator, isFormValid } from '../../../utils/validators';
import PhoneInput from '../../blocks/PhoneInput';

const validators = [
  {
    key: 'phone',
    validator: [requiredValidator],
  },
  {
    key: 'firstName',
    validator: [requiredValidator],
  },
  {
    key: 'lastName',
    validator: [requiredValidator],
  },
  {
    key: 'password',
    validator: [requiredValidator],
  },
  {
    key: 'email',
    validator: [requiredValidator, emailValidator],
  },
];

class SignUp extends PureComponent {
    state = {
      form: {
        phone: '',
        firstName: '',
        lastName: '',
        password: '',
        email: '',
      },
    }
    onSubmit = (e) => {
      e.preventDefault();

      const { 
        firstName, 
        lastName, 
        password, 
        email,
        phone,
      } = this.state.form;

      var data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        phone: phone,
      };
      this.props.create(data);
    }

    handleChange = (e) => {
      const { name, value } = e.target;

      this.setState({
        form: {
          ...this.state.form,
          [name]: value,
        },
      });
    }

    render() {
        const { form } = this.state;
        const { error } = this.props;

        return (
          <div className={styles.wrapper_welcome_block}>
            <p>Create New Account</p>
            <form onSubmit={this.onSubmit} className={styles.form}>
              <div>
                <span className={styles.required_field}>First Name</span>
                <Input
                  name='firstName'
                  marginBottom
                  marginTop
                  onChange={this.handleChange}
                  placeholder='Enter first name'
                  value={form.firstName}
                  blur
                  validate={[requiredValidator]}
                />
              </div>
              <div>
                <span className={styles.required_field}>Last Name</span>
                <Input
                  name='lastName'
                  marginBottom
                  marginTop
                  onChange={this.handleChange}
                  placeholder='Enter last name'
                  value={form.lastName}
                  blur
                  validate={[requiredValidator]}
                />
              </div>
              <div>
                <span className={styles.required_field}>Email Address</span>
                <Input
                  type="email"
                  marginBottom
                  marginTop
                  name='email'
                  onChange={this.handleChange}
                  placeholder='mail@mail.com'
                  value={form.email}
                  blur
                  validate={[requiredValidator, emailValidator]}
                />
              </div>
              <div>
                <span className={styles.required_field}>Phone Number</span>
                <PhoneInput 
                  name='phone'
                  onChange={this.handleChange}
                  placeholder='Enter your phone'
                  value={form.phone}
                  blur
                  validate={[requiredValidator]}
                />
              </div>
              <div>
                <span className={styles.required_field}>Password</span>
                <Input
                  type='password'
                  name='password'
                  marginBottom
                  marginTop
                  onChange={this.handleChange}
                  placeholder='****'
                  value={form.password}
                  blur
                  validate={[requiredValidator]}
                />
              </div>
              <div className={styles.submit_button}>
                <span className={styles.errorMessage}>{error}</span>
                <Button 
                  text='SIGN UP'
                  type='submit'
                  disabled={!isFormValid(form, validators)}
                />
              </div>
            </form>
          </div>
    );
    }
}

export default SignUp;

SignUp.propTypes = {
   create: PropTypes.func.isRequired,
   error: PropTypes.string.isRequired,
};