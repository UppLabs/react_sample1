import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../components/common/Spinner';
import AccountInfo from '../../components/blocks/AccountInfo';
import { getAdminAccountInfo, postAdminAccountInfo } from '../../store/actions/adminAccountInfo';
import EditAccountModal from '../../components/blocks/EditAccountModal/EditAccountModal';

class AccountInfoContainer extends PureComponent {
   state = {
      open: false,
   };

   componentDidMount = () => {
      this.props.getInfo();
   };

   openModal = () => {
      this.setState({
        open: true,
      });
    }
  
    closeModal = () => {
      this.setState({
        open: false,
      });
    }

   render() {
      return this.props.isLoading ? <Spinner /> : (
        <Fragment>
          {this.state.open ? <EditAccountModal
            open={this.state.open} onClose={this.closeModal}
            {...this.props}
          /> : null}
          <AccountInfo {...this.props} openEdit={this.openModal} />
        </Fragment>
      );
   }
}

const mapStateToProps = (state) => {
   const { data, isLoading  } = state.adminAccountInfo;

   return {
      retailer: data,
      isLoading,
   };
};

const mapDispatchToProps = dispatch => ({
   getInfo: () => dispatch(getAdminAccountInfo()),
   saveInfo: data => dispatch(postAdminAccountInfo(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AccountInfoContainer);

AccountInfoContainer.propTypes = {
  getInfo: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
//   saveInfo: PropTypes.func.isRequired,
};
