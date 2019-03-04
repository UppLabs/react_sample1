import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Panel from '../../components/common/Panel';
import BackTop from '../../components/common/BackTop';
import PageLayout from '../../components/common/PageLayout';
import ActivationHeader from '../../components/blocks/ActivationHeader';
import ActivationPaymentContainer from '../blocks/ActivationPaymentContainer';
import ActivationServicesContainer from '../blocks/ActivationServicesContainer';

class ActivationPageContainer extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <Fragment>
        <Panel>
          <BackTop text={this.props.retailer.name} {...this.props} />
        </Panel>
        <PageLayout>
          <ActivationHeader />
          <ActivationPaymentContainer />
          <ActivationServicesContainer />
        </PageLayout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  retailer: state.retailer.current,
});

const mapDispatchToProps = (dispatch, ownProps) => (
  {
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ActivationPageContainer);

ActivationPageContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  retailer: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
