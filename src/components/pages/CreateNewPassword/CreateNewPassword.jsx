import React, { PureComponent } from 'react';
import styles from './CreateNewPassword.scss';
import Button from '../../common/Button';
import Input from '../../blocks/Input';

class CreateNewPassword extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        text: '',
      };
    }

    handleRedirect = () => {
      console.log('redirect');
    }

    render() {
        const { text } = this.state;
        return (
          <div className={styles.wrapper_welcome_block}>
            <p>Create New Password</p>
            <Input
              type='text'
              onChange={(e) => { this.setState({ text: e.target.value }); }} 
              placeholder='New password'
              marginBottom
              value={text}
            />
            <Button
              onClick={this.handleRedirect} full_width
              text='SAVE'
            />
          </div>
    );
    }
}

export default CreateNewPassword;
