import React, { PureComponent, Fragment } from 'react';
import cn from 'classname';
import PropTypes from 'prop-types';
import styles from './Roles.scss';
import { RETAILER, SUPPLIER } from '../../../constants/roles';

class Roles extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      count: 6,
      height: window.innerHeight,
    };
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), false);
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), false);
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  setClass = () => {
    const { brands, replenish, dropship, admin } = this.props;

    if(brands) return styles.brands;
    if(replenish) return styles.replenish;
    if(dropship) return styles.dropship;
    if(admin) return styles.admin;
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show,
      count: 6,
    });
  }

  handleClickOutside(event) {
    const domNode = this.node;
    
    if(!domNode) return;

    if ((!domNode || !domNode.contains(event.target))) {
        this.setState({
            show: false,
            count: 6,
        });
    }
  }

  showMore = (e) => {
    e.stopPropagation();
    this.setState({
      count: this.state.count + 6,
    }, () => {
      this.list.scrollTop = this.list.scrollHeight;
    });
  }

  sub = (values) => {
    const { count } = this.state;
    const suppliersCount = this.props.roles.suppliers.length;

    if(values.length > 0) {
      return (
        <Fragment>
          {
            values.slice(0, count).map((value, i) => {
              return (
                <li 
                  key={value.name} 
                  onClick={
                    () => {
                      this.toggleShow(); 
                      this.props.setRole(
                        value.id, suppliersCount <= count && i < suppliersCount ? SUPPLIER : RETAILER, value.name,
                      );
                  }}
                >
                  <img 
                    className={styles.logo} alt={value.name} 
                    src={value.square_logo_path} 
                  />
                </li>);
            })
          }
        </Fragment>
      );
    }

    return null;
  }

  handleWindowSizeChange = () => {
    this.setState({ height: window.innerHeight });
  };

  render () {
    const { roles } = this.props;
    const values = roles ?  [...roles.suppliers, ...roles.retailers] : [];

    return (
      <span
        onClick={this.toggleShow} className={cn('ic-dashboard')}
        ref={node => this.node = node}
      >
        <div
          className={
            cn(this.setClass(), styles.rightRoles, styles.roles, this.state.show ? styles.open : '')
          }
        >
          <div>
            <ul 
              className={cn(styles.main, this.state.height > 768 ? styles.max768 : '')} 
              ref={list => this.list = list}
            >
              {values.length > 0 ? this.sub(values) : null}
            </ul>
            <div 
              onClickCapture={this.showMore} 
              className={
                cn(styles.more, values.length >= this.state.count && this.state.show === true ? '' : styles.none)
              }
            >
              <a>More</a>
            </div>
          </div>
        </div>
      </span>
    );
  }
}

export default Roles;

Roles.defaultProps = {
  roles: undefined,
  brands: false,
  replenish: false,
  dropship: false,
  admin: false,
};

Roles.propTypes = {
  roles: PropTypes.shape({
    retailers: PropTypes.array,
    suppliers: PropTypes.array,
 }),
 setRole: PropTypes.func.isRequired,
 brands: PropTypes.bool,
 replenish: PropTypes.bool,
 dropship: PropTypes.bool,
 admin: PropTypes.bool,
};

