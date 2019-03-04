import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import { NavLink } from 'react-router-dom';
import styles from './TabMenu.scss';

 const TabMenu = ({ title, to, root }) => {
  return (
    <NavLink
      className={cn(styles.container, root ? styles.active : '')} activeClassName={styles.active}
      to={to}
    >{title}
    </NavLink>
  );
};

export default TabMenu;

TabMenu.defaultProps = {
  root: false,
};

TabMenu.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    root: PropTypes.bool,
};
