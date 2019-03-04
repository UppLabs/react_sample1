import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import cn from 'classname';
import ModalWindow from '../../common/Modal';
import Button from '../../common/Button';
import styles from './StoresModal.scss';
import SimpleInput from '../../common/SimpleInput';

 class StoresModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      open: this.props.open, 
      edit: [],
      erpid: {},
      stores: this.props.stores,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.open != nextProps.open) {
      return {
        open: nextProps.open,
      };
    }

    return null;
  }

  saveModal = () => {
    this.props.onClose();
  }

  editItem = (row) => {
    const { id } = row;
    const { edit, erpid } = this.state;

    if(edit.includes(id)) {
      this.setState({
        edit: edit.filter(x => x !== id),
      });
    } else {
      this.setState({
        edit: [
          ...edit,
          id,
        ],
        erpid: {
          ...erpid,
          [id]: row.supplier_stores ? row.supplier_stores[0].erp_id : null,
        },
      });
    }
  }

  saveErpId = (row) => {
    this.setState({
      stores: this.state.stores.map((value) => {
        if(value.supplier_stores && value.id === row.id) {
          value.supplier_stores[0].erp_id = this.state.erpid[row.id];
        }
        return value;
      }),
    });
    const data = {
      erp_id: this.state.erpid[row.id],
    };

    this.props.saveErpId(data, this.props.id, row.id);
    this.editItem(row);
  }

  erpIdFormatter = (cell, row) => {
    const { edit, erpid } = this.state;

    return (edit.includes(row.id) 
    ? <SimpleInput
      name={row.id}
      value={erpid[row.id]} onChange={(event) => {
      this.setState({
        erpid: {
          ...erpid,
          [event.target.name]: event.target.value,
        },
      });
    }}
    /> : row.supplier_stores ? row.supplier_stores[0].erp_id : null);
  };

  iconFormatter = (cell, row) => {
    const { edit } = this.state;

    return (edit.includes(row.id)
    ? <span className={cn(styles.icon, 'ic-save')} onClick={() => this.saveErpId(row)} />
    : <span className={cn(styles.icon, 'ic-edit')} onClick={() => this.editItem(row)} />
    );
  };

  render() {
    const { onClose, name } = this.props;
    const { open } = this.state;
    const { stores } = this.state;

    return (
      <ModalWindow
        open={open} onClose={onClose}
        center
      >
        <h2>{name} Stores</h2>
        <hr />
        <div className={styles.body}>
          <div className={styles.table}>
            <BootstrapTable
              data={stores}
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
                headerAlign="center"
                dataAlign="center"
                dataFormat={this.erpIdFormatter}
              >
                ERP ID
              </TableHeaderColumn>
              <TableHeaderColumn
                headerAlign="center"
                dataAlign="center"
                dataFormat={this.iconFormatter}
              />
            </BootstrapTable>
          </div>
        </div>
        <hr />
        <div className={styles.footer}>
          <div className={styles.info}>
            <span className="ic-warning" />
            <span>Can&#39;t save a store without ERP ID</span>
          </div>
          <div className={styles.buttons}>
            <Button
              color="white" text="CANCEL"
              onClick={onClose}
            />
            <Button
              color="green" text="OK"
              onClick={this.saveModal}
            />
          </div>
        </div>
      </ModalWindow> 
    );
  }
}

export default StoresModal;

StoresModal.defaultProps = {
  open: false,
};

StoresModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  stores: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  saveErpId: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};


