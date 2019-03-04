import React, { PureComponent } from 'react';
import cn from 'classname';
import PropTypes from 'prop-types';
import styles from './Panel.scss';
import IsMobile from '../../../containers/common/IsMobile';

class Panel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDrop: false,
    };
  }

  componentDidMount() {
    var panel = document.getElementsByClassName(styles.panel_info)[0];
    var wrapper_menu = document.getElementsByClassName('menu_wrapper')[0];
    var lastScrollTop = 0;
    var scrolled = window.pageYOffset;
    const close = document.getElementsByClassName('ic-close')[1];
    const menu = document.getElementsByClassName('ic-menu')[1];
     if (this.props.fix) return false;
    close && close.addEventListener('click', function (e) {
      if (wrapper_menu.style.top === '0px') {
        panel.style.top = 0;
      }
    });
    if(scrolled >= 56) {
      wrapper_menu.style.top = '0px';
      panel.style.top = 0 + 'px';
    }
    close && menu.addEventListener('click', function (e) {
      if (wrapper_menu.style.top === '-56px') {
        panel.style.top = 56 + 'px';
      }
    });
    document.addEventListener('scroll', function(e) {
      var scrolled = window.pageYOffset;
      if (scrolled === 0) {
        panel.style.top = 56 + 'px';
      }
      if (scrolled < lastScrollTop) {
        panel.style.top = 56 + 'px';
        lastScrollTop = scrolled + 1;
        return false;
      }
      if (scrolled >= 56) {
        panel.style.top = 0;
        if (wrapper_menu.style.top === '0px') {
          panel.style.top = 56 + 'px';
        }
        lastScrollTop = scrolled;
        return false;
      }
      lastScrollTop = scrolled;
    });
  }

  handleDrop = () => {
    this.setState({
      isDrop: !this.state.isDrop,
    });
  }

  render() {
    const { width, identifier, mobile, fix } = this.props;

    return (
      <IsMobile
        desctop={
          <div className={fix === false ? styles.panel_info : cn(styles.static_panel_info)}>
            {this.props.children}
          </div>
        }
        mobile={
          <div
            className={this.state.isDrop === false ? 
              cn(styles.panel_info, fix ? styles.static : null) : 
              cn(styles.panel_info, fix ? styles.static : null, styles[identifier])}
            onClick={() => this.handleDrop()}
          >
            <div className={identifier === 'home' && this.state.isDrop === false ? 
              styles.wrapper_hidden : 
              cn(styles.wrapper_hidden, styles.isDrop)}
            >
              <div className={styles[mobile]}>
                {this.props.children}
              </div>
            </div>
          </div>
        }
        width={width}
      />
    );
  }
}

export default Panel;

Panel.defaultProps = {
  identifier: 'default',
  mobile: 'default',
  width: undefined,
  fix: false,
};

Panel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
  width: PropTypes.number,
  identifier: PropTypes.string,
  mobile: PropTypes.string,
  fix: PropTypes.bool,
};
