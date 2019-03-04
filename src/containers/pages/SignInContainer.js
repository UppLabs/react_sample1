import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import StartPageLayout from '../../components/common/StartPageLayout';
import { signIn, authenticated } from '../../store/actions/auth';
import SignIn from '../../components/pages/SignIn';

class SignInContainer extends PureComponent {
  render() {
    return (
      <Fragment>
        <StartPageLayout wallHeight='60'>
          <SignIn {...this.props} />
        </StartPageLayout>   
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
	const { isError } = state.auth;

	return {
		isError,
	};
};

const mapDispatchToProps = dispatch => ({
  signIn: (values) => {
    dispatch(signIn(values));
  },
  authenticated: (bool) => {
    dispatch(authenticated);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
