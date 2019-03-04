/*eslint no-useless-escape: 1 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import creditCardType, { types as CardType } from 'credit-card-type';
import Phone from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import ModalWindow from '../../common/Modal';
import Button from '../../common/Button';
import styles from './EditAccountModal.scss';
import { cardNumberHideFormat } from '../../../utils/formatHelper';

const cards = [
  {
    id: 1,
    cardNumber: '4444444444444448',
  },
  {
    id: 2,
    cardNumber: '5579791344197441',
  },
];

 class EditAccountModal extends PureComponent {
  constructor(props) {
    super(props);

    const newRetailer = { 
      name: props.retailer.name,
      website: props.retailer.website,
      admin_contact: props.retailer.admin_contact,
      billing_contact: props.retailer.billing_contact,
    };

    this.state = { 
      form: newRetailer,
      open: this.props.open, 
      editCards: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.open != nextProps.open) {
      return {
        open: nextProps.open,
        editPlatform: false,
        editCards: [],
      };
    }

    return null;
  }

  editPlatform = () => {
    this.setState({
      editPlatform: true,
    });
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

    handleSubmit = (event) => {
      event.preventDefault();

      this.props.saveInfo(this.state.form);
      this.props.onClose();

      // {
      //   "name": "string",
      //   "website": "string",
      //   "ecommerce_platform": "magento",
      //   "admin_contact": {
      //     "first_name": "string",
      //     "last_name": "string",
      //     "email": "string",
      //     "role": "string"
      //   },
      //   "billing_contact": {
      //     "first_name": "string",
      //     "last_name": "string",
      //     "email": "string",
      //     "role": "string"
      //   },
      //   "split_injection_by_property": "color"
      // }
    }

    editCard = (id) => {
      this.setState({
        editCards: [
          ...this.state.editCards,
          id,
        ],
      });
    }

    cards = () => {
      const results = cards.map((value) => {
        const cardType = creditCardType(value.cardNumber)[0].type;
        let cardClass = '';

        switch (cardType) {
          case CardType.VISA:
            cardClass = 'ic-visa';
            break;
          case CardType.MASTERCARD:
            cardClass = 'ic-mastercard';
            break;
          default:
            break;
        }

        if(this.state.editCards.indexOf(value.id) > -1) {
          return (
            <input
              onChange={this.handleChange} 
              key={value.id}
              name="card" type="text"
            />
          );
        }

        return (
          <div key={value.id}>
            <span className={cardClass}>
              <span className="path1" />
              <span className="path2" />
            </span>
            <span>
              {`${cardType.toUpperCase()} ${cardNumberHideFormat(value.cardNumber)}`} 
            </span>
            <a onClick={() => this.editCard(value.id)}>Change card</a>
          </div>
        );
      });
      return results;
    }

    render() {
        const { onClose, retailer } = this.props;
        const { open, editPlatform, form } = this.state;

        return (
          <ModalWindow
            open={open} onClose={onClose}
          >
            <form onSubmit={this.handleSubmit}>
              <h2>Edit profile</h2>
              <hr />
              <div className={styles.body}>
                <div>
                  <h3>Retailer details</h3>
                  <label htmlFor="companyName">
                    <span>Company name</span>
                    <input
                      value={form.name}
                      onChange={this.handleChange}
                      name="name" type="text"
                      placeholder="Company name"
                      id="companyName"
                    />
                  </label>
                  <label htmlFor="website">
                    <span>Website address</span>
                    <input
                      value={form.website}
                      onChange={this.handleChange}
                      name="website" type="text"
                      placeholder="example.com"
                      id="website"
                    />
                  </label>
                  {/* <label htmlFor="platform">
                    <span>eCommerce platform
                      { !editPlatform ?
                        <a onClick={() => this.editPlatform()}>
                          <span className="ic-edit" />
                        Edit
                        </a>
                      : null
                    }
                    </span>
                    <span>Shopify</span>
                  </label>
                  { editPlatform ? 
                    <div>
                      <label htmlFor="apiKey">
                        <span>API Key</span>
                        <input
                          onChange={this.handleChange}
                          name="apiKey" type="text"
                          id="apiKey"
                        />
                      </label>
                      <label htmlFor="password">
                        <span>Password</span>
                        <input
                          onChange={this.handleChange}
                          name="password" type="password"
                          placeholder="Enter new password"
                          id="password"
                        />
                      </label>
                      <label htmlFor="secret">
                        <span>Shared secret</span>
                        <input
                          onChange={this.handleChange}
                          name="secret" type="text"
                          id="secret"
                        />
                      </label> 
                    </div>
                  : null   
                } */}
                </div>
                <hr />
                <div>
                  <h3>Business Contact Information</h3>
                  <label htmlFor="firstName">
                    <span>First Name</span>
                    <input
                      value={form.admin_contact.first_name}
                      onChange={this.handleChange}
                      name="admin_contact.first_name" type="text"
                      id="firstName"
                    />
                  </label>
                  <label htmlFor="lastName">
                    <span>Last Name</span>
                    <input
                      value={form.admin_contact.last_name}
                      onChange={this.handleChange}
                      name="admin_contact.last_name" type="text"
                      id="lastName"
                    />
                  </label>
                  <label htmlFor="email">
                    <span>Email address</span>
                    <input
                      value={form.admin_contact.email}
                      onChange={this.handleChange}
                      name="admin_contact.email" type="text"
                      placeholder="mail@mail.com"
                      id="email"
                    />
                  </label>
                  <label htmlFor="phone">
                    <span>Phone number</span>
                    <Phone
                      id="phone"
                      placeholder="Enter phone number"
                      value={form.admin_contact.phone}
                      onChange={value => this.setState({
                        form: {
                          ...form,
                          admin_contact: {
                            ...form.admin_contact,
                            phone: value, 
                          },
                        }, 
                      })}
                    />
                  </label>
                </div>
                <hr />
                <div>
                  <h3>Billing Contact Information</h3>
                  <label htmlFor="firstName">
                    <span>First Name</span>
                    <input
                      value={form.billing_contact.first_name}
                      onChange={this.handleChange}
                      name="billing_contact.first_name" type="text"
                      id="firstName"
                    />
                  </label>
                  <label htmlFor="lastName">
                    <span>First Name</span>
                    <input
                      value={form.billing_contact.last_name}
                      onChange={this.handleChange}
                      name="billing_contact.last_name" type="text"
                      id="lastName"
                    />
                  </label>
                  <label htmlFor="email">
                    <span>Email address</span>
                    <input
                      value={form.billing_contact.email}
                      onChange={this.handleChange}
                      name="billing_contact.email" type="text"
                      placeholder="mail@mail.com"
                      id="email"
                    />
                  </label>
                  <label htmlFor="phone">
                    <span>Phone number</span>
                    <Phone
                      id="phone"
                      placeholder="Enter phone number"
                      value={form.billing_contact.phone}
                      onChange={value => this.setState({
                        form: {
                          ...form,
                          billing_contact: {
                            ...form.billing_contact,
                            phone: value, 
                          },
                        }, 
                      })}
                    />
                  </label>
                </div>
                {/* <div>
                  <h3>Payment</h3>
                  <label htmlFor="card">
                    <span>Credit card</span>
                    <div className={styles.cards}>
                      {this.cards()}
                    </div>
                  </label>
                  <label htmlFor="billing">
                    <span>Billing method</span>
                    <div className={styles.cards}>
                      <div>
                        <span className="ic-stripe" />
                        <span>by Stripe</span>      
                      </div>
                    </div>
                  </label>
                </div> */}
              </div>
              <hr />
              <div className={styles.footer}>
                <Button
                  type="submit"
                  color="green" text="SAVE"
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

export default EditAccountModal;

EditAccountModal.defaultProps = {
  open: false,
};

EditAccountModal.propTypes = {
  retailer: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  saveInfo: PropTypes.func.isRequired,
};


