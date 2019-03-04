/* eslint-disable global-require */
import React, { Component, Fragment } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import cn from 'classname';
import PropTypes from 'prop-types';
import OverlayScrollbars from 'overlayscrollbars';
import '../../../../node_modules/overlayscrollbars/css/OverlayScrollbars.css';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import styles from './OrdersTable.scss';
import { CANCELED, COMPLETED } from '../../../constants/retailerStatus';
import { currencyFormat } from '../../../utils/formatHelper';
import Pagination from '../../common/Pagination';

function statusFormatter(cell, row) {
  let currentClass = styles.returned;
  let status = '';

  switch (row.processing_state) {
    case CANCELED:
      currentClass = styles.canceled;
      status = 'CANCELED';
      break;
    case COMPLETED:
      currentClass = styles.completed;
      status = 'COMPLETED';
      break;
    default: 
      currentClass = styles.processing;
      status = 'PROCESSING';
      break;
  }

  return (
    <div className={cn(currentClass, styles.status)}>{status}</div>
  );
}

const dateFormatter = (cell) => {
  return (new Date(cell).toLocaleDateString());
};

class OrdersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    if (this.props.scroll) {
      OverlayScrollbars(
        document.querySelectorAll('.react-bs-container-body')[0],
        {
          sizeAutoCapable: true,
          paddingAbsolute: true,
          className: 'os-theme-dark',
        },
      );
    }
  }

  onSort = (event) => {
    if (this.props.sort === 'asc') {
      this.props.setSort('desc');
    } else {
      this.props.setSort('asc');
    }
  }

  getCustomFilter(filterHandler, options) {
    return (
      <div className={styles.search_filter}>
        <span>Order #</span>
        <div className={styles.search}>
          <span className={cn('ic-search')} />
          <input
            text={options.input} onChange={(event) => {
            var value = event.target.value;
            this.props.filterById(value);
            if (value === '') {
              filterHandler('');
            }
          }}
          />
        </div>
      </div>
    );
  }

  getTotalValue = (cell, row) => {
    return currencyFormat(cell);
  };

  handlePageClick = (data) => {
    const offset = this.props.perPage * data.selected;
    this.props.setPage(offset);
  };

  render() {
    const {
      data, 
      height, 
      offset, 
      perPage, 
      count,
      sort, 
      statusCount,
    } = this.props;

    var currentCount = statusCount === 0 ? count : statusCount;
    
    const pageCount = Math.ceil(currentCount / perPage);

    return (
      <Fragment>
        <BootstrapTable
          data={data}
          printable
          striped
          hover
          height={height || 'auto'}
          scrollTop="Top"
          className={styles.container}
          // pagination
        >
          <TableHeaderColumn 
            isKey dataField="id"
            headerAlign="left" 
            hidden
          />
          <TableHeaderColumn
            headerAlign="left"
            width="15%"
            dataFormat={(cell, row) => row.store ? row.store.name : ''}
          >
          Store Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="retailer_order_id"
            headerAlign="center"
            dataAlign="center"
            filter={{ type: 'CustomFilter', getElement: this.getCustomFilter.bind(this), 
              customFilterParameters: { input: '' } }}
            width="14%"
          />
          <TableHeaderColumn
            dataField="created_at"
            headerAlign="center"
            dataAlign="center"
            dataFormat={dateFormatter}
          >
          Date
            <span 
              onClick={this.onSort}
              style={{ 'cursor': 'pointer' }}
              className={cn(styles['ic-sort'], sort === 'asc' ? styles.down : '', 'ic-sort')} 
            />
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="items_total_quantity"
            headerAlign="center"
            dataAlign="center"
          >
          Products
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="items_total_value"
            headerAlign="center"
            dataAlign="center"
            dataFormat={this.getTotalValue}
          >
          Value
          </TableHeaderColumn>
          <TableHeaderColumn
            key="status"
            dataField="processing_state"
            headerAlign="center"
            dataAlign="center"
            dataFormat={statusFormatter}
            width="10%"
          >
              Status
          </TableHeaderColumn>
        </BootstrapTable>
        {
          pageCount === 1 || pageCount === 0 ? null :
          <Pagination 
            offset={offset} 
            pageCount={pageCount} 
            handlePageClick={this.handlePageClick} 
            currentPage={offset/perPage}
          />
        }
      </Fragment>
    );
  }
}

export default OrdersTable;

OrdersTable.defaultProps = {
  scroll: false,
  expandableRow: null,
  expandComponent: null,
  height: '',
  returns: false,
  statusCount: 0,
  filterById: undefined,
};

OrdersTable.propTypes = {
  scroll: PropTypes.bool,
  height: PropTypes.string,
  setPage: PropTypes.func.isRequired,
  filterById: PropTypes.func,
  data: PropTypes.array.isRequired,
  offset: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  statusCount: PropTypes.number,
};



