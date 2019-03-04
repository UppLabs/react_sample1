import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BrandWithAction from '../../common/BrandWithAction';
import styles from './MyBrands.scss';

class MyBrands extends PureComponent {

  render() {
    const { data, openAcceptInvitationModal } = this.props;

    return (
      <div className={styles.container}>
        {data.map((value, index) => (<BrandWithAction
          openAcceptInvitationModal={openAcceptInvitationModal} item={value}
          key={index}
        />))}
      </div>
    );
  }
}

export default MyBrands;

MyBrands.propTypes = {
  data: PropTypes.array.isRequired,
  openAcceptInvitationModal: PropTypes.func.isRequired,
};
