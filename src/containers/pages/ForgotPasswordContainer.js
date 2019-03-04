import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import StartPageLayout from '../../components/common/StartPageLayout';
import Forgot from '../../components/pages/Forgot';
import { alertSuccess } from '../../store/actions/alert';

class ForgotPasswordContainer extends PureComponent {
  render() {
    return (
      <Fragment>
        <StartPageLayout wallHeight='30'>
          <Forgot {...this.props} />
        </StartPageLayout>   
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
	alertSuccess: message => dispatch(alertSuccess(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
