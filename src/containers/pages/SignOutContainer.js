import { connect } from 'react-redux';
import { signOut } from '../../store/actions/auth';
import SignOut from '../../components/pages/SignOut';

const mapDispatchToProps = dispatch => ({
  signOut: (values) => {
    dispatch(signOut());
  },
});

const SignOutContainer = connect(null, mapDispatchToProps)(SignOut);

export default SignOutContainer;
