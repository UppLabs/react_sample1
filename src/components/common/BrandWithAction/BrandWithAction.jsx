import React, { Fragment } from 'react';
import cn from 'classname';
import PropTypes from 'prop-types';
import styles from './BrandWithAction.scss';
import { 
  BRAND_ACTIVATED, 
  BRAND_ACCEPT_INVITATION, 
  BRAND_ACTION_REQUIRED, 
  BRAND_PENDING, 
} from '../../../constants/brandStatus';
import history from '../../../utils/history';

const BrandWithAction = ({ item, openAcceptInvitationModal }) => {

  const openAcceptedInvitation = (supplier) => {
    openAcceptInvitationModal(supplier);
  };

  const openActivationPage = () => {
    history.push(`/admin/activation/${item.supplier.id}`);
  };

  const status = () => {
    let className = '';
    let open = () => {};

    switch(item.status) {
      case BRAND_ACTIVATED: 
        className = 'ic-check_circle';
        open = openActivationPage;
        break;
      case BRAND_ACCEPT_INVITATION:
        className = 'ic-arrow_circle';
        open = openAcceptedInvitation;
        break;
      case BRAND_ACTION_REQUIRED:
        className = 'ic-arrow_circle';
        open = openActivationPage;
        break;
      case BRAND_PENDING:
        className = 'ic-watch';
        break;
      default:
        break;
    }

    return (
      <Fragment>
        <span className={cn(styles.icon, className)} />
        <span onClick={() => open(item.supplier)} className={styles.text}>{item.status}</span>
      </Fragment>
    );
  };

   return (
     <div className={styles.container}>
       <div className={styles.status}>
         {status()}
       </div>
       <hr />
       <div className={styles.logo}>
         <img src={item.supplier.small_logo_path} alt="Logo" />
       </div>
     </div>
   );
};

export default BrandWithAction;

BrandWithAction.propTypes = {
  item: PropTypes.object.isRequired,
  openAcceptInvitationModal: PropTypes.func.isRequired,
};
