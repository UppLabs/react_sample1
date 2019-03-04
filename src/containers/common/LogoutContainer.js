import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from '../../components/common/Logout';

class LogoutContainer extends PureComponent {
	render() {
		return <Logout {...this.props} />;
	}
}

const mapStateToProps = (state) => {
  const { roles } = state.role;

  return {
    roles,
  };
};

export default connect(mapStateToProps, null)(LogoutContainer);

LogoutContainer.defaultProps = {
  roles: undefined,
};

LogoutContainer.propTypes = {
  roles: PropTypes.object,
};