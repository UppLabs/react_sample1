/*eslint no-useless-escape: 1 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../common/Button';
import styles from './SignIn.scss';
import Input from '../../blocks/Input';
import { requiredValidator, isFormValid, emailValidator } from '../../../utils/validators';

const validators = [
  {
    key: 'username',
    validator: [requiredValidator, emailValidator],
  },
  {
    key: 'password',
    validator: [requiredValidator],
  },
];

class SignIn extends Component {

  state = {
    form: {
      password: '',
      username: '',
    },
  }

  onSubmit = (e) => {
    const { username, password } = this.state.form;
    this.props.signIn({ 
      username,
      password,
      client_id: '*',
      client_secret: '*',
      grant_type: 'password',
      scope: '*'
    });
 
    e.preventDefault();
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

  handlePassword = (e) => {
    const value = e.target.value;
    this.props.authenticated();
    this.setState({
      form: {
        ...this.state.form,
        password: value,
      },
    });
  }

  render() {
    const { form } = this.state;
    const { isError } = this.props;

    return (
      <div className={styles.wrapper_signin_block}>
        <p className={styles.title}>Sign IN</p>
        <p>or</p>
        <p className={styles.signup}><Link to='/signup'>Sign up</Link></p>
        <form onSubmit={this.onSubmit} className={styles.form}>
          <Input
            name="username"
            type='email'
            onChange={this.handleChange}
            placeholder='Enter your email address'
            value={form.username}
            validate={[requiredValidator, emailValidator]}
            blur
          />
          <Input
            name="password"
            type='password'
            onChange={this.handlePassword} 
            placeholder='Enter password'
            marginTop
            value={form.password}
            validate={[requiredValidator]}
            blur
          />
          <div className={styles.settings}>
            <p><Link to='/forgot'>Forgot Password?</Link></p>
          </div>
          <div className={styles.submit_button}>
            <span className={styles.errorMessage}>{isError ? 'Wrong password or email' : ''}</span>
            <Button
              type='submit'
              text='SIGN IN'
              disabled={!isFormValid(form, validators)}
            />
          </div>
        </form>
      </div>
      );
  }
}

export default SignIn;

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  authenticated: PropTypes.func.isRequired,
};
