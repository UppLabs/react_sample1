import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './AccountInfo.scss';

class AccountInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { retailer, openEdit } = this.props;
    
    return (
      <div>
        <div className={styles.container}>
          <a onClick={openEdit}>Edit</a>
          <div className={styles.info}>
            <div>
              <h3>Retailer details</h3>
              <dl>
                <dt>Company name:</dt>
                <dd>{retailer.name}</dd>
                <dt>Website:</dt>
                <dd>
                  <a
                    target="_blank" rel="noopener noreferrer"
                    href={retailer.website && retailer.website.indexOf('http://') > 0 
                    ? retailer.website 
                    : 'http://'+retailer.website}
                  >
                    {retailer.website}
                  </a>
                </dd>
                <dt>eCom platform:</dt>
                <dd>{retailer.ecommerce_platform}</dd>
                {/* <dt>API Key:</dt>
                <dd>
                  2343-2343-2343-2343
                  <span className="ic-copy" />
                </dd>
                <dt>Password:</dt>
                <dd>
                  **************
                  <span className="ic-edit" />
                </dd>
                <dt>Shared secret:</dt>
                <dd>myDoglsSuperman</dd> */}
              </dl>
            </div>
            <hr />
            <div>
              <h3>Business Contact Information</h3>
              <dl>
                <dt>Name:</dt>
                <dd>{`${retailer.admin_contact.first_name} ${retailer.admin_contact.last_name}`}</dd>
                <dt>E-mail:</dt>
                <dd><a href={`mailto:${retailer.admin_contact.email}`}>{retailer.billing_contact.email}</a></dd>
                <dt>Phone number:</dt>
                <dd>{retailer.admin_contact.phone}</dd>
              </dl>
            </div>
            <hr />
            <div>
              <h3>Billing Contact Information</h3>
              <dl>
                <dt>Name:</dt>
                <dd>{`${retailer.billing_contact.first_name} ${retailer.billing_contact.last_name}`}</dd>
                <dt>E-mail:</dt>
                <dd><a href={`mailto:${retailer.billing_contact.email}`}>{retailer.billing_contact.email}</a></dd>
                <dt>Phone number:</dt>
                <dd>{retailer.billing_contact.phone}</dd>
              </dl>
            </div>
            {/* <div className={styles.payment}>
              <h3>Payment</h3>
              <dl>
                <dt>Credit card:</dt>
                <dd>
                  <span className="ic-mastercard">
                    <span className="path1" />
                    <span className="path2" />
                  </span>
                  <span>
                    MASTERCARD X-4444
                  </span>          
                </dd>
                <dt />
                <dd>
                  <span className="ic-visa">
                    <span className="path1" />
                    <span className="path2" />
                  </span>
                  <span>
                    VISA X-4444
                  </span>          
                </dd>
                <dt>Billing method:</dt>
                <dd>
                  <span className="ic-stripe" />
                  <span>by Stripe</span>          
                </dd>
              </dl>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default AccountInfo;

AccountInfo.propTypes = {
  retailer: PropTypes.shape({
    name: PropTypes.string, 
    website: PropTypes.string, 
    ecommerce_platform: PropTypes.string, 
    admin_contact: PropTypes.object.isRequired,
    billing_contact: PropTypes.object.isRequired,
  }).isRequired,
  openEdit: PropTypes.func.isRequired,
};