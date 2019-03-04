import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './PageLayout.scss';

class PageLayout extends PureComponent {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };
  
  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    );
  }
}

export default PageLayout;

PageLayout.defaultProps = {
  children: undefined,
};

PageLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};