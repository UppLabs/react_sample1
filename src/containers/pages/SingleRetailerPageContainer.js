import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRetailer } from '../../store/actions/retailer';
import Panel from '../../components/common/Panel';
import BackTop from '../../components/common/BackTop';
import PageLayout from '../../components/common/PageLayout';
import RetailerContainer from '../blocks/RetailerContainer';
import RetailerPermissionContainer from '../blocks/RetailerPermissionContainer';
import RetailerStatsContainer from '../blocks/RetailerStatsContainer';
import ProductsPermissionsContainer from '../blocks/ProductsPermissionsContainer';

class SingleRetailerPageContainer extends PureComponent {
  componentDidMount() {
    this.props.getRetailer();
  }

  render() {
    return (
      <Fragment>
        <Panel>
          <BackTop text={this.props.retailer.name} {...this.props} />
        </Panel>
        <PageLayout>
          <RetailerContainer />
          <RetailerPermissionContainer id={+this.props.match.params.id} />
          <ProductsPermissionsContainer id={+this.props.match.params.id} />
          <RetailerStatsContainer toolbar id={+this.props.match.params.id} />
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
    getRetailer: () => dispatch(getRetailer(ownProps.match.params.id)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SingleRetailerPageContainer);

SingleRetailerPageContainer.propTypes = {
  getRetailer: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  retailer: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
