import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toolbar from '../../components/common/Toolbar';
import IsMobile from './../../containers/common/IsMobile';
import ActionLinkTop from '../../components/common/ActionLinkTop/ActionLinkTop';
import CountTop from '../../components/common/CountTop/CountTop';
import DropDownFilter from '../../components/filters/DropDownFilter';
import SortOrderFilter from '../../components/filters/SortOrderFilter';
import { productsFilter } from '../../constants/filters';
import { 
    setAssignNewProductsOrder, 
    getAssignNewProducts, 
    setAssignNewProductsOffset,
    getAssignNewProductsFilters, 
    setAssignNewProductsCurrentFilter,
    getAssignNewProductsRetailers,
    setAssignNewProductsSearch,
    setAssignNewProductsOrderField,
    assignNewProductsCheck,
    assignNewProductsUncheck,
    assignNewProductsCheckAll,
    assignNewProductsUncheckAll,
    retailerSearch,
    assignNewProductsCheckRetailer,
    assignNewProductsUncheckRetailer,
    assignNewProductsSubmit,
    assignNewProductsCheckAllRetailers,
    assignNewProductsUncheckAllRetailers,
    assignNewProductsCheckAllOnPage,
} from '../../store/actions/assignNewProducts';
import Wall from '../../components/common/Wall';
import AssignNewProducts from '../../components/blocks/AssignNewProducts';
import Spinner from '../../components/common/Spinner';

class AssignNewProductsContainer extends Component {

  componentDidMount() {
    this.props.getAssignNewProductsFilters();
    this.props.getAssignNewProducts();
    this.props.getAssignNewProductsRetailers();
  }

  selectAllOnPage = () => {
    this.props.selectAllOnPage(this.props.data.map((item) => {
      return item.model;
    }));
  }
  

  render() {
    const { 
        setAssignNewProductsOrderField,
        setAssignNewProductsOrder,
        selectedCount,
        unselectAll,
        count,
        isLoading,
        offset,
        selectAll,
    } = this.props; 
    
    return isLoading ? <Spinner /> : (
      <div>
        <Toolbar
          name="Assign new products"
          panel
          center
        >
          <div className='hide_dropdown_filter'>
            <IsMobile
              desctop={
                <Fragment>
                  <CountTop
                    blackPoint title="All"
                    count={count}
                  />
                  <CountTop
                    blackPoint title="Selected"
                    count={selectedCount}
                  />
                  <Wall />
                  <ActionLinkTop title="Select this page" onClick={this.selectAllOnPage} />
                  <ActionLinkTop title="Select all" onClick={selectAll} />
                  <ActionLinkTop title="Unselect all" onClick={unselectAll} />
                  <Wall />
                  <DropDownFilter
                    staticPoint values={productsFilter}
                    onChange={setAssignNewProductsOrderField}
                  />
                </Fragment>
                }
              mobile={
                <Fragment>
                  <div className='blockAssign'>
                    <div>
                      <CountTop
                        blackPoint title="All"
                        count={count}
                      />
                      <CountTop
                        blackPoint title="Selected"
                        count={selectedCount}
                      />
                      <Wall />
                      <ActionLinkTop title="Select all" onClick={this.selectAllOnPage} />
                      <ActionLinkTop title="Unselect all" onClick={unselectAll} />
                    </div>
                    <div>
                      <Wall />
                      <DropDownFilter values={productsFilter} onChange={setAssignNewProductsOrderField}  />
                      <Wall />
                      <SortOrderFilter onChange={setAssignNewProductsOrder} />
                    </div>
                  </div>
                </Fragment>
                }
              // width={1650}
            />
          </div>
        </Toolbar>
        <AssignNewProducts
          {...this.props}
          home
          assignedTo={false}
          offset={offset}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { 
    data, count, perPage, 
    filters, retailers, 
    checked, checkedRetailers,
    currentFilter,
    search, 
    isLoading,
    offset,
  } = state.assignNewProducts;

  return {
    data,
    count,
    perPage,
    filters,
    retailers,
    selectedCount: checked.length,
    checked,
    pageCount: Math.ceil(count / perPage),
    checkedRetailers,
    currentFilter,
    searchQuery: search,
    isLoading,
    offset,
  };
};

const mapDispatchToProps = dispatch => ({
  setAssignNewProductsOrderField: field => dispatch(setAssignNewProductsOrderField(field)),
  setAssignNewProductsOrder: order => dispatch(setAssignNewProductsOrder(order)),
  getAssignNewProducts: () => dispatch(getAssignNewProducts()),
  setPage: offset => dispatch(setAssignNewProductsOffset(offset)),
  getAssignNewProductsFilters: () => dispatch(getAssignNewProductsFilters()),  
  setFilter: filter => dispatch(setAssignNewProductsCurrentFilter(filter)),  
  getAssignNewProductsRetailers: () => dispatch(getAssignNewProductsRetailers()),
  productSearch: search => dispatch(setAssignNewProductsSearch(search)),
  selectAll: () => dispatch(assignNewProductsCheckAll()),
  selectAllOnPage: ids => dispatch(assignNewProductsCheckAllOnPage(ids)),
  unselectAll: () => dispatch(assignNewProductsUncheckAll),
  check: id => dispatch(assignNewProductsCheck(id)),
  uncheck: id => dispatch(assignNewProductsUncheck(id)),
  retailerSearch: search => dispatch(retailerSearch(search)),
  checkRetailer: id => dispatch(assignNewProductsCheckRetailer(id)),
  uncheckRetailer: id => dispatch(assignNewProductsUncheckRetailer(id)),
  submit: value => dispatch(assignNewProductsSubmit(value)),
  selectAllRetailers: () => dispatch(assignNewProductsCheckAllRetailers()),
  clearAllRetailers: () => dispatch(assignNewProductsUncheckAllRetailers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  AssignNewProductsContainer,
);

AssignNewProductsContainer.propTypes = {
  count: PropTypes.number.isRequired,
  setAssignNewProductsOrderField: PropTypes.func.isRequired,
  setAssignNewProductsOrder: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAssignNewProductsFilters: PropTypes.func.isRequired, 
  getAssignNewProducts: PropTypes.func.isRequired,
  getAssignNewProductsRetailers: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
  selectAll: PropTypes.func.isRequired,
  unselectAll: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  offset: PropTypes.number.isRequired,
  selectAllOnPage: PropTypes.func.isRequired,
};
