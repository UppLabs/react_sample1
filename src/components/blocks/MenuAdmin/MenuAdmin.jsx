/* eslint-disable global-require */
import cn from 'classname';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MenuAdmin.scss';
import IsMobile from '../../../containers/common/IsMobile';
import RoleContainer from '../../../containers/blocks/RoleContainer';

class MenuAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drop: false,
      drop_m: false,
      menu: {
        current: 'dropship',
        items: ['dropship', 'replenishment'],
      }, 
      menu_desctop: ['dropship', 'replenishment'],
      menu_items: ['/admin/dropship', '/admin/replenishment'],
    };
  }

  componentDidMount() {
    const sticky = document.getElementsByClassName(styles.wrapper_static)[0];
    var lastScrollTop = 0;
    
    document.addEventListener('scroll', function(e) {
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
  
  handleDownOrUp() {
    this.setState({
      drop: !this.state.drop,
    });
  }

  handleDropdown = (index) => {
    let arr = this.state.menu.items;
    let ch = arr[0];
    arr[0] = arr[index];
    arr[index] = ch;
    this.setState({
      drop: !this.state.drop,
      menu: {
        current: arr[index],
        items: arr,
      },
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
      drop,
      drop_m,
      menu_desctop,
      menu_items,
      menu,
    } = this.state;
          
    const {
      history,
    } = this.props;
    
    let logo = null,
        panel = null,
        mobPanel = null,
        mobMenuLinks = null;
    

      logo = (
        <a href='#'>
          <img alt="" src={require('../../../images/logo.png')} />
          <span>Retailer Administration</span>
        </a>
      );
      panel = (
        <div className={styles.panel_icons + ' global'}>
          <span className='ic-account' />
          <RoleContainer admin />
        </div>
      );
      mobPanel = (
        <div className={styles.panel_icons + ' global'}>
          <span className='ic-account' />
          <RoleContainer admin />
        </div>
      );
      mobMenuLinks = (
        <div className={styles.m_menu_items}>
          <div onClick={() => this.closeMenu()}>
            <Link
              className={history.location.pathname === '/admin/brands' ?
                styles.active : ''} to='/admin/brands'
            >
              Brands
            </Link>
          </div>
          <div onClick={() => this.closeMenu()}>
            <Link
              className={history.location.pathname === '/admin/account' || history.location.pathname === '/admin' ?
                styles.active : ''} to='/admin/account'
            >
              Account
            </Link>
          </div>
          <div onClick={() => this.closeMenu()}>
            <Link
              className={history.location.pathname === '/admin/users' ?
                styles.active : ''} to='/admin/users'
            >
              Users
            </Link>
          </div>
        </div>
      );
    
    const menuCenter = (
      <div className={styles.menu_desctop}>
        {
                menu_desctop.map((item, i) => {
                  if (1 === i) {
                    return (
                      <div key={i}>
                        <div className={styles.border}>
                          <Link 
                            className={history.location.pathname === menu_items[i] || 
                                                            history.location.pathname === '/admin' ? 
                                                            styles.active : 
                                                            ''}  
                            to={`/admin/${item}`}
                          >{item}
                          </Link>
                          <span
                            className={drop === false ? 'ic-dropdown ' + cn(styles.dropdown_icon) :
                              'ic-dropdown ' + cn(styles.dropdown_icon, styles.down)}
                          />
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={i}>
                        <div className={styles.border}>
                          <Link 
                            className={history.location.pathname === menu_items[i] ? 
                                                                        styles.active : 
                                                                        ''} to={`/admin/${item}`}
                          >{item}
                          </Link>
                        </div>
                      </div>
                    );
                  }
                })
              }
      </div>
    );

    const tableMenu = (
      <div className={drop === false ? styles.menu : cn(styles.menu , styles.drop)}>
        {
                menu.items.map((item, i) => {
                  if (0 === i) {
                    return (
                      <div key={i}>
                        <div onClick={() => {this.handleDownOrUp();}} className={styles.border}>
                          <Link
                            className={styles.active}
                            onClick={() => this.handleDropdown(i)}
                            to={`/admin/${item}`}
                          >{item}
                          </Link>
                          <span
                            className={drop === false ? 'ic-dropdown ' + cn(styles.dropdown_icon) :
                              'ic-dropdown ' + cn(styles.dropdown_icon, styles.down)}
                          />
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={i}>
                        <div className={styles.border}>
                          <Link
                            onClick={() => this.handleDropdown(i)}
                            to={`/admin/${item}`}
                          >{item}
                          </Link>
                        </div>
                      </div>
                    );
                  }
                })
              }
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
                      className={cn(styles.panel, styles.panel_noSearch)}
                    >
                      <div className={styles.menuCenter}>
                        {menuCenter}
                      </div>
                      {panel}
                    </div>
                  </div>
                </div>
              }
              mobile={
                <IsMobile
                  desctop={
                    <div className={drop_m === false ? styles.m_menu : cn(styles.m_menu, styles.down)}>
                      <div className={styles.wrapper}>
                        <div
                          className={cn(styles.panel, styles.panel_noSearch)}
                        >
                          {tableMenu}
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
                            className={cn(styles.panel, styles.panel_noSearch)}
                          >
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
                  width={768}
                />
              }
              width={1024}
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

export default MenuAdmin;

MenuAdmin.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.object,
  }).isRequired,
};
