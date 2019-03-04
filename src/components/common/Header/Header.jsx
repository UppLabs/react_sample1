import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.scss';

const Header = ({ text }) => {
   return (
     <div className={styles.container}>
       <div />
       <span className={styles.title}>{text}</span>
       <div />
     </div>
    );
};

export default Header;

Header.propTypes = {
   text: PropTypes.string.isRequired,
};
