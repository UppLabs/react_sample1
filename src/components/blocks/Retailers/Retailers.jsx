/* eslint-disable global-require */
import React, { Component, Fragment } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import cn from 'classname';
import PropTypes from 'prop-types';
import OverlayScrollbars from 'overlayscrollbars';
import '../../../../node_modules/overlayscrollbars/css/OverlayScrollbars.css';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import styles from './Retailers.scss';
import { CANCELED, COMPLETED } from '../../../constants/retailerStatus';
import { currencyFormat } from '../../../utils/formatHelper';
import Button from '../../common/Button';
import ReturnProductModal from '../ReturnProductModal';
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

function productFormatter(cell, row) {
  return (
    <div>
      <img
        alt=""
        width="40"
        style={{ marginRight: '15px' }}
        src={row.retailer_logo}
      />
      {`${cell}`}
    </div>
  );
}

const dateFormatter = (cell) => {
  return (new Date(cell).toLocaleDateString());
};

class Retailers extends Component {
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
      this.props.setSortAscOrDesc('desc');
    } else {
      this.props.setSortAscOrDesc('asc');
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
    return (
      <div>
        <span className={row.returned_items_total_value > 0 ? styles.cross : ''}>{currencyFormat(cell)}</span>
        {
          row.returned_items_total_value > 0 
          ? <span>{currencyFormat(cell - row.returned_items_total_value)}</span> 
          : null
        }
      </div>
    ); 
  };

  sizePerPageListChange(sizePerPage) {
    alert(`sizePerPage: ${sizePerPage}`);
  }

  productsFormatter = (cell, row) => {
    return (
      <div>
        <span className={row.returned_items_total_quantity > 0 ? styles.cross : ''}>{row.items_total_quantity}</span>
        <span>{row.items_total_quantity - row.returned_items_total_quantity}</span>
      </div>
    );
  }



  modalOpen = (id) => {
    this.props.getOrder(id),
    this.setState({
      open: true,
    });
  };
  
  modalClose = () => {
    this.setState({
      open: false,
    });
  }

  handlePageClick = (data) => {
    const offset = this.props.perPage * data.selected;
    this.props.setPage(offset);
  };

  returnButton = (cell, row) => {
    return (
      <Button 
        text={row.items_total_quantity === row.returned_items_total_quantity ? 'RETURNED' : 'RETURN'} 
        onClick={() => this.modalOpen(row.id)} 
        disabled={row.items_total_quantity === row.returned_items_total_quantity} 
      />
    );
  }

  render() {
    const { data, postReturns, order } = this.props;
    const { 
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
        { order.id && this.state.open ? <ReturnProductModal
          open={this.state.open} 
          onClose={this.modalClose}
          data={order}
          postReturns={postReturns}
        /> : null }
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
            dataField="retailer_name"
            headerAlign="left"
            width="15%"
            dataFormat={productFormatter}
          >
          Retailer
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="type"
            headerAlign="center"
            dataAlign="center"
          >
          Type
          </TableHeaderColumn>
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
            dataFormat={this.productsFormatter}
          >
          Products
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="items_total_value"
            headerAlign="center"
            dataAlign="center"
            dataFormat={this.getTotalValue}
          >
          Total value
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
            key="status"
            dataField="processing_state"
            headerAlign="center"
            dataAlign="center"
            dataFormat={statusFormatter}
            width="10%"
          >
              Status
          </TableHeaderColumn>
          <TableHeaderColumn
            key="return"
            headerAlign="center"
            dataAlign="center"
            dataFormat={this.returnButton}
            expandable={false}
            width="10%"
          >
              Return
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

export default Retailers;

Retailers.defaultProps = {
  scroll: false,
  expandableRow: null,
  expandComponent: null,
  height: '',
  returns: false,
  statusCount: 0,
  filterById: undefined,
};

Retailers.propTypes = {
  scroll: PropTypes.bool,
  height: PropTypes.string,
  postReturns: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  setPage: PropTypes.func.isRequired,
  filterById: PropTypes.func,
  data: PropTypes.array.isRequired,
  getOrder: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setSortAscOrDesc: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  statusCount: PropTypes.number,
};



