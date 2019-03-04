import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductsPermissions from '../../components/blocks/ProductsPermissions';
import { 
  setRetailerProductsSearch, 
  setRetailerProductsOrderField, 
  getRetailerProducts, 
  getRetailerProductsFilters,
  retailerProductsCheck,
  retailerProductsUncheck,
  setRetailerProductsOrder,
  setRetailerProductsCurrentFilter,
  setRetailerProductsOffset,
  retailerProductsApprove,
  retailerProductsUnapprove,
  retailerProductsApproveChecked,
  retailerProductsUnapproveChecked,
  retailerProductsSaveVariants,
  retailerProductsCheckAllOnPage,
  retailerProductsCheckAll,
  retailerProductsUncheckAll,
  setRetailerProductsDefaultApproved,
  setRetailerProductsModalOpen,
  setRetailerProductsModalClose, 
} from '../../store/actions/retailerProducts';
import Spinner from '../../components/common/Spinner';
import ApproveSizesModal from '../../components/blocks/ApproveSizesModal';

class ProductsPermissionsContainer extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getFilters();
    this.props.getProducts(this.props.id);
  }

  selectAllOnPage = () => {
    this.props.selectAllOnPage(this.props.data.map((item) => {
      return item.model;
    }));
  }

  render() {
    const {
      isLoading,
      closeModal,
      modal,
      product,
      reset,
    } = this.props;

    return isLoading ? <Spinner /> : (
      <div>
        {modal ? <ApproveSizesModal
          product={product} 
          open={modal} 
          onClose={closeModal}
          reset={reset}
          {...this.props}
        /> : null }
        <ProductsPermissions
          {...this.props}
          selectAllOnPage={this.selectAllOnPage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { 
    filters, data, 
    count, perPage, 
    checked, approved, 
    currentFilter, 
    productDetails,
    search,
    offset,
    isLoading,
    modal,
    product,
  } = state.retailerProducts;

  const {
    tab,
  } = state.permissions;
  
  return {
    filters,
    data,
    pageCount: Math.ceil(count / perPage),
    perPage,
    checked,
    approved,
    currentFilter,
    productDetails,
    searchQuery: search,
    tab,
    offset,
    isLoading,
    modal,
    product,
  };
};
  
const mapDispatchToProps = (dispatch, ownProps) => ({
  setPage: offset => dispatch(setRetailerProductsOffset(offset)),
  getProducts: id => dispatch(getRetailerProducts(id)),
  getFilters: () => dispatch(getRetailerProductsFilters()),
  approve: variants => dispatch(retailerProductsApprove(variants)),
  unapprove: variants => dispatch(retailerProductsUnapprove(variants)),
  approveChecked: () => dispatch(retailerProductsApproveChecked(ownProps.id)),
  unapproveChecked: () => dispatch(retailerProductsUnapproveChecked(ownProps.id)),
  productSearch: search => dispatch(setRetailerProductsSearch(search)),
  check: id => dispatch(retailerProductsCheck(id)),
  uncheck: id => dispatch(retailerProductsUncheck(id)),
  setFilter: filter => dispatch(setRetailerProductsCurrentFilter(filter)), 
  saveVariants: () => dispatch(retailerProductsSaveVariants(ownProps.id)),
  selectAllOnPage: ids => dispatch(retailerProductsCheckAllOnPage(ids)),
  selectAll: () => dispatch(retailerProductsCheckAll()),
  unselectAll: () => dispatch(retailerProductsUncheckAll),
  setDefaultApproved: () => dispatch(setRetailerProductsDefaultApproved()),
  openModal: product => dispatch(setRetailerProductsModalOpen(product)),
  closeModal: () => dispatch(setRetailerProductsModalClose),
  reset: () => dispatch(setRetailerProductsDefaultApproved()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPermissionsContainer);

ProductsPermissionsContainer.defaultProps = {
  checked: [],
};

ProductsPermissionsContainer.propTypes = {
  perPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,    
  getFilters: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  productSearch: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
  uncheck: PropTypes.func.isRequired,
  checked: PropTypes.array,
  setFilter: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  tab: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  selectAllOnPage: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
};
