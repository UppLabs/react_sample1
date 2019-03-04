import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import styles from './Cart.scss';
import Button from '../../common/Button';

var data = [{
	id: '1',
	supplier: 'supplier',
	preview: 'img',
	title: 'title',
	sku: 123,
	options: 'options',
	price: 556,
	quantity: 'quantity',
}];

class Cart extends PureComponent {
  
  onSubmit(e) {
    console.log('send');
    e.preventDefault();
  } 

  render() {
    const { sendOrder, cart } = this.props;

    return (
      <div className='container-fluid'>
        <div className={styles.cart}>
          <span>Cart</span>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.table}>
            <BootstrapTable
              data={data}
              printable
              striped
              hover
              scrollTop="Top"
              className={styles.container}
            >
              <TableHeaderColumn 
                isKey dataField="id"
                headerAlign="left" 
                hidden
              />
              <TableHeaderColumn  
                dataField="supplier"
                dataAlign="center"
              >
                  Supplier
              </TableHeaderColumn>
              <TableHeaderColumn 
                dataField="preview"
                dataAlign="center"
              >
                  Preview
              </TableHeaderColumn>
              <TableHeaderColumn 
                dataField="title"
                dataAlign="center"
              >
                  Title
              </TableHeaderColumn>
              <TableHeaderColumn 
                dataField="sku"
                dataAlign="center"
              >
                  SKU
              </TableHeaderColumn>
              <TableHeaderColumn 
                dataField="options"
                dataAlign="center"
              >
                  Options
              </TableHeaderColumn>
              <TableHeaderColumn 
                dataField="price"
                dataAlign="center"
              >
                  Price
              </TableHeaderColumn>
              <TableHeaderColumn 
                dataField="quantity"
                dataAlign="center"
              >
                  Quantity
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
          <div className={styles.store}>
            <div className={styles.select}>
              <p>Store: </p>
              <select className={styles.select_item}>
                <option value=''>Choose a store from the list</option>
                <option>sdvsd</option>
              </select>
            </div>
            <div className={styles.wrapper_form}>
              <div className={styles.switches}>
                    switches
              </div>
              <div className={styles.form}>
                <form onSubmit={this.onSubmit}>
                  inputs
                  <div className={styles.submit}>
                    <Button
                      color='green'
                      text='order'
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;

Cart.propTypes = {
  sendOrder: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};
