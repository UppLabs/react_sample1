import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import Toolbar from '../../common/Toolbar';
import ProductFilter from '../../filters/ProductFilter';
import Products from '../Products';
import IsMobile from '../../../containers/common/IsMobile';
import styles from './ProductsPermissions.scss';
import DropDownTools from '../../common/DropDownTools';
import ActionLinkTop from '../../common/ActionLinkTop';
import Radio from '../../common/Radio';
import RadioGroup from '../../common/RadioGroup';
import ThemeFilterRetailer from '../../../components/theme/ThemeFilterRetailer';
import Search from '../../common/Search';
import ConfirmModal from '../ConfirmModal';
import ProductCard from '../../common/ProductCard';
import Button from '../../common/Button';
import ThemeRetailer from '../../../components/theme/ThemeRetailer';
import WrapperColumnRetailers from '../../../components/grid-container/WrapperColumnRetailers';
import Wall from '../../common/Wall';
import { TAB_DROPSHIP, TAB_REPLENISHMENT } from '../../../constants/mainConstants';

class ProductsPermissions extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      all: '2',
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


  handleChange = (value) => {
    if (value === '1') {
      this.setState({ open: true });
    } else {
      this.setState({ all: value, hide: false });
    }
  };
  
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

  checkAllProduct() {
    this.setState({ all: '1', hide: true });
  }

  isChecked = (model) => {
    return this.props.checked.indexOf(model) > -1 ? true : false;
  }

  handlePageClick = (data) => {
    const offset = this.props.perPage * data.selected;
    this.props.setPage && this.props.setPage(offset);
  };

  isApprove = (variants) => {
    const tab = this.props.tab.toLowerCase();
    for(let variant of variants) {
      if(variant.permission) {
        if(tab === TAB_DROPSHIP && variant.permission.ecommerce_approved) {
          return true;
        }
        if(tab === TAB_REPLENISHMENT && variant.permission.replenish_approved) {
          return true;
        }
      }
    }
    return false;
  }

  products = () => {
    return ( 
      <Fragment>       
        {this.props.data && this.props.data.map(item =>(
          <ThemeRetailer key={item.model}>
            <ProductCard
              product={item}
              checkbox
              slider
              onCheck={this.onCheckProduct}
              checked={this.isChecked(item.model)}
              modal={this.isApprove(item.variants)}
              open={this.props.openModal}
            />
          </ThemeRetailer>
          ))}
      </Fragment> 
    );
  }
    
  radioGroup = () => (
    <RadioGroup
      name="products" selectedValue={this.state.all}
      onChange={this.handleChange}
    >
      <Radio
        id="1"
        value="1"
        label="All products"
      />
      <Radio
        id="2"
        value="2"
        label="Custom"
      />
    </RadioGroup>
    );

    actionLinks = () => (
      <Fragment>
        <Button
          text='Approve' color='green'
          onClick={this.props.approveChecked}
        />
        <Button
          text='Revoke' color='transparent'
          onClick={this.props.unapproveChecked}
          margin_left
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
    const { 
      filters, 
      data, 
      pageCount,
      productSearch,
      setFilter,
      currentFilter,
      searchQuery,
      perPage,
      offset,
      selectAll,
      selectAllOnPage,
      unselectAll,
      tab,
    } = this.props;

      return (
        <div className={styles.wrapperToolbar}>
          <ConfirmModal
            open={this.state.open} onClose={this.closeModal}
            isAllProducts={() => this.checkAllProduct()}
          />
          <Toolbar
            name={`${tab} permission`} grow
            width={660}
          >
            <IsMobile
              desctop={
                <Fragment>
                  <div className={styles.left}>
                    {this.radioGroup()}
                  </div>
                  <div className={styles.right}>
                    <ActionLinkTop title="Select this page" onClick={selectAllOnPage} />
                    <ActionLinkTop title="Select all" onClick={selectAll} />
                    <ActionLinkTop 
                      red title="Unselect all" 
                      onClick={unselectAll} 
                    />
                    <Wall />
                    {this.actionLinks()}
                  </div>
                </Fragment>
            }
              mobile={
                <Fragment>
                  <div className={styles.left}>
                    {this.radioGroup()}
                  </div>
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
                      retailer
                    />
                  </ThemeFilterRetailer>
                  <WrapperColumnRetailers 
                    pageCount={pageCount} 
                    handlePageClick={this.handlePageClick}
                    currentPage={offset/perPage}
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
                            retailer
                          />
                        </ThemeFilterRetailer>
                      </div>
                    </div>
                  </div>
                </div>
                <Products
                  modal={this.props.modal}
                  products={data} pageCount={pageCount}
                  handlePageClick={this.handlePageClick}
                  onCheckProduct={this.onCheckProduct}
                />
              </div>
          }
            width={1024}
          />
        </div>
    );
  }
}


export default ProductsPermissions;

ProductsPermissions.defaultProps = {
  modal: false,
  check: undefined,
  uncheck: undefined,
  checked: [],
};

ProductsPermissions.propTypes = {
  perPage: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
  approveChecked: PropTypes.func.isRequired,
  unapproveChecked: PropTypes.func.isRequired,
  modal: PropTypes.bool,
  productSearch: PropTypes.func.isRequired,
  check: PropTypes.func,
  uncheck: PropTypes.func,
  checked: PropTypes.array,
  setPage: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.object.isRequired,
  searchQuery: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  selectAll: PropTypes.func.isRequired,
  selectAllOnPage: PropTypes.func.isRequired,
  unselectAll: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};