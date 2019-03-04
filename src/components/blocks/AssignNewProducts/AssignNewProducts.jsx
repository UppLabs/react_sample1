import React, { Component, Fragment } from 'react';
import cn from 'classname';
import PropTypes from 'prop-types';
import ProductFilter from '../../filters/ProductFilter';
import ProductCard from '../../common/ProductCard';
import AssignTo from '../../filters/AssignTo';
import styles from './AssignNewProducts.scss';
import IsMobile from '../../../containers/common/IsMobile';
import ThemeFilter from '../../../components/theme/ThemeFilter';
import ThemeProduct from '../../../components/theme/ThemeProduct';
import GridContainerProduct from '../../../components/grid-container/GridContainerProduct';
import EmptyData from '../../common/EmptyData';
import Search from '../../common/Search';

class AssignNewProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drop_filter: false,
      drop_assign: false,
    };
  }
 
  onCheckProduct = (checked, value) => {
    if(checked) {
      this.props.check && this.props.check(value);
    } else {
      this.props.uncheck && this.props.uncheck(value);
    }
  }

  handleDropDown = (drop) => {
    if (drop === 'drop_filter') {
      this.setState({
        drop_assign: false,
        drop_filter: !this.state.drop_filter,
      });
    }
    if (drop === 'assign_drop') {
      this.setState({
        drop_filter: false,
        drop_assign: !this.state.drop_assign,
      });
    }
  };

  handlePageClick = (data) => {
    const offset = this.props.perPage * data.selected;
    this.props.setPage && this.props.setPage(offset);
  };

  isChecked = (model) => {
    return this.props.checked.indexOf(model) > -1 ? true : false;
  }

  products = () => {
    if (this.props.data.length === 0) return <EmptyData />;
    return ( 
      <Fragment>            
        {this.props.data.map(item =>(
          <ThemeProduct key={item.model}>
            <ProductCard
              product={item}
              checkbox
              slider={this.props.home ? true : false}
              onCheck={this.onCheckProduct}
              checked={this.isChecked(item.model)}
              assignedTo={this.props.assignedTo}
            />
          </ThemeProduct>
          ))}
      </Fragment> 
    );
  }

  assignTo = () => (<AssignTo
    disabled={!(this.props.checked.length > 0)}
    retailers={this.props.retailers}
    search={this.props.retailerSearch}
    home={this.props.home}
    products={this.props.products}
    checked={this.props.checkedRetailers}
    check={this.props.checkRetailer}
    uncheck={this.props.uncheckRetailer}
    submit={this.props.submit}
    productsCount={this.props.checked.length}
    retailersCount={this.props.checkedRetailers.length}
    selectAll={this.props.selectAllRetailers}
    clearAll={this.props.clearAllRetailers}
  />);

  render() {
    const { 
      filters, setFilter, productSearch, 
      retailerSearch, pageCount, currentFilter,
      searchQuery,
      offset,
      perPage,
    } = this.props;

    return (
      <Fragment>
        <IsMobile
          desctop={
            <div className={styles.desctop}>
              <div className="row vertical-indent">
                <ThemeFilter>
                  <Search searchQuery={searchQuery} search={productSearch} />
                  <ProductFilter
                    filters={filters} setFilter={setFilter}
                    search={retailerSearch}
                    currentFilter={currentFilter}
                  />
                </ThemeFilter>
                <GridContainerProduct 
                  pageCount={pageCount} 
                  handlePageClick={this.handlePageClick} 
                  currentPage={offset/perPage}
                >
                  {this.products()}
                </GridContainerProduct>
                {this.assignTo()}
              </div>
            </div>
          }
          mobile={
            <div className={styles.mobile_tab + ' mobile_tab'}>
              <div className="row vertical-indent">
                <div className="column_filter">
                  <div className={styles.drop_down}>
                    <div
                      onClick={() => this.handleDropDown('drop_filter')}
                      className={styles.filter_drop}
                    >
                      <img alt="" src={require('../../../images/filter.png')} />{' '}
                      Filter
                    </div>
                    <div
                      onClick={() => this.handleDropDown('assign_drop')}
                      className={styles.assign_drop}
                    >
                      <img alt="" src={require('../../../images/sort.png')} />{' '}
                      Assign to
                    </div>
                  </div>
                  <div className={styles.wrapper_tools}>
                    <div
                      className={
                        this.state.drop_filter === false
                          ? cn(styles['settings'])
                          : cn(styles['settings'], styles['drop'])
                      }
                    >
                      <ThemeFilter>
                        <ProductFilter 
                          filters={filters} 
                          setFilter={setFilter} 
                          currentFilter={currentFilter}
                        />
                      </ThemeFilter>
                    </div>
                    <div
                      className={
                        this.state.drop_assign === false
                          ? cn(styles['settings'])
                          : cn(styles['settings'], styles['drop'])
                      }
                    >
                      {this.assignTo()}
                    </div>
                  </div>
                </div>
                {
                  <GridContainerProduct 
                    pageCount={pageCount} 
                    handlePageClick={this.handlePageClick}
                    currentPage={offset/perPage}
                  >
                    {this.products()}
                  </GridContainerProduct>
                }
              </div>
            </div>
          }
          width={1024}
        />
      </Fragment>
    );
  }
}

export default AssignNewProducts;

AssignNewProducts.defaultProps = {
  setPage: null,
  check: undefined,
  uncheck: undefined,
  checked: [],
  home: false,
  products: false,
  checkedRetailers: [],
  checkRetailer: undefined,
  uncheckRetailer: undefined,
  assignedTo: true,
};

AssignNewProducts.propTypes = {
  pageCount: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
  setPage: PropTypes.func,
  retailers: PropTypes.array.isRequired,
  check: PropTypes.func,
  uncheck: PropTypes.func,
  checkRetailer: PropTypes.func,
  uncheckRetailer: PropTypes.func,
  checked: PropTypes.array,
  productSearch: PropTypes.func.isRequired,
  retailerSearch: PropTypes.func.isRequired,
  home: PropTypes.bool,
  products: PropTypes.bool,
  checkedRetailers: PropTypes.array,
  submit: PropTypes.func.isRequired,
  currentFilter: PropTypes.object.isRequired,
  searchQuery: PropTypes.string.isRequired,
  assignedTo: PropTypes.bool,
  selectAllRetailers: PropTypes.func.isRequired,
  clearAllRetailers: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
};
