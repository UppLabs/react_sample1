/* eslint-disable global-require */
import React, { PureComponent, Fragment } from 'react';
import cn from 'classname';
import { Panel, PanelGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Checkbox from '../../common/Checkbox';
import styles from './ProductFilter.scss';
import { upperFirst } from '../../../utils/formatHelper';

class ProductFilter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      key: 0,
      filterKeys: {},
      filters: this.props.filters,
    };
    this.currentFilter = this.props.currentFilter;
    this.isAllClear = false;
    this.staticKeyHasInventory = 'hasInventory';
    this.staticKeyIsApproved = 'isApproved';
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(Object.keys(prevState.filters).length === 0) {
      return {
        filters: nextProps.filters,
      };
    }

    return null;
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  dataCheckbox = (year, count) => {
    return (
      <div className={styles.data_results}>
        <span className={styles.year_data}>{year}</span>
        <span className={count === 0 ? styles.count_zero : styles.count}>
          {count}
        </span>
      </div>
    );
  };

  search = key => (event) => {
    
    const value = event.target.value.toLowerCase();
    const items = this.props.filters[key]; 
    const keys = Object.keys(items);

    const newKeys = keys.filter(v => v.toLowerCase().indexOf(value) > -1);
    
    let newItems = {};

    for(let k of newKeys) {
      newItems = {
        ...newItems,
        [k]: items[k],
      };
    }

    this.setState({
      filters :{
        ...this.state.filters,
        [key] : newItems,
      },
    });
  };
  
  checkIsEmptyFilters = () => {
    for(let key in this.currentFilter) {
      if(this.currentFilter.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  
  clearFiltersAll = () => {
    this.setState({
      key: this.state.key === 0 ? 1 : 0,
      filters:{
        ...this.props.filters,
      },
    });
    this.currentFilter = {};
    this.props.setFilter(this.currentFilter);
  }

  clearFilter = (key) => {
    this.setState({
      filterKeys: {
        [key]: this.state.filterKeys[key] === 0 ? 1 : 0,
      },
      filters:{
        ...this.props.filters,
      },
    });
    delete this.currentFilter[key];
    this.props.setFilter(this.currentFilter);
  }

  handleCheck = (key, value) => {
    const k = Object.keys(value)[0];
    if(!this.currentFilter[key]) this.currentFilter[key] = [];

    const index = this.currentFilter[key] ? this.currentFilter[key].indexOf(k) : -1;
    if(index > -1) {
      this.currentFilter[key].splice(index, 1);

      if(this.currentFilter[key].length == 0) {
        delete this.currentFilter[key];
      }

    } else {
      this.currentFilter[key].push(k);
    }
    
    this.props.setFilter(this.currentFilter);
    this.forceUpdate();
  };

  isChecked = (key, item) => {
    return this.props.currentFilter && this.props.currentFilter[key] 
      && this.props.currentFilter[key].indexOf(item) > -1 
      ? true : false;
  }

  isExpanded = (key) => {
    return this.props.currentFilter && this.props.currentFilter[key] && this.props.currentFilter[key].length > 0 
      ? true : false;
  }

  filter = (name, key) => {
    if(!this.state.filters) return;
    const items = this.state.filters[key];
    if (items) {
      const keys = Object.keys(items);
      return (
        <Fragment>
          <Panel.Heading>
            <Panel.Title toggle>
              <div className={styles.section}>
                <span>{name}</span>
                <span className={styles.clear + ' clear'} onClick={() => this.clearFilter(key)}>Clear</span>
              </div>
              <span className="ic-dropdown" />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible key={this.state.filterKeys[key]}>
            <div className="search">
              <input type="text"  onChange={this.search(key)} />
              <div className="ic-search" />
            </div>
            <div className={styles.year}>
              {keys.map(function(item) {
                    return (
                      <Checkbox
                        key={item}
                        value={item}
                        counter={items[item]}
                        filterKey={key}
                        handler={this.handleCheck}
                        checked={this.isChecked(key, item)}
                      />
                    );
                  }, this)}
            </div>
          </Panel.Body>
        </Fragment>
      );
    }
    return null;
  };

  staticFilter = () => {
    return (
      <Fragment>
        <Panel
          key={this.staticKeyHasInventory} defaultExpanded={this.isExpanded(this.staticKeyHasInventory)}
          eventKey={this.staticKeyHasInventory}
        >
          <Panel.Heading>
            <Panel.Title toggle>
              <div className={styles.section}>
                <span>Has inventory</span>
                <span className={styles.clear + ' clear'} onClick={() => this.clearFilter(this.staticKeyHasInventory)}>
                  Clear
                </span>
              </div>
              <span className="ic-dropdown" />
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible key={this.state.filterKeys[this.staticKeyHasInventory]}>
            <div className={styles.year}>
              <Checkbox
                id={`${this.staticKeyHasInventory}Yes`}
                value="Yes"
                filterKey={this.staticKeyHasInventory}
                handler={this.handleCheck}
                checked={this.isChecked(this.staticKeyHasInventory, 'Yes')}
              />
              <Checkbox
                id={`${this.staticKeyHasInventory}No`}
                value="No"
                filterKey={this.staticKeyHasInventory}
                handler={this.handleCheck}
                checked={this.isChecked(this.staticKeyHasInventory, 'No')}
              />
            </div>
          </Panel.Body>
        </Panel>
        { this.props.retailer ?
          <Panel
            key={this.staticKeyIsApproved} defaultExpanded={this.isExpanded(this.staticKeyIsApproved)}
            eventKey={this.staticKeyIsApproved}
          >
            <Panel.Heading>
              <Panel.Title toggle>
                <div className={styles.section}>
                  <span>Is approved</span>
                  <span className={styles.clear + ' clear'} onClick={() => this.clearFilter(this.staticKeyIsApproved)}>
                  Clear
                  </span>
                </div>
                <span className="ic-dropdown" />
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible key={this.state.filterKeys[this.staticKeyIsApproved]}>
              <div className={styles.year}>
                <Checkbox
                  id={`${this.staticKeyIsApproved}Yes`}
                  value="Yes"
                  filterKey={this.staticKeyIsApproved}
                  handler={this.handleCheck}
                  checked={this.isChecked(this.staticKeyIsApproved, 'Yes')}
                />
                <Checkbox
                  id={`${this.staticKeyIsApproved}No`}
                  value="No"
                  filterKey={this.staticKeyIsApproved}
                  handler={this.handleCheck}
                  checked={this.isChecked(this.staticKeyIsApproved, 'No')}
                />
              </div>
            </Panel.Body>
          </Panel>
        : null }
      </Fragment>
    );
  }

  render() {  
    const { staticFilter } = this.props;

    let clear = (
      <div className={styles.clear}>
        <div onClick={() => this.clearFiltersAll()}>
          Clear all filters
          <span className={cn(styles['ic-close'] + ' ic-close')} />
        </div>
      </div>
    );
    
    return (
      <Fragment>
        <div className={styles.filter}>Filter {Object.keys(this.currentFilter).length !== 0?clear:null}</div>
        <PanelGroup id="accordion-assign" key={this.state.key}>
          { staticFilter ? this.staticFilter() : null }
          {
             Object.entries(this.props.filters).map((x) => {
              return (
                <Panel
                  key={x[0]} defaultExpanded={this.isExpanded(x[0])}
                  eventKey={x[0]}
                >
                  {this.filter(upperFirst(x[0]), x[0])}
                </Panel>
              );
            })
          }
        </PanelGroup>
      </Fragment>
    );
  }
}

export default ProductFilter;

ProductFilter.defaultProps = {
  staticFilter: false,
  retailer: false,
};

ProductFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.object.isRequired,
  staticFilter: PropTypes.bool,
  retailer: PropTypes.bool,
}; 
