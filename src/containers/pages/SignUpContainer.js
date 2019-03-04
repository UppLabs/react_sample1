import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import StartPageLayout from '../../components/common/StartPageLayout';
import SignUp from '../../components/pages/SignUp';
import { createNewAccount } from '../../store/actions/signUp';

class SignUpContainer extends PureComponent {
  render() {
    return (
      <Fragment>
        <StartPageLayout wallHeight='15'>
          <SignUp {...this.props} />
        </StartPageLayout>   
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { error } = state.signup;

  return {
    error,
  };
};

const mapDispatchToProps = dispatch => ({
	create: data => dispatch(createNewAccount(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
