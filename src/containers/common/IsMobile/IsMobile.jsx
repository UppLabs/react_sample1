import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IsMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullWidth: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ fullWidth: window.innerWidth });
  };
  
  render() {
    const { mobile, desctop, width } = this.props;
    const { fullWidth } = this.state;

    const isMobile = fullWidth <= width;
    if(isMobile) {
        return (mobile ? mobile : null);
    } else {
        return (desctop ? desctop : null);
    }
  }
}

export default IsMobile;

IsMobile.defaultProps = {
  mobile: null,
  desctop: null,
  width: 768,
};

IsMobile.propTypes = {
    mobile: PropTypes.element,
    desctop: PropTypes.element,
    width: PropTypes.number,
};
