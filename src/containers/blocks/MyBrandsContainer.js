import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyBrands from '../../components/blocks/MyBrands';
import { 
  getAdminBrandsSuppliers, 
  getAdminBrandsInvitation,
  adminBrandsAcceptInvitation, 
} from '../../store/actions/adminBrands';
import Spinner from '../../components/common/Spinner';
import AcceptInvitationModal from '../../components/blocks/AcceptInvitationModal';

class MyBrandsContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      supplier: {},
    };
  }

  componentDidMount(){
    this.props.getSuppliers();
    this.props.getInvitations();
  }

  openModal = (supplier) => {
    this.setState({
      open: true,
      supplier: supplier,
    });
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  }
  
  render() {
    const { isLoading, acceptInvitation } = this.props;
    return isLoading ? <Spinner /> : (
      <Fragment>
        <AcceptInvitationModal
          supplier={this.state.supplier} open={this.state.open}
          onClose={this.closeModal}
          acceptInvitation={acceptInvitation}
        />
        <MyBrands openAcceptInvitationModal={this.openModal} {...this.props} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { data, isLoading } = state.adminBrands;

  return {
    isLoading,
    data,
  };
};

const mapDispatchToProps = dispatch => ({
  getSuppliers: () => dispatch(getAdminBrandsSuppliers()),
  getInvitations: () => dispatch(getAdminBrandsInvitation()),
  acceptInvitation: data => dispatch(adminBrandsAcceptInvitation(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBrandsContainer);

MyBrandsContainer.propTypes = {
  getSuppliers: PropTypes.func.isRequired,
  getInvitations: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  acceptInvitation: PropTypes.func.isRequired,
};
