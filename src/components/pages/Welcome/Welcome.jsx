import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Welcome.scss';
import Button from '../../common/Button';
import Wall from '../../common/Wall';

class Welcome extends PureComponent {

    render() {
        return (
          <div className={styles.wrapper_welcome_block}>
            <p>Welcome!</p>
            <Link to='/signin'><Button full_width text='SIGN IN' /></Link>
          </div>
    );
    }
}

export default Welcome;

// Welcome.defaultProps = {

// };

// Welcome.propTypes = {

// };