import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import ReplenishPageLayout from '../../components/common/ReplenishPageLayout';
import Hero from '../../components/common/Hero/Hero';
import ReplenishProductsPermissionsContainer from '../blocks/ReplenishProductsPermissionsContainer';

class ReplenishProductsPageContainer extends PureComponent {   
   divStyle = {
      backgroundImage: 'url('+ require('../../images/replenish-hero.jpg')+')',
   };
   render() {
      return (
        <Fragment>
          <ReplenishPageLayout 
            top={
              <Hero divStyle={this.divStyle} classHero="hero_replenish" />
            }
          >
            <ReplenishProductsPermissionsContainer />
          </ReplenishPageLayout>
        </Fragment>
      );
   }
}

const mapStateToProps = (state) => {
   return {
   //   brands: state.replenishBrands.brands,
   };
};

const mapDispatchToProps = dispatch => ({
//   getReplenishBrands: () => dispatch(getReplenishBrands()),
//   loadingBrands: () => dispatch(loadingBrands()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
   ReplenishProductsPageContainer,
);

ReplenishProductsPageContainer.propTypes = {
//   brands: PropTypes.array,
//   loadingBrands: PropTypes.func.isRequired,
//   getReplenishBrands: PropTypes.func.isRequired,
};
