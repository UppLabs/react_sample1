import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import styles from './StoresTable.scss';
import { formatMany } from '../../../utils/formatHelper';

class StoresTable extends PureComponent {

  userFormatter = (cell, row) => {
    return (
      <div className={styles.users} onClick={() => this.props.openModal(row.name, row.id)}>
        {row.user_stores.length > 0
        ? <span>{`${row.user_stores.length} ${formatMany(row.user_stores.length , 'user')}`}</span> 
        : null}
        <span className="ic-edit" />
      </div>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <BootstrapTable
          data={data}
          printable
          striped
          hover
          scrollTop="Top"
          className={styles.container}
          maxHeight='400px'
        >
          <TableHeaderColumn
            isKey
            dataField="id"
            hidden
          />
          <TableHeaderColumn
            dataField="name"
            headerAlign="center"
            dataAlign="center"
          >
                Store Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="address1"
            headerAlign="center"
            dataAlign="center"
          >
                Address
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="city"
            headerAlign="center"
            dataAlign="center"
          >
                City
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="country"
            headerAlign="center"
            dataAlign="center"
          >
                Country
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="zip_code"
            headerAlign="center"
            dataAlign="center"
          >
                ZIP Code
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="sku"
            headerAlign="center"
            dataAlign="center"
            dataFormat={this.userFormatter}
          >
                Users
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default StoresTable;

StoresTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
};
