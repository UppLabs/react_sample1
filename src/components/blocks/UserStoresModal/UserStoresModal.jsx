import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ModalWindow from '../../common/Modal';
import Button from '../../common/Button';
import styles from './UserStoresModal.scss';
import Switch from '../../common/Switch';

 class UserStoresModal extends PureComponent {
  constructor(props) {
    super(props);

    let id = [];
    for(let value of this.props.users) {
      for(let i of value.user.user_stores) {
        if(i.store_id === this.props.storeId) {
          id.push(value.user.id);
        }
      }
    }

    this.defaultIds = id;

    this.state = { 
      open: this.props.open, 
      permissions: id,
      deletePermissions: [],
    };
  }

  toggleSwitch = (value, id) => {
    value ? this.setState({
      permissions: [
        ...this.state.permissions,
        id,
      ],
      deletePermissions: this.state.deletePermissions.filter(x => x !== id),
    }) : this.setState({
      permissions: this.state.permissions.filter(x => x !== id),
      deletePermissions: [
        ...this.state.deletePermissions,
        id,
      ],
    });
  }

  assign = (cell, row) => {
    const isSwitched = this.state.permissions.includes(row.user.id);
    return (<Switch 
      checked={isSwitched} 
      onSwitch={value => this.toggleSwitch(value, row.user.id)}
    />);
  }

  submit = () => {
    for(let id of this.state.permissions) {
      const data = {
        user_id: id,
      };

      this.props.submit(this.props.storeId, data);
    }

    for(let id of this.state.deletePermissions) {
      if(this.defaultIds.includes(id)) {
        this.props.deletePermissions(this.props.storeId, id);
      }
    }

    this.props.onClose();
  }

  render() {
    const { onClose, storeName, users } = this.props;
    const { open } = this.state;

    return (
      <ModalWindow
        open={open} onClose={onClose}
        center
      >
        <h2>Assign user for store: {storeName}</h2>
        <hr />
        <div className={styles.body}>
          <BootstrapTable
            data={users}
            printable
            striped
            hover
            scrollTop="Top"
            className={styles.container}
            maxHeight='400px'
          >
            <TableHeaderColumn
              isKey
              dataField="retailer_id"
              hidden
            />
            <TableHeaderColumn
              headerAlign="center"
              dataAlign="center"
              dataFormat={
                (cell, row) => (`${row.first_name ? row.first_name : ''} ${row.last_name ? row.last_name : ''}`)
              }
            >
                User Name
            </TableHeaderColumn>
            <TableHeaderColumn
              headerAlign="center"
              dataAlign="center"
              dataFormat={this.assign}
              columnClassName={styles.switch}
            >
                Assign to store
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <hr />
        <div className={styles.footer}>
          <Button
            color="white" text="CANCEL"
            onClick={onClose}
          />
          <Button
            type="submit"
            color="green" text="OK"
            onClick={this.submit}
          />
        </div>    
      </ModalWindow> 
    );
  }
}

export default UserStoresModal;

UserStoresModal.defaultProps = {
  open: false,
};

UserStoresModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  storeName: PropTypes.string.isRequired,
  storeId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  submit: PropTypes.func.isRequired,
  deletePermissions: PropTypes.func.isRequired,
};


