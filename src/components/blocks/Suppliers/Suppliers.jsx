/* eslint-disable global-require */
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import cn from 'classname';
import OverlayScrollbars from 'overlayscrollbars';
import PropTypes from 'prop-types';
import {
  PRODUCTS_RETURNED,
  MONEY_PARTIALLY_RETURNED,
} from '../../../constants/retailerStatus';
import '../../../../node_modules/overlayscrollbars/css/OverlayScrollbars.css';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import styles from './Suppliers.scss';

function statusFormatter(cell, row) {
  let currentClass = styles.returned;

  switch (row.status) {
    case PRODUCTS_RETURNED:
      currentClass = styles.returned;
      break;
    case MONEY_PARTIALLY_RETURNED:
      currentClass = styles.partialReturned;
      break;
  }

  return (
    <button className={cn(currentClass, styles.status)}>{row.status}</button>
  );
}

function productFormatter(cell, row) {
  return (
    <div>
      <img
        alt=""
        width="40"
        style={{ marginRight: '15px' }}
        src={require('../../../images/Card.png')}
      />
      {`${cell}`}
    </div>
  );
}

function getCaret(direction) {
  if (direction === 'asc') {
    return <span className={cn(styles['ic-sort'], 'ic-sort')} />;
  }
  if (direction === 'desc') {
    return (
      <span className={cn(styles['ic-sort'], 'ic-sort', styles.down, 'down')} />
    );
  }
  return <span className={cn(styles['ic-sort'], 'ic-sort')} />;
}

class Suppliers extends Component {
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

  render() {
    // const { products } = this.props;
    // const formattedProducts = products.map((item) => {
    //   console.log(item);
    // });
      const products = [
      {
        id: 1,
        retailers: 1,
        type: 'Dropship ',
        date: '08.30.2018',
        products: 'sdvsdwefwefvsdv',
        total: '345',
        order: '38',
        status: 'Products returned',
      },
      {
        id: 2,
        retailers: 'Sacks Fifth Avenue',
        type: 'Dropship ',
        date: '02.30.2018',
        products: 'wef',
        total: '345',
        order: '90',
        status: 'Products returned',
      },
      {
        id: 3,
        retailers: 'Sacks Fifth Avenue ',
        type: 'Dropship ',
        date: '02.30.2018',
        products: 'wefwef',
        total: '345',
        order: '4',
        status: 'Products returned',
      },
      {
        id: 4,
        retailers: 'Sacks Fifth Avenue ',
        type: 'Dropship ',
        date: '04.30.2018',
        products: 'dfb',
        total: '345',
        order: '56',
        status: 'Products returned',
      },
      {
        id: 5,
        retailers: 'Sacks Fifth Avenue ',
        type: 'Dropship ',
        date: '03.30.2018',
        products: 'fgn',
        total: '345',
        order: '87',
        status: 'Products returned',
      },
      {
        id: 6,
        retailers: 'Sacks Fifth Avenue ',
        type: 'Dropship ',
        date: '02.30.2018',
        products: 'ty',
        total: '345',
        order: '5',
        status: 'Products returned',
      },
      {
        id: 7,
        retailers: 'Sacks Fifth Avenue ',
        type: 'Dropship ',
        date: '09.30.2018',
        products: 'tynm',
        total: '345',
        order: '38',
        status: 'Products returned',
      },
      {
        id: 8,
        retailers: 'Sacks Fifth Avenue ',
        type: 'Dropship ',
        date: '06.30.2018',
        products: 'gh',
        total: '345',
        order: '43',
        status: 'Money partially returned',
      },
    ];

    const { expandableRow, expandComponent, height, options } = this.props;
    const newOptions = { ...options, expandBodyClass: styles.expandRow };
    return products.length > 0 ? (
      <BootstrapTable
        data={products}
        printable
        striped
        hover
        height={height || 'auto'}
        scrollTop="Top"
        expandableRow={expandableRow}
        expandComponent={expandComponent}
        options={newOptions}
      >
        <TableHeaderColumn 
          isKey dataField="id"
          headerAlign="left" 
          hidden 
        />
        <TableHeaderColumn
          dataField="retailers"
          headerAlign="left"
          width="30%"
          dataFormat={productFormatter}
        >
          Supplier
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="date"
          headerAlign="center"
          dataAlign="center"
          dataSort
          caretRender={getCaret}
        >
          Date
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="products"
          headerAlign="center"
          dataAlign="center"
        >
          Products
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="total"
          headerAlign="center"
          dataAlign="center"
        >
          Cost
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="order"
          headerAlign="center"
          dataAlign="center"
        >
          Order #
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="status"
          headerAlign="center"
          dataAlign="center"
          dataFormat={statusFormatter}
          expandable={false}
          width="17%"
        >
          Status
        </TableHeaderColumn>
      </BootstrapTable>
    ) : <div>There is no data to display</div>;
  }
}

export default Suppliers;

Suppliers.defaultProps = {
  scroll: false,
  expandableRow: false,
  expandComponent: null,
  height: 0,
  options: {},
};

Suppliers.propTypes = {
  scroll: PropTypes.bool,
  expandableRow: PropTypes.bool,
  expandComponent: PropTypes.element,
  height: PropTypes.number,
  options: PropTypes.object,
};
