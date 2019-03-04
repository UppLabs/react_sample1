import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../../components/blocks/Menu';
import { setProductsPage } from '../../store/actions/products';

const mapStateToProps = state => ({
  supplierName: state.role.supplierName,
});

const mapDispatchToProps = dispatch => ({
  changePage: page => dispatch(setProductsPage(page)),
});

export class MenuContainer extends PureComponent {
  render() {
    const { supplierName } = this.props;

    return <Menu {...this.props} supplierName={supplierName} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);

MenuContainer.propTypes = {
  supplierName: PropTypes.string.isRequired,
};
