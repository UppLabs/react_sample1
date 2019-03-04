import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import cn from 'classname';
import ModalWindow from '../../common/Modal';
import Button from '../../common/Button';
import styles from './ApproveSizesModal.scss';
import { currencyFormat } from '../../../utils/formatHelper';
import Switch from '../../common/Switch';

 class ApproveSizesModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      open: this.props.open, 
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.open != nextProps.open) {
      return {
        open: nextProps.open,
        editPlatform: false,
      };
    }

    return null;
  }

  getSortCaret = (direction) => {
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

  toggleSwitchAll = (value) => {
    if(this.props.productDetails.variants) {
      let variants = [];

      for(let value of this.props.productDetails.variants) {
        variants.push(value.id);
      }
  
      value ? this.props.approve(variants) : this.props.unapprove(variants);
    }
  }

  toggleSwitch = (value, id) => {
    value ? this.props.approve([id]) : this.props.unapprove([id]);
  }

  productItem = () => {
    const { product } = this.props;
    return (
      <div className={styles.product}>
        <div>
          <div className={styles.img_block}>
            <img alt="" src={product.images[0]} />
          </div>
          <div className={styles.desc}>
            <p className={styles.pt}>{product.title}</p>
            <p className={styles.price}>
              <span>
                <strong>MSRP: </strong>
                {product.retail_price_max !== product.retail_price_min ? 
                `${currencyFormat(product.retail_price_max)} - ` +
                `${currencyFormat(product.retail_price_min)}` 
                : currencyFormat(product.retail_price_max)}
              </span>
              <span>
                <strong>WSP: </strong>
                {product.wholesale_price_max !== product.wholesale_price_min ? 
                `${currencyFormat(product.wholesale_price_max)} - ` +
                `${currencyFormat(product.wholesale_price_min)}` 
                : currencyFormat(product.wholesale_price_max)}
              </span>
            </p>
          </div>
          <div className={styles.details}>
            <p>{product.available_inventory} units - {product.variants.length} variants</p>
            <p>Assigned to {product.retailers_count} retailers</p>
            <p>SKU: {product.model}</p>
          </div>
        </div>
      </div>
    );
  }

  statusFormat = (cell, row) => {
    return <Switch checked={this.isSwitched(row.id)} onSwitch={value => this.toggleSwitch(value, row.id)} />;
  }

  sizeFormat = (cell, row) => {
    return <span>{row.options.size}</span>;
  }

  colorFormat = (cell, row) => {
    return (row.options.color);
  }

  sizeSortFunc = (a, b, order) => {
    if (order === 'desc') {
      return a.options.size - b.options.size;
    } else {
      return b.options.size - a.options.size;
    }
  }

  colorSortFunc = (a, b, order) => {
    if (order === 'desc') {
      return a.options.color - b.options.color;
    } else {
      return b.options.color - a.options.color;
    }
  }

  isSwitchedAll = () => {
    if(this.props.productDetails.variants) {
      for(let value of this.props.productDetails.variants) {
        if(!(this.props.approved.indexOf(value.id) > -1))
          return false;
      }
      return true;
    }

    return false;
  }

  isSwitched = (id) => {
    return this.props.approved.indexOf(id) > -1 ? true : false;
  }

  saveModal = () => {
    this.props.saveVariants();
    this.props.onClose();
  }

  render() {
    const { onClose, productDetails, reset, approved } = this.props;
    const { open } = this.state;

    return (
      <ModalWindow
        open={open} onClose={onClose}
      >
        <h2>Approve variants</h2>
        <hr />
        <div className={styles.body}>
          {this.productItem()}
          <div className={styles.table}>
            <BootstrapTable
              data={productDetails.variants}
              printable
              striped
              hover
              scrollTop="Top"
              className={styles.container}
              height='400px'
            >
              <TableHeaderColumn 
                isKey dataField="id"
                headerAlign="left" 
                dataFormat={this.statusFormat}
                width="45px"
              >
                <Switch checked={this.isSwitchedAll()} onSwitch={this.toggleSwitchAll} />
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="options.size"
                headerAlign="center"
                dataAlign="center"
                dataSort
                sortFunc={this.sizeSortFunc}
                dataFormat={this.sizeFormat}
                caretRender={this.getSortCaret}
              >
                Size
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="options.color"
                headerAlign="center"
                dataAlign="center"
                dataSort
                caretRender={this.getSortCaret}
                dataFormat={this.colorFormat}
                sortFunc={this.colorSortFunc}
              >
                Color       
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="available_inventory"
                headerAlign="center"
                dataAlign="center"
              >
                Stock
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="retail_price"
                headerAlign="center"
                dataAlign="center"
                dataFormat={currencyFormat}
              >
                Price
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="sku"
                headerAlign="center"
                dataAlign="center"
              >
                SKU
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
        <hr />
        <div className={styles.footer}>
          <Button
            color="white" text="CANCEL"
            onClick={reset}
          />
          <Button
            color="green" text="SAVE"
            onClick={this.saveModal}
            disabled={!(approved.length > 0)}
          />
        </div>
      </ModalWindow> 
    );
  }
}

export default ApproveSizesModal;

ApproveSizesModal.defaultProps = {
  open: false,
};

ApproveSizesModal.propTypes = {
  approved: PropTypes.arrayOf(PropTypes.number).isRequired,
  product: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  productDetails: PropTypes.object.isRequired,
  approve: PropTypes.func.isRequired,
  unapprove: PropTypes.func.isRequired,
  saveVariants: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};


