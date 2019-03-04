import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ServicesMenu from '../../components/blocks/ServicesMenu';

class ServicesMenuContainer extends PureComponent {
  render() {
    const { retailerName } = this.props;
    return (
      <ServicesMenu
        {...this.props}
        retailerName={retailerName}
      />
    );
  }
}

const mapStateToProps = state => ({
  retailerName: state.role.retailerName,
});

// const mapDispatchToProps = dispatch => ({
//   getRoles: () => dispatch(getRoles()),
// });

export default connect(mapStateToProps, null)(ServicesMenuContainer);

ServicesMenuContainer.propTypes = {
  retailerName: PropTypes.string.isRequired,
};
