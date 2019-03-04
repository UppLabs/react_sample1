import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Brands from '../../components/blocks/Brands';
import Line from '../../components/blocks/Line';
import Slider from '../../components/blocks/Slider';
import PageLayout from '../../components/common/PageLayout';
import { 
  getReplenishBrands,
  loadingBrands,
  setFilterProductsBrans,
 } from '../../store/actions/replenishBrands';

class ReplenishHomeContainer extends PureComponent {
  componentDidMount() {
    this.props.getReplenishBrands();
  }

  render() {
    const { brands, loadingBrands, setFilterProductsBrans } = this.props;

    return (
      <Fragment>
        <Slider />
        {/* <SearchProduct /> */}
        <Line />
        <PageLayout>
          <Brands
            brands={brands} loadingBrands={loadingBrands}
            filterName={setFilterProductsBrans}
          />
        </PageLayout>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
 return {
  brands: state.replenishBrands.brands,
 };
};

const mapDispatchToProps = dispatch => ({
  getReplenishBrands: () => dispatch(getReplenishBrands()),
  loadingBrands: () => dispatch(loadingBrands()),
  setFilterProductsBrans: (name, img) => dispatch(setFilterProductsBrans(name, img)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ReplenishHomeContainer,
);

ReplenishHomeContainer.defaultProps = {
  brands: [],
};

ReplenishHomeContainer.propTypes = {
  brands: PropTypes.array,
  loadingBrands: PropTypes.func.isRequired,
  getReplenishBrands: PropTypes.func.isRequired,
  setFilterProductsBrans: PropTypes.func.isRequired,
};
