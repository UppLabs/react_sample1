import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Panel from '../../components/common/Panel';
import BackTop from '../../components/common/BackTop';
import PageLayout from '../../components/common/PageLayout';
import DropshipProductCardVariants from '../../components/blocks/DropshipProductCardVariants';
import DropshipProductCardInfo from '../../components/blocks/DropshipProductCardInfo';
import { getDropshipProductsProduct, putDropshipProductsProduct } from '../../store/actions/dropshipProducts';
import Spinner from '../../components/common/Spinner';

class DropshipProductCardPageContainer extends PureComponent {
  componentDidMount() {
    this.props.getProduct();
  }

  render() {
    const { product, isLoading, setProduct } = this.props;
    return isLoading ? <Spinner /> : (
      <Fragment>
        <Panel>
          <BackTop text={this.props.retailer.name} {...this.props} />
        </Panel>
        <PageLayout>
          <DropshipProductCardInfo product={product} setProduct={setProduct} />
          <DropshipProductCardVariants variants={product.variants} />
        </PageLayout>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { product, productIsLoading } = state.dropshipProducts;
  const { retailer } = state.retailer.current;

  return {
    product,
    retailer,
    isLoading: productIsLoading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getProduct: () => dispatch(getDropshipProductsProduct(ownProps.match.params.model)),
  setProduct: data => dispatch(putDropshipProductsProduct(data, ownProps.match.params.model)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropshipProductCardPageContainer);

DropshipProductCardPageContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      model: PropTypes.string.isRequired,
    }),
  }).isRequired,
  product: PropTypes.shape({
    variants: PropTypes.array,
  }).isRequired,
  retailer: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  getProduct: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setProduct: PropTypes.func.isRequired,
};
