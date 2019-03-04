import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import Toolbar from '../../common/Toolbar';
import ProductFilter from '../../filters/ProductFilter';
import IsMobile from '../../../containers/common/IsMobile';
import styles from './DropshipProducts.scss';
import DropDownTools from '../../common/DropDownTools';
import ActionLinkTop from '../../common/ActionLinkTop';
import ThemeFilterRetailer from '../../../components/theme/ThemeFilterRetailer';
import Search from '../../common/Search';
import ConfirmModal from '../ConfirmModal';
import ThemeRetailer from '../../../components/theme/ThemeRetailer';
import WrapperColumnRetailers from '../../../components/grid-container/WrapperColumnRetailers';
import DropshipProductCard from '../../common/DropshipProductCard';
import DropDownFilter from '../../filters/DropDownFilter';
import Button from '../../common/Button';
import Wall from '../../common/Wall';

class DropshipProducts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      drop_filter: false,
      hide: false,
      open: false,
    };
  }

   onCheckProduct = (checked, value) => {
    if(checked) {
      this.props.check && this.props.check(value);
    } else {
      this.props.uncheck && this.props.uncheck(value);
    }
  }

  handleDropDown = () => {
    this.setState({
      drop_filter: !this.state.drop_filter,
    });
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

  isChecked = (model) => {
    return this.props.checked.indexOf(model) > -1 ? true : false;
  }

  handlePageClick = (data) => {
    const offset = this.props.perPage * data.selected;
    this.props.setPage && this.props.setPage(offset);
  };

  selectAllOnPage = () => {
    this.props.selectAllOnPage(this.props.data.map((item) => {
      return item.model;
    }));
  }

  products = () => {
    return ( 
      <Fragment>       
        {this.props.data && this.props.data.map(item => (
          <ThemeRetailer key={item.model}>
            <DropshipProductCard
              product={item}
              checkbox
              onCheck={this.onCheckProduct}
              checked={this.isChecked(item.model)}
            />
          </ThemeRetailer>
          ))}
      </Fragment> 
    );
  }

  actionLinks = () => (
    <Fragment>
      <Wall />
      <DropDownFilter
        type="images"
        values={this.props.brands}
        onChange={value => this.props.setSupplierId(value)}
      />
      <Wall />
      <ActionLinkTop title="Select this page" onClick={this.selectAllOnPage} />
      <ActionLinkTop title="Select all" onClick={this.props.selectAll} />
      <ActionLinkTop title="Unselect all" onClick={this.props.unselectAll} />
      <Wall />
      <Button text="Approve" onClick={this.props.approveChecked} />
      <Button
        margin_left
        color='transparent' text='Revoke'
        onClick={this.props.unapproveChecked}
      />
    </Fragment>
  );

  dropDownTools = () => (
    <DropDownTools data={[{
        type: 'Approve',
        handler: this.state.approve,
      },{
        type: 'Unapprove',
        handler: this.state.unapprove,
      }]}
    />
  );

  render() {
    const { hide } = this.state;
    const { filters, 
      pageCount,
      productSearch,
      setFilter,
      currentFilter,
      searchQuery,
      offset,
      perPage,
    } = this.props;

      return (
        <div className={styles.wrapperToolbar}>
          <ConfirmModal
            open={this.state.open} onClose={this.closeModal}
            isAllProducts={() => this.checkAllProduct()}
          />
          <Toolbar
            name='Sync products to your website' grow
            width={660}
          >
            <IsMobile
              desctop={
                <Fragment>
                  <div className={styles.right}>
                    {this.actionLinks()}
                  </div>
                </Fragment>
            }
              mobile={
                <Fragment>
                  <div className={styles.right}>
                    {this.dropDownTools()}
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
                      staticFilter
                    />
                  </ThemeFilterRetailer>
                  <WrapperColumnRetailers
                    currentPage={offset/perPage}
                    pageCount={pageCount} 
                    handlePageClick={this.handlePageClick}
                  >
                    {this.products()}
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
                            staticFilter
                          />
                        </ThemeFilterRetailer>
                      </div>
                    </div>
                  </div>
                </div>
                {this.products()}
              </div>
          }
            width={1024}
          />
        </div>
    );
  }
}


export default DropshipProducts;

DropshipProducts.defaultProps = {
  check: undefined,
  uncheck: undefined,
  checked: [],
};

DropshipProducts.propTypes = {
  perPage: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
  approveChecked: PropTypes.func.isRequired,
  unapproveChecked: PropTypes.func.isRequired,
  productSearch: PropTypes.func.isRequired,
  check: PropTypes.func,
  uncheck: PropTypes.func,
  checked: PropTypes.array,
  setPage: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.object.isRequired,
  searchQuery: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  brands: PropTypes.array.isRequired,
  setSupplierId: PropTypes.func.isRequired,
  selectAllOnPage: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  unselectAll: PropTypes.func.isRequired,
};