/* eslint-disable global-require */
import cn from 'classname';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MenuAdminPanel.scss';
import IsMobile from '../../../containers/common/IsMobile';
// import RoleContainer from '../../../containers/blocks/RoleContainer';

class MenuAdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drop: false,
      drop_m: false,
      menu: {
        current: 'account',
        items: ['brands', 'account', 'users'],
      }, 
      menu_desctop: ['brands', 'account', 'users'],
      menu_items: ['/admin/brands', '/admin/account', '/admin/users'],
    };
  }

  
  handleDownOrUp() {
    this.setState({
      drop: !this.state.drop,
    });
  }

  render() {
    console.log(this.props);
    const {
      history,
    } = this.props;
    const { drop_m, menu_desctop, menu_items, drop, menu } = this.state;
    
    return (
      <Fragment>
        <div>
          <IsMobile
            desctop={
              <div className={drop_m === false ? styles.m_menu : cn(styles.m_menu, styles.down)}>
                <div className={styles.wrapper}>
                  <div
                    className={cn(styles.panel, styles.panel_noSearch)}
                  >
                    <div className={styles.menuCenter}>
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
                  </div>
                </div>
              </div>
              }
            mobile={null}
            width={1024}
          />
        </div>
      </Fragment>
    );
  }
}

export default MenuAdminPanel;

MenuAdminPanel.defaultProps = {
  history: {},
};

MenuAdminPanel.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.object,
  }),
};
