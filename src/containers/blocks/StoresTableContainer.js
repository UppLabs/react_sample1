import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toolbar from '../../components/common/Toolbar';
import Spinner from '../../components/common/Spinner';
import StoresTable from '../../components/blocks/StoresTable';
import { 
  getAdminStores, 
  getAdminUserStores, 
  postAdminUserStores, 
  deleteAdminUserStores,
 } from '../../store/actions/adminStores';
import UserStoresModal from '../../components/blocks/UserStoresModal';

class StoresTableContainer extends PureComponent {
  state = {
    open: false,
    storeName: '',
    storeId: 0,
  }

  componentDidMount() {
    this.props.getStores();
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  }

  openModal = (storeName, storeId) => {
    this.props.getUserStores();
    this.setState({
      open: true,
      storeName,
      storeId,
    });
  }

  render() {
    const { open, storeName, storeId } = this.state;
    const { isLoading, users, submit, deleteStorePermissions } = this.props;

    return isLoading ? <Spinner /> : (
      <div>
        <Toolbar name="Stores" />
        {open && users.length > 0 ? <UserStoresModal
          open={open}
          onClose={this.closeModal}
          storeName={storeName}
          users={users}
          storeId={storeId}
          submit={submit}
          deletePermissions={deleteStorePermissions}
        /> : null}
        <StoresTable openModal={this.openModal} {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = ({ adminStores }) => {
  const { data, isLoading, users } = adminStores;

  return {
    data,
    isLoading,
    users,
  };
};

const mapDispatchToProps = dispatch => ({
  getStores: () => dispatch(getAdminStores()),
  getUserStores: () => dispatch(getAdminUserStores()),
  submit: (storeId, userId) => dispatch(postAdminUserStores(storeId, userId)),
  deleteStorePermissions: (storeId, data) => dispatch(deleteAdminUserStores(storeId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoresTableContainer);

StoresTableContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  getStores: PropTypes.func.isRequired,
  getUserStores: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  submit: PropTypes.func.isRequired,
  deleteStorePermissions: PropTypes.func.isRequired,
};
