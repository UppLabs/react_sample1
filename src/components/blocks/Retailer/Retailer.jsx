import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import Toolbar from '../../common/Toolbar';
import styles from './Retailer.scss';
import SimpleInput from '../../common/SimpleInput';
import StoresModal from '../StoresModal';

class Retailer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openStores: false,
      editERPID: false,
      erpid: this.props.retailer_id_in_source ? this.props.retailer_id_in_source : '',
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if(
  //     nextProps.retailer_id_in_source && 
  //     prevState.erpid !== nextProps.retailer_id_in_source && 
  //     prevState.editERPID === false
  //   ) {
  //     return {
  //       erpid: nextProps.retailer_id_in_source,
  //     };
  //   }
  //   return null;
  // }

  componentDidlMount() {
    window.scrollTo(0, 0);
  }

  openStoresModal = () => {
    this.setState({
      openStores: true,
    });
  }

  closeStoresModal = () => {
    this.setState({
      openStores: false,
    });
  }

  editERPID = () => {
    this.setState({
      editERPID: true,
    });
  }

  saveERPID = () => {
    this.setState({
      editERPID: false,
    });

    const permissionData = {
      retailer_id_in_source: this.state.erpid,
    };

    this.props.putPermissions && this.props.putPermissions(this.props.retailer.id, permissionData);
  }

  handleChange = (event) => {
    this.setState({
      erpid: event.target.value,
    });
  }

  render() {
    const { saveErpId } = this.props;
    const { 
      name, 
      website, 
      admin_contact, 
      square_logo_path, 
      status,
      stores,
      id,
    } = this.props.retailer;

    const { email, first_name, last_name, role, phone } = admin_contact || {};

    return (
      <div>
        <StoresModal
          id={id}
          saveErpId={saveErpId}
          name={name}
          stores={stores} open={this.state.openStores}
          onClose={this.closeStoresModal}
        />
        <div className={styles.singleRetailer}>
          <div className={styles.singleRetailerTop}>
            <div className={styles.singleRetailerLogo}>
              <img alt="" src={square_logo_path} />
            </div>
            <span className={styles.singleRetailerName}>{name}</span>
            <p className={styles.status}>{status}</p>
          </div>
          <Toolbar name="Details" />
          <div className={styles.singleRetailerInfo}>
            <div>
              <h3>RETAILER DETAILS</h3>
              <dl>
                <dt>Company name:</dt>
                <dd>{name}</dd>
                <dt>Website:</dt>
                <dd>
                  <a
                    target="_blank" rel="noopener noreferrer"
                    href={`http://${website}`}
                  >
                    {website}
                  </a>
                </dd>            
                <dt>ERP ID:</dt>
                <dd className={styles.erpidEdit}>
                  {
                    this.state.editERPID 
                    ? <SimpleInput 
                      type="text" 
                      name="erpid"
                      value={this.state.erpid} 
                      onChange={this.handleChange} 
                    /> 
                    : this.state.erpid ? <a className={styles.erpid}>{this.state.erpid}</a> : null
                  }
                  {
                    !this.state.editERPID 
                    ? <span onClick={this.editERPID} className={cn(styles.edit, 'ic-edit')} />
                    : <span onClick={this.saveERPID} className={cn(styles.edit, 'ic-save')} />
                  }
                </dd>
                <dt>Stores</dt>
                <dd>
                  <a>{stores.length}</a>
                  <span onClick={this.openStoresModal} className={cn(styles.edit, 'ic-edit')} />
                </dd>
              </dl>
            </div>
            <div>
              <h3>CONTACT DETAILS</h3>
              <dl>
                <dt>Name:</dt>
                <dd>{`${first_name} ${last_name}`}</dd>
                <dt>E-mail:</dt>
                <dd><a href={`mailto:${email}`}>{email}</a></dd>
                <dt>Phone:</dt>
                <dd>{phone}</dd>
                <dt>Job title:</dt>
                <dd>{role}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Retailer;

Retailer.defaultProps = {
  retailer_id_in_source: null,
};

Retailer.propTypes = {
  retailer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired, 
    website: PropTypes.string.isRequired, 
    ecommerce_platform: PropTypes.string.isRequired, 
    admin_contact: PropTypes.object.isRequired,
    square_logo_path: PropTypes.string.isRequired,
    status: PropTypes.string,
    stores: PropTypes.array,
  }).isRequired,
  retailer_id_in_source: PropTypes.string,
  putPermissions: PropTypes.func.isRequired,
  saveErpId: PropTypes.func.isRequired,
};