import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateNewRetailerAccount.scss';
import Input from '../Input';
import Checkbox from '../../common/Checkbox';
import Button from '../../common/Button';
import Select from '../../common/Select';
import { requiredValidator, emailValidator, isFormValid } from '../../../utils/validators';
import PhoneInput from '../PhoneInput';
import { platforms } from '../../../constants/platforms';


const validators = [
  {
    key: 'name',
    validator: [requiredValidator],
  },
  {
    key: 'ecommerce_platform',
    validator: [requiredValidator],
  },
  {
    key: 'admin_contact.first_name',
    validator: [requiredValidator],
  },
  {
    key: 'admin_contact.last_name',
    validator: [requiredValidator],
  },
  {
    key: 'admin_contact.email',
    validator: [requiredValidator, emailValidator],
  },
  {
    key: 'admin_contact.phone',
    validator: [requiredValidator],
  },
];

class CreateNewRetailerAccount extends PureComponent {
  state = {
    isSameDetail: true,
    form: {
      admin_contact: {},
      billing_contact: {},
    },
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { form, isSameDetail } = this.state;

    const data = { ...form };

    if(isSameDetail) {
      data.billing_contact = data.admin_contact;
    }

    this.props.submit(data);
  }

  changeSameDetailsCheckbox = (value) => {
    this.setState({
      isSameDetail: value,
    });
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if(name.indexOf('.') > 0) {
      const keys = name.split('.');

      this.setState({
        form: {
          ...this.state.form,
          [keys[0]] : {
            ...this.state.form[keys[0]],
            [keys[1]]: value,
          },
        },
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [name]: value, 
        }, 
      });
    }
  }

  validateForm = () => {
    const { form, isSameDetail } = this.state;
    let newValidators = [];
    if(!isSameDetail) {
      newValidators = [
        ...validators,
        ...[
          {
            key: 'billing_contact.first_name',
            validator: [requiredValidator],
          },
          {
            key: 'billing_contact.last_name',
            validator: [requiredValidator],
          },
          {
            key: 'billing_contact.email',
            validator: [requiredValidator, emailValidator],
          },
          {
            key: 'billing_contact.phone',
            validator: [requiredValidator],
          },
        ],
      ];
    } else {
      newValidators = validators;
    }

    return !isFormValid(form, newValidators);
  }

  render() {
    const { isSameDetail, form } = this.state;

    return (
      <div className={styles.wrapper_welcome_block}>
        <p>Create New Retailer Account</p>
        <div className={styles.container}>
          <form onSubmit={this.onSubmit}>
            <div className={styles.form}>
              <div>
                <h3>Bussiness Information</h3>    
                <div>
                  <span className={styles.requiredField}>Company Name</span>
                  <Input
                    name="name" value={form.name}
                    onChange={this.handleChange}
                    validate={[requiredValidator]}
                    blur
                    marginTop
                    marginBottom
                  />
                </div> 
                <div>
                  <span>Website Address</span>
                  <Input
                    name="website"
                    value={form.website}
                    onChange={this.handleChange}
                    marginTop
                    marginBottom
                  />
                </div> 
                <div>
                  <span className={styles.requiredField}>e-Commerce platform</span>
                  <Select
                    onChange={this.handleChange}
                    name="ecommerce_platform" 
                    options={platforms}
                    blur
                    validate={[requiredValidator]}
                  />
                </div> 
              </div>
              <div>
                <h3>Business Contact Details</h3>
                <div>
                  <span className={styles.requiredField}>First Name</span>
                  <Input
                    name="admin_contact.first_name"
                    value={form.admin_contact.first_name}
                    onChange={this.handleChange}
                    validate={[requiredValidator]}
                    blur
                    marginTop
                    marginBottom
                  />
                </div> 
                <div>
                  <span className={styles.requiredField}>Last Name</span>
                  <Input
                    name="admin_contact.last_name" 
                    value={form.admin_contact.last_name}
                    onChange={this.handleChange}
                    validate={[requiredValidator]}
                    blur
                    marginTop
                    marginBottom
                  />
                </div> 
                <div>
                  <span className={styles.requiredField}>Email Address</span>
                  <Input
                    name="admin_contact.email"
                    value={form.admin_contact.email}
                    onChange={this.handleChange}
                    validate={[requiredValidator, emailValidator]}
                    blur
                    marginTop
                    marginBottom
                  />
                </div> 
                <div>
                  <span className={styles.requiredField}>Phone Number</span>
                  <PhoneInput 
                    name='admin_contact.phone'
                    onChange={this.handleChange}
                    placeholder='Enter your phone'
                    value={form.admin_contact.phone}
                    blur
                    validate={[requiredValidator]}
                    marginTop
                    marginBottom
                  />
                </div> 
                <div>
                  <Checkbox 
                    checked={isSameDetail} 
                    onChange={this.changeSameDetailsCheckbox} 
                    value="Use the same detail for billing contact" 
                  />
                </div>
              </div>
              {!isSameDetail ?
                <div>
                  <h3>Billing Contact Details</h3>
                  <div>
                    <span className={styles.requiredField}>First Name</span>
                    <Input
                      name="billing_contact.first_name"
                      value={form.billing_contact.first_name}
                      onChange={this.handleChange}
                      marginTop
                      blur
                      validate={[requiredValidator]}
                      marginBottom
                    />
                  </div> 
                  <div>
                    <span className={styles.requiredField}>Last Name</span>
                    <Input
                      name="billing_contact.last_name"
                      value={form.billing_contact.last_name}
                      onChange={this.handleChange}
                      marginTop
                      blur
                      validate={[requiredValidator]}
                      marginBottom
                    />
                  </div> 
                  <div>
                    <span className={styles.requiredField}>Email Address</span>
                    <Input
                      name="billing_contact.email" 
                      value={form.billing_contact.email}
                      onChange={this.handleChange}
                      marginTop
                      blur
                      validate={[requiredValidator]}
                      marginBottom
                    />
                  </div> 
                  <div>
                    <span className={styles.requiredField}>Phone Number</span>
                    <PhoneInput 
                      name='billing_contact.phone'
                      onChange={this.handleChange}
                      placeholder='Enter your phone'
                      value={form.billing_contact.phone}
                      blur
                      validate={[requiredValidator]}
                      marginTop
                      marginBottom
                    />
                  </div> 
                </div>
              : null  
            }
            </div>
            <div className={styles.buttons}>
              <Button 
                type="submit"
                disabled={this.validateForm()}
                text="Create"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateNewRetailerAccount;

CreateNewRetailerAccount.propTypes = {
  submit: PropTypes.func.isRequired,
};