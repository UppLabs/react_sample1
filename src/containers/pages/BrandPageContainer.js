import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageLayout from '../../components/common/PageLayout';
import Hero from '../../components/common/Hero';
import Header from '../../components/common/Header';
import MyBrandsContainer from '../blocks/MyBrandsContainer';
import ServicesPageLayout from '../../components/common/ServicesPageLayout';

class BrandPageContainer extends Component {

  render() {
    const divStyle = {
      backgroundImage: 'url('+ require('../../images/admin-hero.jpg')+')',
    };

    return (
      <Fragment>
        <ServicesPageLayout>
          <Hero panel divStyle={divStyle} >
            <h1>BRANDS</h1>
          </Hero>
          <PageLayout>
            <Header text="BRANDS" />
            <MyBrandsContainer />
          </PageLayout>  
        </ServicesPageLayout>  
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
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandPageContainer);

BrandPageContainer.propTypes = {
};
