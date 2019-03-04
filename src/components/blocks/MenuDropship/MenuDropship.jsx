/* eslint-disable global-require */
import cn from 'classname';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MenuDropship.scss';
import IsMobile from '../../../containers/common/IsMobile';
import RoleContainer from '../../../containers/blocks/RoleContainer';

class MenuDropship extends Component {
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

  render() {
    const { 
      drop_m,
    } = this.state;
          
    const {
      history,
    } = this.props;
    
    let logo = null,
        panel = null,
        mobPanel = null,
        mobMenuLinks = null;
    
      logo = (
        <a>
          <img alt="" src={require('../../../images/logo.png')} />
          <span>Dropship</span>
        </a>
      );
      panel = (
        <div className={styles.panel_icons + ' global'}>
          <Link to="/dropship">
            <span className='ic-home' />
          </Link>
          <Link to="/dropship/products">
            <span className='ic-check-circle' />
          </Link>
          <Link to="/dropship/orders">
            <span className='ic-car' />
          </Link>
          <Link to="/admin">
            <span className='ic-account' />
          </Link>
          <RoleContainer dropship />
        </div>
      );
      mobPanel = (
        <div className={styles.panel_icons + ' global'}>
          <Link to="/admin">
            <span className='ic-account' />
          </Link>
          <RoleContainer dropship />
        </div>
      );
      mobMenuLinks = (
        <div className={styles.m_menu_items}>
          <div onClick={() => this.closeMenu()}>
            <Link
              className={history.location.pathname === '/dropship/products' ?
                styles.active : ''} to='/products'
            >
              Product
            </Link>
          </div>
          <div onClick={() => this.closeMenu()}>
            <Link
              className={history.location.pathname === '/dropship/orders' ?
                styles.active : ''} to='/orders'
            >
              Order
            </Link>
          </div>
        </div>
      );
    
    const searchBlock = (
      <div className={styles.icon_search}>
        <span className={styles['ic-search'] + ' ic-search'} />
        <input type='text' placeholder='Search products' />
      </div>
    );
    
    return (
      <Fragment>
        <div className={cn(styles.wrapper_static + ' menu_wrapper')}>
          <header className={styles['header-retailer']}>
            <div className={styles.logo}>
              {logo}
            </div>
            <IsMobile
              desctop={
                <div className={drop_m === false ? styles.m_menu : cn(styles.m_menu, styles.down)}>
                  <div className={styles.wrapper}>
                    <div
                      className={styles.panel}
                    >
                      {searchBlock}
                      {panel}
                    </div>
                  </div>
                </div>
              }
              mobile={
                <div>
                  <div className={drop_m === false ? styles.m_menu : cn(styles.m_menu, styles.down)}>
                    <div className={styles.wrapper}>
                      <div
                        className={styles.panel}
                      >
                        {searchBlock}
                        {mobMenuLinks}
                      </div>
                    </div>
                  </div>
                  {
                    <div className={styles.panel_mob}>
                      {mobPanel}
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

export default MenuDropship;

MenuDropship.defaultProps = {
};

MenuDropship.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.object,
  }).isRequired,
};
