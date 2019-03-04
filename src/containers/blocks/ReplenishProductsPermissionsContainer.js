import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  setReplenishProductsOffset,
  setReplenishProductsCurrentFilter,
  setReplenishProductsSearch,
  setReplenishProductsOrderField,
  setReplenishProductsOrder,
  buyProduct,
  resetModalProduct,
  setReplenishProductsSupplierId,
  getReplenishProductsBrands,
} from '../../store/actions/replenishProducts';
import ReplenishProducts from '../../components/blocks/ReplenishProducts';
import Spinner from '../../components/common/Spinner';

class ReplenishProductsPermissionsContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pageCount: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    const pageCount = Math.ceil(nextProps.count / nextProps.perPage);
    if(prevState.pageCount != pageCount) {
      return {
        pageCount,
      };
    }

    return null;
  }

  componentDidMount() {
    this.props.getReplenishBrands();
  }

  render() {
    return this.props.isLoading ? <Spinner /> : (
      <div>
        <ReplenishProducts
          {...this.props}
          pageCount={this.state.pageCount}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { 
    filters, 
    data, 
    count, 
    perPage, 
    currentFilter, 
    modalProduct, 
    search, 
    isLoading, 
    offset, 
    brands,
  } = state.replenishProducts;

  const checked = state.checked;
  return {
    filters,
    data,
    count,
    perPage,
    checked,
    brands,
    currentFilter,
    modalProduct,
    searchQuery: search,
    isLoading,
    offset,
  };
};
  
const mapDispatchToProps = dispatch => ({
  setSortOrder: order => dispatch(setReplenishProductsOrder(order)),
  setSortOrderField: field => dispatch(setReplenishProductsOrderField(field)),
  getReplenishBrands: () => dispatch(getReplenishProductsBrands()),
  productSearch: search => dispatch(setReplenishProductsSearch(search)),
  setPage: offset => dispatch(setReplenishProductsOffset(offset)),
  setFilter: filter => dispatch(setReplenishProductsCurrentFilter(filter)), 
  buyProduct: model => dispatch(buyProduct(model)),
  resetModalProduct: () => dispatch(resetModalProduct()),  
  setSupplierId: id => dispatch(setReplenishProductsSupplierId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReplenishProductsPermissionsContainer);

ReplenishProductsPermissionsContainer.defaultProps = {
  checked: [],
};

ReplenishProductsPermissionsContainer.propTypes = {
  filters: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,    
  count: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  setSortOrderField: PropTypes.func.isRequired,
  productSearch: PropTypes.func.isRequired,
  resetModalProduct: PropTypes.func.isRequired,
  checked: PropTypes.arrayOf(PropTypes.string), 
  setPage: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  getReplenishBrands: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
