import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Roles from '../../components/blocks/Roles';
import { setRolesRole, getRoles } from '../../store/actions/roles';

class RoleContainer extends PureComponent {
  componentDidMount() {
    this.props.getRoles();
  }

  render() {
    return (<Roles {...this.props} />);
  }
}

const mapStateToProps = (state) => {
   return {
      roles: state.role.roles,
   };
 };
 
const mapDispatchToProps = dispatch => ({
  setRole: (id, role, name) => dispatch(setRolesRole(id, role, name)),
  getRoles: () => dispatch(getRoles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
   RoleContainer,
);

RoleContainer.defaultProps = {
   roles: undefined,
   brands: false,
   replenish: false,
   dropship: false,
   admin: false,
};

RoleContainer.propTypes = {
   setRole: PropTypes.func.isRequired,
   roles: PropTypes.shape({
      retailers: PropTypes.array,
      suppliers: PropTypes.array,
   }),
   getRoles: PropTypes.func.isRequired,
   brands: PropTypes.bool,
   replenish: PropTypes.bool,
   dropship: PropTypes.bool,
   admin: PropTypes.bool,
};
