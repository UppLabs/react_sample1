import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Panel from '../../components/common/Panel';
import CountTop from '../../components/common/CountTop';
import ActionLinkTop from '../../components/common/ActionLinkTop';
import DropDownFilter from '../../components/filters/DropDownFilter';
import { productsFilter } from '../../constants/filters';
import SortOrderFilter from '../../components/filters/SortOrderFilter';
import Wall from '../../components/common/Wall';
import IsMobile from './../../containers/common/IsMobile';
import DropDown from '../../components/common/DropDown';
import DropDownTools from '../../components/common/DropDownTools';
import PageLayout from '../../components/common/PageLayout';
import ProductsContainer from '../blocks/ProductsContainer';
import { 
  productsCheckAll, 
  productsUncheckAll, 
  setProductsOrder, 
  setProductsOrderField,
  exportProducts,
  productsCheckAllOnPage,
} from '../../store/actions/products';
import DownloadButton from '../../components/common/DownloadButton';

class ProductsPageContainer extends Component {

  selectAllOnPage = () => {
    this.props.selectAllOnPage(this.props.products.map((item) => {
      return item.model;
    }));
  }

  render() {
    const { 
      productsCount, selectedCount, 
      unselectAll, setProductsOrderField, 
      setProductsOrder, exportProducts,
      location, selectAll,
    } = this.props;
    
    return (
      <Fragment>
        <Panel
          width={700} identifier='product'
          mobile='product_mobile'
        >
          <IsMobile
            desctop={
              <Fragment>
                <Wall />
                <CountTop
                  title="All" blackPoint
                  count={productsCount}
                />
                <CountTop
                  title="Selected" 
                  blackPoint 
                  count={selectedCount} 
                />
                <Wall />
                <ActionLinkTop title="Select this page" onClick={this.selectAllOnPage} />
                <ActionLinkTop title="Select all" onClick={selectAll} />
                <ActionLinkTop title="Unselect all" onClick={unselectAll} />
                <Wall />
                <DropDownFilter
                  values={productsFilter}
                  onChange={setProductsOrderField}
                  staticPoint
                />
                <Wall />
                <SortOrderFilter onChange={setProductsOrder} />
                <Wall />
                <DownloadButton size={25} onClick={exportProducts} />
                <Wall />
              </Fragment>
            }
            mobile={
              <IsMobile
                desctop={
                  <Fragment>
                    <Wall />
                    <DropDown
                      data={[{
                        type: 'All',
                        count: productsCount,
                      },{
                        type: 'Selected',
                        count: selectedCount,
                      }]}
                      onChange={() => alert('change')}
                    />
                    <Wall />
                    <DropDownTools 
                      data={[{
                          type: 'Select all',
                          handler: this.selectAllOnPage,
                        },{
                          type: 'Unselect all',
                          handler: unselectAll,
                        }]}
                      onChange={() => alert('change')}
                    />
                    <Wall />
                    <DropDownFilter values={productsFilter} onChange={setProductsOrderField} />
                    <Wall />
                    <SortOrderFilter onChange={setProductsOrder} />
                    <Wall />
                  </Fragment>
            }
                mobile={
                  <Fragment>
                    <DropDown
                      data={[{
                        type: 'All',
                        count: productsCount,
                      },{
                        type: 'Selected',
                        count: selectedCount,
                      }]}
                      onChange={() => alert('change')}
                    />
                    <Wall />
                    <SortOrderFilter onChange={() => alert('change order')} />
                  </Fragment>
            }
                width={650}
              />
            }
            width={850}
          />
        </Panel>
        <PageLayout>
          <div className='top'>
            <ProductsContainer pathname={location.pathname} />
          </div>
        </PageLayout>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => { 
  const { data, checked, count } = state.products;

  return {
    user: state.auth.user,
    role: state.auth.currentRole,
    productsCount: +count,
    selectedCount: checked.length,
    products: data,
  };
};

const mapDispatchToProps = dispatch => ({
  selectAllOnPage: ids => dispatch(productsCheckAllOnPage(ids)),
  selectAll: () => dispatch(productsCheckAll()),
  unselectAll: () => dispatch(productsUncheckAll),
  setProductsOrder: order => dispatch(setProductsOrder(order)),
  setProductsOrderField: field => dispatch(setProductsOrderField(field)),
  exportProducts: () => dispatch(exportProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPageContainer);

ProductsPageContainer.propTypes = {
  exportProducts: PropTypes.func.isRequired,
  productsCount: PropTypes.number.isRequired,
  selectedCount: PropTypes.number.isRequired,
  selectAll: PropTypes.func.isRequired,
  unselectAll: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  setProductsOrderField: PropTypes.func.isRequired,
  setProductsOrder: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  selectAllOnPage: PropTypes.func.isRequired,
};
