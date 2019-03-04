/* eslint-disable global-require */
import findIndex from 'lodash/findIndex';
import cn from 'classname';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Menu.scss';
import RoleContainer from '../../../containers/blocks/RoleContainer';
import IsMobile from '../../../containers/common/IsMobile';
import LogoutContainer from '../../../containers/common/LogoutContainer';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubMenu: false,
      drop: false,
      drop_m: false,
      menu: {
        current: 'home',
        items: ['home', 'products', 'retailers', 'orders', 'stats'],
      }, 
      menu_desctop: ['home', 'products', 'retailers', 'orders', 'stats'],
      menu_items: ['/home', '/products', '/retailers', '/orders', '/stats'],
      sub_menu: [{
        parentName: 'products',
        items: [{
          label: 'Dropship Permissions',
          value: 'dropship',
        },
        {
          label: 'Replenishment Permissions',
          value: 'replenishment',
        }],
      }],
    };
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), false);
  }
  componentDidMount() {
    const sticky = document.getElementsByClassName(styles.wrapper_static)[0];
    const icons = document.getElementsByClassName(styles.panel_icons)[1];
    var ic_menu = document.getElementsByClassName(styles['ic-menu'])[1];
    var ic_close = document.getElementsByClassName(styles['ic-close'])[1];
    var lastScrollTop = 0;

    document.addEventListener('scroll', function() {
      var st = window.pageYOffset;
      
      if (st < 56) {
        sticky.style.top = 0;
        icons.classList.remove(styles.to_panel);
        icons.classList.remove('to_panel');
        ic_menu.style.display = 'none';
        ic_close.style.display = 'block';
        lastScrollTop = st;
        return false;
      }
      if (st > lastScrollTop) {
        if (st >= 56) {
          sticky.style.top = -56 + 'px';
        }
        icons.classList.add(styles.to_panel);
        icons.classList.add('to_panel');
        ic_menu.style.display = 'block';
        ic_close.style.display = 'none';
        lastScrollTop = st - 1;
        return false;
      }

      if (st >= 56) {
        sticky.style.top = 0 + 'px';
        icons.classList.remove(styles.to_panel);
        icons.classList.remove('to_panel');
        ic_menu.style.display = 'none';
        ic_close.style.display = 'block';
        lastScrollTop = st;
        return false;
      }
    });
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), false);
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

  handleDropdownDesc = () => {
    var sticky = document.getElementsByClassName(styles.wrapper_static)[0];
    var icons = document.getElementsByClassName(styles.panel_icons)[1];
    var ic_menu = document.getElementsByClassName(styles['ic-menu'])[1];
    var ic_close = document.getElementsByClassName(styles['ic-close'])[1];
    if (ic_menu.style.display === 'block') {
      ic_menu.style.display = 'none';
      ic_close.style.display = 'block';
      sticky.style.top = 0 + 'px';
      icons.classList.remove(styles.to_panel);
      icons.classList.remove('to_panel');
    } else {
      ic_menu.style.display = 'block';
      ic_close.style.display = 'none';
      sticky.style.top = -56 + 'px';
      icons.classList.add(styles.to_panel);
      icons.classList.add('to_panel');
    }
  }
  
  handleClickOutside(event) {
    const domNode = this.node;
    if(!domNode) return;

    if ((!domNode || !domNode.contains(event.target))) {
        this.setState({
            drop : false,
        });
    }
  }

  closeMenu() {
    this.setState({
      drop_m: false,
    });
  }

  showSubMenu = () => {
    this.setState({
      showSubMenu: true,
    });
  }

  closeSubMenu = () => {
    this.setState({
      showSubMenu: false,
    });
  }

  menuItemDesctop = (item, i) => {
    const {
      history,
      changePage,
    } = this.props;

    const { 
      menu_items,
      sub_menu,
      drop,
    } = this.state;

    if(i === 0) {
      return (      
        <div key={i}>
          <div className={styles.border}>
            <Link 
              className={history.location.pathname === menu_items[i] || 
              history.location.pathname === '/' ? 
              styles.active : 
              ''}  
              to={`/${item}`}
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

      let menuItem = null;
      let subIndex = findIndex(sub_menu, { parentName: item });
      if(subIndex > -1) {
        menuItem = (
          <Fragment>
            <div 
              ref={node => this.shuMenuItem = node} 
              className={cn(styles.subMenuItem, history.location.pathname.includes(item) ? 
              styles.active : '')}
              onMouseEnter={this.showSubMenu}
              onMouseLeave={this.closeSubMenu}
            >
              <a>{item}</a>
            </div>
            {this.state.showSubMenu ? 
              <div 
                onMouseEnter={this.showSubMenu}
                onMouseLeave={this.closeSubMenu}
                ref={node => this.subMenu = node} 
                className={cn(styles.subMenu, history.location.pathname.includes(item) ? 
                styles.active : '')}
              >
                <div>
                  {sub_menu[subIndex].items.map((subMenuItem) => {
                    return (
                      <div
                        key={subMenuItem.value}
                      >
                        <Link
                          onClick={
                            () => {
                              this.closeSubMenu();
                              !history.location.pathname.includes(subMenuItem.value) 
                              ? changePage(subMenuItem.value)
                              : null;
                            }
                          }
                          to={`/${item}/${subMenuItem.value}`}
                        >
                          {subMenuItem.label}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div> 
            : null }
          </Fragment>);
      } else {
        menuItem = (
          <Link 
            className={history.location.pathname === menu_items[i] ? 
          styles.active : 
          ''} to={`/${item}`}
          >
            {item}
          </Link>
        );
      }

      return (
        <div key={item}>
          <div className={styles.border}>
            {menuItem}
          </div>
        </div>
      );
    }
  }

  render() {
    const { 
      drop,
      drop_m,
      menu,
      menu_desctop,
      menu_items,
    } = this.state;
          
    const {
      history,
      supplierName,
    } = this.props;
    
    return (
      <Fragment>
        <div className={cn(styles.wrapper_static + ' menu_wrapper')} ref={node => this.node = node}>
          <header>
            <div className={styles.logo}>
              <Link to="/">
                <img alt="" src={require('../../../images/logo.png')} />
                <span>{supplierName}</span>
              </Link>
            </div>
            <div className={styles.menu_desctop}>
              {
                menu_desctop.map((item, i) => {
                  return this.menuItemDesctop(item, i);
                })
              }
            </div>
            <div className={drop === false ? styles.menu : cn(styles.menu , styles.drop)}>
              {
                menu.items.map((item, i) => {
                  if (0 === i) {
                    return (
                      <div key={item}>
                        <div onClick={() => {this.handleDownOrUp();}} className={styles.border}>
                          <Link
                            className={styles.active}
                            onClick={() => this.handleDropdown(i)}
                            to={`/${item}`}
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
                      <div key={item}>
                        <div className={styles.border}>
                          <Link
                            onClick={() => this.handleDropdown(i)}
                            to={`/${item}`}
                          >{item}
                          </Link>
                        </div>
                      </div>
                    );
                  }
                })
              }
            </div>
            <div className={styles.panel}>
              <div className={styles.panel_icons + ' global'}>
                <IsMobile
                  mobile={
                    <RoleContainer brands />
                  } 
                />
                <span className=' ic-account' />
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
              </div>
            </div>
            <div className={styles.panel_desctop}>
              <div className={styles.panel_icons}>
                <IsMobile
                  desctop={
                    <RoleContainer brands />
                  }
                />
                <LogoutContainer />
                <span onClick={this.handleDropdownDesc} className={cn(styles['ic-close']) + ' ic-close'} />
                <span
                  onClick={this.handleDropdownDesc}
                  className={drop_m === false ? 'ic-menu ' + cn(styles['ic-menu']) :
                    'ic-menu ' + cn(styles['ic-menu'], styles.isHide)}
                />
              </div>
              
            </div>
          </header>
          <div className={drop_m === false ? styles.m_menu : cn(styles.m_menu, styles.down)}>
            <div className={styles.wrapper}>
              <div className={styles.m_menu_items}>
                {
                  menu_desctop.map((item, i) => {
                    if (0 === i) {
                      return (
                        <div key={item} onClick={() => this.closeMenu()}>
                          <Link
                            className={history.location.pathname === '/' || 
                            history.location.pathname === '/home' ? 
                            styles.active : 
                            ''} to='/home'
                          >{item}
                          </Link>
                        </div>
                      );
                    } else {
                      return (
                        <div key={item} onClick={() => this.closeMenu()}>
                          <Link
                            className={history.location.pathname === menu_items[i] ? 
                            styles.active : ''} to={`/${item}`}
                          >
                            {item}
                          </Link>
                        </div>
                      );
                    }
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Menu;

Menu.defaultProps = {
  supplierName: '',
};

Menu.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.object,
  }).isRequired,
  supplierName: PropTypes.string,
  changePage: PropTypes.func.isRequired,
};
