import React, { Fragment, PureComponent } from 'react';
import OverlayScrollbars from 'overlayscrollbars';
import cn from 'classname';
import PropTypes from 'prop-types';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Button from '../../common/Button';
import styles from './AssignTo.scss';
import Checkbox from '../../common/Checkbox';
import '../../../../node_modules/overlayscrollbars/css/OverlayScrollbars.css';
import AssignNewProductsModal from '../../blocks/AssignNewProductsModal';

class AssignTo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      resultsRetailers: [],
      addedRetailers: [],
      allRetailers: this.props.retailers,
      isHideAutocomplete: false,
      key: '',
      switcher: -1,
      mouseOver: false,
      open: false,
    };
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), false);
  }

  componentDidMount() {
    OverlayScrollbars(
      document.querySelectorAll('.' + styles.assign_retailers)[0],
      {
        sizeAutoCapable: true,
        paddingAbsolute: true,
        className: 'os-theme-dark',
      },
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allRetailers: nextProps.retailers,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), false);
  }

  handleKeyDown = (event) => {
    if (this.state.mouseOver !== false) return false;
    if (event.keyCode === 40) {
      this.setState({
        key: event.key,
        switcher: this.state.resultsRetailers.length === this.state.switcher + 1 ? 0 : this.state.switcher + 1,
      });
    }
    if (event.keyCode === 38) {
      this.setState({
        key: event.key,
        switcher: this.state.switcher - 1 >= 0 ? this.state.switcher - 1 : this.state.resultsRetailers.length - 1,
      });
    }
    if (event.keyCode === 13) {
      this.state.resultsRetailers.forEach((item, i) => {
        if (i === this.state.switcher) {
          this.handleClick(item.retailer, item.retailer_id);
        }
      });
    }
  }

  isRetailerSelected = () => {
    const { home, products, checked, disabled } = this.props;

    const isDisabled = !(checked.length > 0) || disabled ? true : false;
    // const isCheck = !(checked.length > 0) || disabled ? false : true;

    if(home) {
      return (
        <div className={styles.home}>
          <Button
            disabled={isDisabled}
            color="green" text="Approve"
            onClick={this.openModal}
          />
        </div>
      );
    }
    if(products) {
      return (
        <div className={styles.products}>
          <Button
            disabled={isDisabled}
            color="white" text="Revoke"
            onClick={() => this.submit('revoke')}
          />
          <Button
            disabled={isDisabled}
            color="green" text="Approve"
            onClick={() => this.submit('update')}
          />
        </div>
      );
    }
  }

  submit = (value) => {
    const { dropship, replenishment } = this.state;

    this.props.submit && this.props.submit({
      dropship: dropship ? dropship : value == 'update' ? true : false,
      replenishment: replenishment ? replenishment : value == 'update' ? true : false,
    });
  }

  handleClickOutside = () => {
    if (this._search === null || !this._search.value) return false;
    this._search.value = '';

    this.setState({
      resultsRetailers: [],
    });
  }

  search(event) {
    if (event.target.value.length <= 1) {
      this.setState({ resultsRetailers: [] });
      return false;
    }
    this.props.search(event.target.value);
    const value = event.target.value.toLowerCase();
    
    const addedRetailers = this.state.addedRetailers;

    const newResults = this.props.retailers.filter(v => v.retailer.name.toLowerCase().indexOf(value) > -1);
    if (addedRetailers.length === 0) {
      this.setState({
      resultsRetailers: newResults,
      isHideAutocomplete: false,
      switcher: -1,
    });
    } else {
      const resultsFilters = newResults.filter((v) => {
        return addedRetailers.filter((t) => {
          return t.name == v.retailer.name;
        }).length == 0;
      });

      this.setState({
        resultsRetailers: resultsFilters,
        isHideAutocomplete: false,
        switcher: -1,
      });
    }
  }

  handleCheck = (value, key) => {
    const { check, uncheck } = this.props;

    if(value) {
      check(key);
    } else {
      this.setState({
        addedRetailers: this.state.addedRetailers.filter(x => x.name !== key),
      });
      uncheck(key);
    }
  }

  handleClickMouseOver = () => {
    this.setState({
      switcher: -1,
      mouseOver: true,
    });
  }

  handleClickMouseOut = () => {
    this.setState({
      mouseOver: false,
    });
  }

  handleClick = (retailer, id) => {
    this.props.check(retailer.name);

    var check = this.state.addedRetailers;
    var newCheck = [];
    newCheck.push(...check, retailer);
    
    var retailers = this.props.retailers.filter(item => item.retailer.id !== id);
    var retailersAll = this.state.allRetailers.filter(item => item.retailer.id !== id);

    if(this._search) {
      this._search.value = '';
    }

    this.setState({
      resultsRetailers: retailers,
      addedRetailers: newCheck,
      allRetailers: retailersAll,
      isHideAutocomplete: true,
    });
  }

  isChecked = (model) => {
    return this.props.checked.indexOf(model) > -1 ? true : false;
  }

  openModal = () => {
    this.setState({
      open: true,
    });
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  }

  selectAllRetailers = () => {
    let newCheck = [];
    for(let i of this.props.retailers) {
      newCheck.push(i.retailer);
    }
    this.setState({
      addedRetailers: newCheck,
    });

    this.props.selectAll();
  }

  clearAllRetailers = () => {
    this.setState({
      addedRetailers: [],
    });
    this.props.clearAll();
  }

  render() {
    const { 
      resultsRetailers, addedRetailers, isHideAutocomplete, 
      key,
      switcher, 
    } = this.state;
    const { 
      home, 
      products, 
      submit, 
      retailersCount, 
      productsCount,  
    } = this.props;

    return (
      <Fragment>
        <AssignNewProductsModal
          open={this.state.open} onClose={this.closeModal}
          submit={submit}
          productsCount={productsCount}
          retailersCount={retailersCount}
        />
        <div className='column_filter'>
          <div className={styles.assign}>
            { home ? 'Grant Permissions to' : null }
            { products ? 'Change Permissions to' : null }
          </div>
          <div className={styles.panel}>
            <a onClick={this.selectAllRetailers}>Select all</a>
            <a onClick={this.clearAllRetailers} className={styles.clear}>Clear all</a>
          </div>
          <div className={styles.retailers_checkbox + ' assign'}>
            <div className={resultsRetailers.length === 0 || isHideAutocomplete === true ? 
              styles.search_retailers : 
              cn(styles.search_retailers, styles.results)}
            >
              <div className='search'>
                <input
                  type='text' ref={(node) => {this._search = node;}}
                  onChange={event => this.search(event)}
                  onKeyDown={this.handleKeyDown}
                  placeholder="Search a retailer name"
                />
                <div className='ic-search' />
              </div>
              <div
                className={styles.autocomplete} onMouseOver={this.handleClickMouseOver}
                onMouseOut={this.handleClickMouseOut}
                onFocus={this.handleClickMouseOver}
                onBlur={this.handleClickMouseOut}
              >
                <div className={styles.results}>
                  {
                    resultsRetailers &&
                    resultsRetailers.map((item, i) => {
                      return (
                        <div
                          index={i}
                          id={item.retailer_id} className={switcher === i ? styles.active :
                          switcher === -1 ? '' : ''}
                          onClick={() => this.handleClick(item.retailer, item.retailer_id)}
                          key={item.retailer_id}
                        >{item.retailer.name}
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            </div>
            <div className={styles.assign_retailers}>
              <div>
                <TransitionGroup>
                  {
                    addedRetailers && addedRetailers.map((item) => {
                      return (
                        <CSSTransition
                          key={item.id}
                          timeout={400}
                          classNames="fade"
                        >
                          <Checkbox
                            checked={this.isChecked(item.name)}
                            value={item.name}
                            onChange={this.handleCheck}
                          />
                        </CSSTransition>
                      );
                    })
                  }
                </TransitionGroup>
              </div>
            </div>
            {addedRetailers.length !== 0 ? this.isRetailerSelected() : null}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AssignTo;

AssignTo.defaultProps = {
  home: false,
  products: false,
  submit: undefined,
  disabled: false,
};

AssignTo.propTypes = {
  checked: PropTypes.array.isRequired,
  check: PropTypes.func.isRequired,
  uncheck: PropTypes.func.isRequired,
  retailers: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired,
  home: PropTypes.bool,
  products: PropTypes.bool,
  submit: PropTypes.func,
  disabled: PropTypes.bool,
  productsCount: PropTypes.number.isRequired,
  retailersCount: PropTypes.number.isRequired,
  selectAll: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired,
};