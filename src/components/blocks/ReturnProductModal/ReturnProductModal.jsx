import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import cn from 'classname';
import ModalWindow from '../../common/Modal';
import Button from '../../common/Button';
import styles from './ReturnProductModal.scss';
import { InputNumber } from '../../../../node_modules/antd';
import { numberFormatter, currencyFormat } from '../../../utils/formatHelper';
import RadioGroup from '../../common/RadioGroup';
import Radio from '../../common/Radio';

 class ReturnProductModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      value: 'partial',
      values: {},
      form: {
        reason: '',
        ra: null,
      },
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

  handleSubmit = (event) => {
    event.preventDefault();

    const { postReturns } = this.props;
    const { form, value } = this.state;

    let fulfillments = [];

    if(value === 'all') {
      this.props.data.fulfillments.map((item) => {
        let lines = {
          id: item.id,
          order_id: item.order_id,
          return_lines: item.fulfillment_lines.map((line) => {
            return {
              quantity: line.quantity - (line.returned_items ? line.returned_items : 0),
              fulfillment_line_id: line.id,
            };
          }),
        };

        fulfillments.push(lines);
      });
    } else {
      for(let id in this.state.values) {
        const item = this.state.values[id];

        let lines = {
          id: +id,
          order_id: this.props.data.id,
          return_lines:  Object.keys(item).map((key) => {
            return {
              quantity: +item[key],
              fulfillment_line_id: +key,
            };
          }),
        };

        fulfillments.push(lines);
      }
    }

    for(let item of fulfillments) {
      const data = {
        'reason': form.reason + (form.ra != null ? ` ${form.ra}` : ''),
        'return_lines': item.return_lines,
      };

      postReturns(data, item.order_id, item.id);
    }

    this.props.onClose();
  }

  handleChangeType = (value) => {
    this.setState({
      value,
    });
  }

  handleChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleChangeQuantity = (fulfillment_id, id, value) => {
    this.setState({
      values: {
        ...this.state.values,
        [fulfillment_id]: {
          ...this.state.values[fulfillment_id],
          [id]: value,
        },
      },
    });
  }

  returnNow = (cell, row) => {
    const itemValue = this.state.values[row.fulfillment_id] ? this.state.values[row.fulfillment_id][row.id] : null;
    const max = row.quantity - (row.returned_items ? row.returned_items : 0);

    return  (<InputNumber
      min={0}
      max={max}
      style={{ width: 80 }}
      value={itemValue ?  itemValue : 0}
      onChange={value => this.handleChangeQuantity(row.fulfillment_id, row.id, value)}
      formatter={numberFormatter}
    />);
  }

  lines = () => {
    let lines = [];

    for(let line of this.props.data.fulfillments) {
      lines = [
        ...lines,
        ...line.fulfillment_lines,
      ];
    }

    return lines;
  }

  warning = <span key="warning" className={cn(styles.warning, 'ic-warning')} />;
  

  render() {
      const { onClose, open, data } = this.props;

      return (
        <ModalWindow
          open={open} onClose={onClose}
        >
          <form onSubmit={this.handleSubmit}>
            <h2>Approve a return</h2>
            <hr />
            <div className={styles.body}>
              <div className={styles.details}>
                <h3 className={styles.title}>Order details:</h3>
                <div>
                  <dl>
                    <dt>ID:</dt>
                    <dd>{data.retailer_order_id}</dd>
                    <dt>Date:</dt>
                    <dd>{(new Date(data.created_at)).toLocaleDateString()}</dd>
                  </dl>
                  <dl>
                    <dt>Retailer/Channel:</dt>
                    <dd>{data.retailer.name}</dd>
                    <dt>Type:</dt>
                    <dd>{data.type}</dd>
                  </dl>
                  <dl>
                    <dt>Value:</dt>
                    <dd>
                      {currencyFormat(data.items_total_value)} 
                      {data.returned_items_total_value > 0 
                        ? [
                          <span key="total">
                            {` ( ${currencyFormat(data.items_total_value - data.returned_items_total_value)} `}
                          </span>,
                          this.warning,
                          <span key="bracket"> )</span>,
                          ]
                        : '' }
                    </dd>
                    <dt>Number of Units / Cases:</dt>
                    <dd>
                      {data.items_total_quantity} 
                      {data.returned_items_total_quantity > 0 
                        ? [
                          <span key="quantity"> 
                            {` ( ${data.items_total_quantity - data.returned_items_total_quantity} `}
                          </span>, 
                          this.warning, 
                          <span key="bracket"> )</span>,
                        ] 
                        : '' }
                    </dd>
                    <dt>Shipping & Handling:</dt>
                    <dd>{currencyFormat(data.shipping_paid)}</dd>
                  </dl>
                </div>
              </div>
              <hr /> 
              <div className={styles.switcher}>
                <RadioGroup 
                  name={`order ${data.id}`} selectedValue={this.state.value} 
                  onChange={this.handleChangeType} row
                >
                  <Radio
                    id={`all${data.id}`} value="all"
                    label="Full return"
                  />
                  <Radio
                    id={`partial${data.id}`} value="partial"
                    label="Partial return"
                  />
                </RadioGroup>
              </div>
              {      
                data.fulfillments.length  > 0 && this.state.value === 'partial' ?
                  <BootstrapTable
                    data={this.lines()}
                    printable
                    striped
                    hover
                    height="auto"
                    scrollTop="Top"
                    tableHeaderClass={styles.header}
                  >
                    <TableHeaderColumn 
                      isKey dataField="id"
                      headerAlign="left" 
                      hidden
                    />
                    <TableHeaderColumn
                      headerAlign="center"
                      dataAlign="center"
                      dataFormat={(cell, row) => row.variant.title}
                    >
                    Title
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      headerAlign="center"
                      dataAlign="center"
                      dataFormat={(cell, row) => row.variant.sku}
                    >
                    SKU
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="id"
                      headerAlign="center"
                      dataAlign="center"
                      dataFormat={
                        (cell, row) => data.fulfillments.find(x => x.id === row.fulfillment_id).warehouse.name
                      }
                    >
                    Warehouse
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="quantity"
                      headerAlign="center"
                      dataAlign="center"
                    >
                    Ordered
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      headerAlign="center"
                      dataAlign="center"
                      dataFormat={(cell, row) => row.returned_items ? row.returned_items : 0}
                    >
                    Returned
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="id"
                      headerAlign="center"
                      dataAlign="center"
                      dataFormat={this.returnNow}
                      width="80px"
                    >
                    Return now
                    </TableHeaderColumn>
                  </BootstrapTable>
                : null }
              <div className={styles.form}>
                <label htmlFor="reason">
                  <span>Return reason</span>
                  <textarea
                    onChange={this.handleChange}
                    name="reason" type="text"
                    placeholder="Please add reason for this cancellation"
                  />
                </label>
                <label htmlFor="ra">
                  <span>RA# (optional)</span>
                  <input
                    onChange={this.handleChange}
                    name="re" type="text"
                  />
                </label>
              </div>
              <div className={styles.info}>
                <span className="ic-info" />
                <span>
                  Note: this process can not be undone
                </span>
              </div>
            </div>
            <div className={styles.footer}>
              <Button
                color="white" text="CANCEL"
                onClick={onClose}
              />
              <Button
                type="submit"
                color="green" text="OK"
              />
            </div>    
          </form>       
        </ModalWindow> 
      );
  }
}

export default ReturnProductModal;

ReturnProductModal.defaultProps = {
  open: false,
};

ReturnProductModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  postReturns: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fulfillments: PropTypes.array.isRequired,
  }).isRequired,
};


