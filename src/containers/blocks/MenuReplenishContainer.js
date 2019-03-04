import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MenuReplenish from '../../components/blocks/MenuReplenish';

class MenuReplenishContainer extends PureComponent {
  render() {
    const { retailerName } = this.props;
    return (
      <MenuReplenish
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

export default connect(mapStateToProps, null)(MenuReplenishContainer);

MenuReplenishContainer.propTypes = {
  retailerName: PropTypes.string.isRequired,
};
