import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRoles } from '../../store/actions/roles';
import MenuDropship from '../../components/blocks/MenuDropship/MenuDropship';

class MenuDropshipContainer extends PureComponent {
  componentDidMount(){
    this.props.getRoles();
  }
  
  render() {
    const { retailerName } = this.props;
    return (
      <MenuDropship
        {...this.props}
        retailerName={retailerName}
      />
    );
  }
}

const mapStateToProps = state => ({
  retailerName: state.role.retailerName,
});

const mapDispatchToProps = dispatch => ({
  getRoles: () => dispatch(getRoles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuDropshipContainer);

MenuDropshipContainer.propTypes = {
  getRoles: PropTypes.func.isRequired,
  retailerName: PropTypes.string.isRequired,
};
