import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  getSupplier, 
} from '../../store/actions/suppliers';
import Panel from '../../components/common/Panel';
import CountTop from '../../components/common/CountTop/CountTop';
import PageLayout from '../../components/common/PageLayout';
import ApproveNewRetailersContainer from '../blocks/ApproveNewRetailersContainer';
import ManageReturnsContainer from '../blocks/ManageReturnsContainer';
import AssignNewProductsContainer from '../blocks/AssignNewProductsContainer';

const mapStateToProps = state => ({
  supplierId: +state.role.supplierId,
  user: state.auth.user,
  role: state.auth.currentRole,
  retailersCount: +state.approveNewRetailers.count,
  productsCount: +state.assignNewProducts.count,
  returnsCount: +state.manageReturns.count,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  getSupplier: id => dispatch(getSupplier(id)),
});

class HomeContainer extends Component {  
  render() {
    const { retailersCount, returnsCount, productsCount, supplierId } = this.props;
    return (
      <Fragment key={supplierId}>
        <Panel
          width={480} identifier='home'
          mobile='home_mobile'
        >
          <CountTop title="Approve retailers" count={retailersCount} />
          <CountTop title="Manage returns" count={returnsCount} />
          <CountTop title="Assign new products" count={productsCount} />
        </Panel>
        <PageLayout>
          <ApproveNewRetailersContainer />
          <ManageReturnsContainer />
          <AssignNewProductsContainer />
        </PageLayout>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

HomeContainer.propTypes = {
  // role: PropTypes.string.isRequired,
  // user: PropTypes.object.isRequired,
  // getUser: PropTypes.func.isRequired,
  retailersCount: PropTypes.number.isRequired,
  returnsCount: PropTypes.number.isRequired,
  productsCount: PropTypes.number.isRequired,
  supplierId: PropTypes.number.isRequired,
};
