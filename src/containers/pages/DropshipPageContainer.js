import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Dropship from '../../components/pages/Dropship/Dropship';
import PageLayout from '../../components/common/PageLayout';
import DropshipProductsPermissionsContainer from '../blocks/DropshipProductsPermissionsContainer';

class DropshipPageContainer extends PureComponent {
  render() {
    return (
      <Fragment>
        <Dropship {...this.props} />
        <PageLayout>
          <DropshipProductsPermissionsContainer />
        </PageLayout>
      </Fragment>
    );
  }
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DropshipPageContainer);