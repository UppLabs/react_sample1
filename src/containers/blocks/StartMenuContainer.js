import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setProductsPage } from '../../store/actions/products';
import Headerdevup from '../../components/blocks/Headerdevup';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export class StartMenuContainer extends PureComponent {
  render() {
    return <Headerdevup />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartMenuContainer);

StartMenuContainer.propTypes = {
  // supplierName: PropTypes.string.isRequired,
  // history: PropTypes.object.isRequired,
};
