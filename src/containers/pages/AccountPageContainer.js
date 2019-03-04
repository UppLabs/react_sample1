import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PageLayout from '../../components/common/PageLayout';
import Hero from '../../components/common/Hero';
import StoresTableContainer from '../blocks/StoresTableContainer';
import IntegrationContainer from '../blocks/IntegrationContainer';
import AccountInfoContainer from '../blocks/AccountInfoContainer';
import ServicesPageLayout from '../../components/common/ServicesPageLayout';

class AccountPageContainer extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
   //  this.props.getStats(1);
  }

  render() {
    const divStyle = {
          backgroundImage: 'url('+ require('../../images/admin-hero.jpg')+')',
        };
    return (
      <Fragment>
        <ServicesPageLayout>
          <Hero panel divStyle={divStyle} >
            <h1>ACCOUNT</h1>
          </Hero>
          {/* <Panel fix>
            <ActionLinkTop title="EDIT ACCOUNT" onClick={this.openModal} />
          </Panel> */}
          <PageLayout>
            <AccountInfoContainer />
            <IntegrationContainer />
            <StoresTableContainer />
          </PageLayout>
        </ServicesPageLayout>   
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state.stats;
  return {
    data,
  };
};

const mapDispatchToProps = dispatch => ({
//   getStats: retailerId => dispatch(getStats(retailerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageContainer);

AccountPageContainer.propTypes = {
//   data: PropTypes.array.isRequired,
//   getStats: PropTypes.func.isRequired,
};
