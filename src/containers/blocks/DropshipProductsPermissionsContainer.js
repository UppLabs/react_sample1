import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DropshipProducts from '../../components/blocks/DropshipProducts';
import { 
  setDropshipProductsOffset, 
  getDropshipProducts, 
  setDropshipProductsOrder, 
  setDropshipProductsOrderField, 
  setDropshipProductsSearch, 
  dropshipProductsCheck, 
  dropshipProductsUncheck, 
  setDropshipProductsCurrentFilter,
  setDropshipProductsSupplierId,
  getDropshipProductsBrands,
  dropshipProductsCheckAll,
  dropshipProductsCheckAllOnPage,
  dropshipProductsUncheckAll,
  dropshipProductsApproveChecked,
  dropshipProductsUnapproveChecked, 
} from '../../store/actions/dropshipProducts';
import Spinner from '../../components/common/Spinner';

class DropshipProductsPermissionsContainer extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getDropshipBrands();
  }

  render() {
    return this.props.isLoading ? <Spinner /> : (
      <div>
        <DropshipProducts
          {...this.props}
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
    search,
    isLoading,
    offset,
    brands,
  } = state.dropshipProducts;

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
    searchQuery: search,
    tab,
    isLoading,
    offset,
    brands,
  };
};
  
const mapDispatchToProps = (dispatch, ownProps) => ({
  getDropshipBrands: () => dispatch(getDropshipProductsBrands()),
  setPage: offset => dispatch(setDropshipProductsOffset(offset)),
  getProducts: () => dispatch(getDropshipProducts()),
  approveChecked: () => dispatch(dropshipProductsApproveChecked(ownProps.id)),
  unapproveChecked: () => dispatch(dropshipProductsUnapproveChecked(ownProps.id)),
  setSortOrder: () => dispatch(setDropshipProductsOrder()),
  setSortOrderField: () => dispatch(setDropshipProductsOrderField()),
  productSearch: search => dispatch(setDropshipProductsSearch(search)),
  check: id => dispatch(dropshipProductsCheck(id)),
  uncheck: id => dispatch(dropshipProductsUncheck(id)),
  setFilter: filter => dispatch(setDropshipProductsCurrentFilter(filter)), 
  setSupplierId: id => dispatch(setDropshipProductsSupplierId(id)),
  selectAll: () => dispatch(dropshipProductsCheckAll()),
  selectAllOnPage: ids => dispatch(dropshipProductsCheckAllOnPage(ids)),
  unselectAll: () => dispatch(dropshipProductsUncheckAll),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropshipProductsPermissionsContainer);

DropshipProductsPermissionsContainer.defaultProps = {
  checked: [],
};

DropshipProductsPermissionsContainer.propTypes = {
  perPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,    
  getDropshipBrands: PropTypes.func.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  setSortOrderField: PropTypes.func.isRequired,
  productSearch: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
  uncheck: PropTypes.func.isRequired,
  checked: PropTypes.array,
  setFilter: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
