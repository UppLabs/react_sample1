import React, { PureComponent, Fragment } from 'react';
import cn from 'classname';
import PropTypes from 'prop-types';
import styles from './Logout.scss';
import token from '../../../utils/token.js';

class Logout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      drop: false,
    };
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), false);
  }

  handleClick = () => {
    this.setState({
      drop: !this.state.drop,
    });
  }

  handleLogout = () => {
    token.removeToken();
  }

  handleClickOutside(event) {
    const domNode = this.node;
    
    if(!domNode) return;

    if ((!domNode || !domNode.contains(event.target))) {
        this.setState({
            drop: false,
        });
    }
  }

	render() {
    const { drop } = this.state;
    const { roles } = this.props;

		return (
  <Fragment>
    <span
      onClick={this.handleClick} className={cn('ic-account')}
      ref={node => this.node = node}
    >
      <div className={drop === false ? styles.logout : cn(styles.logout, styles.open)}>
        <div className={styles.inner}>
          <div className={styles.info}>
            <div className={styles.logo}>
              <img src='' alt='' />
            </div>
            <div className={styles.person}>
              <span>Account Name</span>
              <span><a href=''>{roles.email}</a></span>
            </div>
          </div>
          <div className={styles.out}>
            <span onClick={this.handleLogout}>Profile</span>
            <span onClick={this.handleLogout}>Log out</span>
          </div>
        </div>
      </div>
    </span>
  </Fragment>
    );
	}
}

export default Logout;

Logout.defaultProps = {
  roles: '',
};

Logout.propTypes = {
  roles: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};