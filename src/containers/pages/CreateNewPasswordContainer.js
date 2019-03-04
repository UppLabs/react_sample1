import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import StartPageLayout from '../../components/common/StartPageLayout';
import CreateNewPassword from '../../components/pages/CreateNewPassword';

class CreateNewPasswordContainer extends PureComponent {
  render() {
    return (
      <Fragment>
        <StartPageLayout wallHeight='30'>
          <CreateNewPassword {...this.props} />
        </StartPageLayout>   
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPasswordContainer);
