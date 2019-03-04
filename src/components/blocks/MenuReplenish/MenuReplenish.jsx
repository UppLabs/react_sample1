/* eslint-disable global-require */
import cn from 'classname';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MenuReplenish.scss';
import IsMobile from '../../../containers/common/IsMobile';
import RoleContainer from '../../../containers/blocks/RoleContainer';
import LogoutContainer from '../../../containers/common/LogoutContainer';

class MenuReplenish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drop_m: false,
    };
  }

  componentDidMount() {
    const sticky = document.getElementsByClassName(styles.wrapper_static)[0];
    var lastScrollTop = 0;
    
    document.addEventListener('scroll', function() {
      var st = window.pageYOffset;
      if (st < 56) {
        sticky.style.top = 0;
        lastScrollTop = st + 1;
        return false;
      }
      if (st > lastScrollTop) {
        if (st >= 56) {
          sticky.style.top = -56 + 'px';
        }
        lastScrollTop = st - 2;
        return false;
      }

      if (st >= 56) {
        sticky.style.top = -56 + 'px';
        sticky.style.top = 0 + 'px';
        lastScrollTop = st + 1;
        return false;
      }
    });
  }

  handleDropdownMobile = () => {

    this.setState({
      drop_m: !this.state.drop_m,
    });
  }

  closeMenu() {
    this.setState({
      drop_m: false,
    });
  }

  logo = (
    <a>
      <img alt="" src={require('../../../images/logo.png')} />
      <span>{this.props.retailerName}</span>
    </a>
  );

  panel = (
    <div className={cn(styles.panel_icons, 'global')}>
      {/* <Link to="/replenish">
        <span className='ic-home' />
      </Link> */}
      <Link to="/replenish/orders">
        <span className='ic-list' />
      </Link>
      <Link to="/cart">
        <span className='ic-shopping_cart' />
      </Link>
      <Link to="/settings">
        <span className='ic-settings' />
      </Link>
      <RoleContainer replenish />
      <LogoutContainer />
    </div>
  );

  mobPanel = (
    <div className={styles.panel_icons + ' global'}>
      <Link to="/admin">
        <span className='ic-account' />
      </Link>
      <RoleContainer replenish />
    </div>
  );

  mobMenuLinks = (
    <div className={styles.m_menu_items}>
      <div onClick={() => this.closeMenu()}>
        <Link
          className={this.props.history.location.pathname === '/' ||
          this.props.history.location.pathname === '/replenish' ?
            styles.active :
            ''} to='/replenish'
        >
          Home
        </Link>
      </div>
      <div onClick={() => this.closeMenu()}>
        <Link
          className={this.props.history.location.pathname === '/replenish/products' ?
            styles.active : ''} to='/replenish/products'
        >
          Products
        </Link>
      </div>
      <div onClick={() => this.closeMenu()}>
        <Link
          className={this.props.history.location.pathname === '/replenish/orders' ?
            styles.active : ''} to='/replenish/orders'
        >
          Orders
        </Link>
      </div>
    </div>
  );

  render() {
    const { 
      drop_m,
    } = this.state;
    
    return (
      <Fragment>
        <div className={cn(styles.wrapper_static + ' menu_wrapper')}>
          <header className={styles['header-retailer']}>
            <div className={styles.logo}>
              {this.logo}
            </div>
            <IsMobile
              desctop={
                <div className={drop_m === false ? styles.m_menu : cn(styles.m_menu, styles.down)}>
                  <div className={styles.wrapper}>
                    <div
                      className={cn(styles.panel, styles.panel_noSearch)}
                    >
                      {this.panel}
                    </div>
                  </div>
                </div>
              }
              mobile={
                <div>
                  <div className={drop_m === false ? styles.m_menu : cn(styles.m_menu, styles.down)}>
                    <div className={styles.wrapper}>
                      <div
                        className={cn(styles.panel, styles.panel_noSearch)}
                      >
                        {this.mobMenuLinks}
                      </div>
                    </div>
                  </div>
                  {
                    <div className={styles.panel_mob}>
                      {this.mobPanel}
                    </div>
                  }
                </div>
              }
              width={767}
            />
            <span
              onClick={this.handleDropdownMobile}
              className={drop_m === false ? 'ic-close ' + cn(styles['ic-close']) :
                'ic-close ' + cn(styles['ic-close'], styles.isHide)}
            />
            <span
              onClick={this.handleDropdownMobile}
              className={drop_m === false ? 'ic-menu ' + cn(styles['ic-menu']) :
                'ic-menu ' + cn(styles['ic-menu'], styles.isHide)}
            />
          </header>
        </div>
      </Fragment>
    );
  }
}

export default MenuReplenish;

MenuReplenish.defaultProps = {
  retailerName: '',
};

MenuReplenish.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.object,
  }).isRequired,
  retailerName: PropTypes.string,
};
