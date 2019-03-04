import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AssignNewProducts from '../../components/blocks/AssignNewProducts';
import { 
  getProducts, 
  setProductsOffset, 
  getProductsFilters, 
  setProductsCurrentFilter, 
  getProductsRetailers,
  setProductsSearch,
  productsCheck,
  productsUncheck,
  retailerSearchProducts,
  productsCheckRetailer,
  productsUncheckRetailer,
  productsSubmit,
  productsCheckAllRetailers,
  productsUncheckAllRetailers,
} from '../../store/actions/products';
import Spinner from '../../components/common/Spinner';
import Toolbar from '../../components/common/Toolbar';
import { upperFirst } from '../../utils/formatHelper';

const dropshipPath = '/products/dropship';
const replenishmentPath = '/products/replenishment';

class ProductsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
    };
  }

  componentDidMount() {
    this.props.getProductsFilters();
    this.props.getProducts();
    this.props.getProductsRetailers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length !== 0) {
      this.setState({
        spinner: false,
      });
    }
  }


  title = () => {
    return `${this.props.page !== '' ? 
      upperFirst(this.props.page) :
      this.props.pathname === dropshipPath ? 'Dropship' :
      this.props.pathname === replenishmentPath ? 'Replenishment' : ''
    } permissions`;
  }

  render() {
    return this.state.spinner !== true ? (
      <div>
        <Toolbar name={this.title()} />
        <AssignNewProducts
          {...this.props}
          products
        />
      </div>
    ) : <Spinner />;
  }
}

const mapStateToProps = (state) => {
  const { 
    data, 
    count, 
    filters, 
    retailers, 
    checked, 
    perPage, 
    checkedRetailers, 
    currentFilter, 
    search,
    offset,
    page,
  } = state.products;

  return {
    data,
    filters,
    retailers,
    checked,
    pageCount: Math.ceil(count / perPage),
    perPage,
    checkedRetailers,
    currentFilter,
    searchQuery: search,
    offset,
    page,
  };
};

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  setPage: offset => dispatch(setProductsOffset(offset)),
  getProductsFilters: () => dispatch(getProductsFilters()),  
  setFilter: filter => dispatch(setProductsCurrentFilter(filter)),  
  getProductsRetailers: () => dispatch(getProductsRetailers()),
  check: id => dispatch(productsCheck(id)),
  uncheck: id => dispatch(productsUncheck(id)),
  productSearch: search => dispatch(setProductsSearch(search)),
  retailerSearch: search => dispatch(retailerSearchProducts(search)),
  checkRetailer: id => dispatch(productsCheckRetailer(id)),
  uncheckRetailer: id => dispatch(productsUncheckRetailer(id)),
  submit: value => dispatch(productsSubmit(value)),
  selectAllRetailers: () => dispatch(productsCheckAllRetailers()),
  clearAllRetailers: () => dispatch(productsUncheckAllRetailers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ProductsContainer,
);

ProductsContainer.defaultProps = {
  checked: [],
};

ProductsContainer.propTypes = {
  setPage: PropTypes.func.isRequired, 
  data: PropTypes.array.isRequired,
  retailers: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  getProductsFilters: PropTypes.func.isRequired, 
  getProducts: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  getProductsRetailers: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
  uncheck: PropTypes.func.isRequired,
  checked: PropTypes.array,
  productSearch: PropTypes.func.isRequired,
  retailerSearch: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};
