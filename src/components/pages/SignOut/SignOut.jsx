import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SingOut extends Component {
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return <div>SignOut</div>;
  }
}

export default SingOut;

SingOut.propTypes = {
  signOut: PropTypes.func.isRequired,
};
