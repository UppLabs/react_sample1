import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import Toolbar from '../../common/Toolbar';
import ProductFilter from '../../filters/ProductFilter';
import IsMobile from '../../../containers/common/IsMobile';
import styles from './ReplenishProducts.scss';
import DropDownFilter from '../../filters/DropDownFilter';
import { productsFilter } from '../../../constants/filters';
import Wall from '../../common/Wall';
import ThemeFilterRetailer from '../../../components/theme/ThemeFilterRetailer';
import Search from '../../common/Search';
import ThemeRetailer from '../../../components/theme/ThemeRetailer';
import WrapperColumnRetailers from '../../../components/grid-container/WrapperColumnRetailers';
import SortOrderFilter from '../../filters/SortOrderFilter';
import ReplenishProductCard from '../../common/ReplenishProductCard';

class ReplenishProducts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      drop_filter: false,
      hide: false,
    };
  }
 
  handleDropDown = () => {
    this.setState({
      drop_filter: !this.state.drop_filter,
    });
  };

  handlePageClick = (data) => {
    const offset = this.props.perPage * data.selected;
    this.props.setPage && this.props.setPage(offset);
  };

  render() {
    const { hide } = this.state;
    const { 
      filters, pageCount,
      setSortOrderField,
      productSearch,
      setFilter,
      setSortOrder,
      brands,
      currentFilter,
      buyProduct,
      modalProduct,
      resetModalProduct,
      searchQuery,
      offset,
      perPage,
      setSupplierId,
    } = this.props;
      
      return (
        <div className={styles.wrapperToolbar}>
          <Toolbar
            grow
            width={660}
            name="Place an order"
          >
            <IsMobile
              desctop={
                <Fragment>
                  <div className={styles.center}>
                    <DropDownFilter
                      type="images"
                      values={brands}
                      onChange={value => setSupplierId(value)}
                    />
                  </div>
                  <div className={styles.right}>
                    <Fragment>
                      <DropDownFilter 
                        staticPoint values={productsFilter} 
                        onChange={setSortOrderField} 
                      />
                      <Wall />
                      <SortOrderFilter onChange={setSortOrder} />
                    </Fragment>
                  </div>
                </Fragment>
            }
              mobile={
                <Fragment>
                  <div className={styles.left}>
                    <DropDownFilter
                      type="images"
                      values={brands}
                      onChange={value => setSupplierId(value)}
                    />
                  </div>
                </Fragment>
            }
              width={800}
            />
          </Toolbar>
          <IsMobile
            desctop={
              <div className={hide === false ? styles.isHide : cn(styles.isHide, styles.hide)}>
                <div className='row vertical-indent'>
                  <ThemeFilterRetailer>
                    <Search searchQuery={searchQuery} search={productSearch} />
                    <ProductFilter 
                      filters={filters} 
                      setFilter={setFilter} 
                      currentFilter={currentFilter}
                    />
                  </ThemeFilterRetailer>
                  <WrapperColumnRetailers 
                    currentPage={offset/perPage}
                    pageCount={pageCount} 
                    handlePageClick={this.handlePageClick}
                  >
                    {
                      this.props.data && this.props.data.map(item =>(
                        <ThemeRetailer key={item.model}>
                          <ReplenishProductCard
                            product={item}
                            modalProduct={modalProduct}
                            modal
                            buyProduct={buyProduct}
                            resetModalProduct={resetModalProduct}
                          />
                        </ThemeRetailer>
                     ))
                    }
                  </WrapperColumnRetailers>
                </div>
              </div>
          }
            mobile={
              <div className='row vertical-indent'>
                <div className='column_products_retailers'>
                  <div className={styles.drop_down}>
                    <div
                      onClick={this.handleDropDown}
                      className={styles.filter_drop}
                    >
                      <img alt="" src={require('../../../images/filter.png')} />{' '}
                      Filter
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
                      <div className={styles.isHide}>
                        <ThemeFilterRetailer>
                          <ProductFilter 
                            filters={filters} 
                            setFilter={setFilter} 
                            currentFilter={currentFilter}
                          />
                        </ThemeFilterRetailer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          }
            width={1024}
          />
        </div>
    );
  }
}


export default ReplenishProducts;

ReplenishProducts.propTypes = {
  perPage: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  setSortOrderField: PropTypes.func.isRequired,
  productSearch: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  brands: PropTypes.array.isRequired,
  currentFilter: PropTypes.object.isRequired,
  buyProduct: PropTypes.func.isRequired,
  modalProduct: PropTypes.object.isRequired,
  resetModalProduct: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  setSupplierId: PropTypes.func.isRequired,
};