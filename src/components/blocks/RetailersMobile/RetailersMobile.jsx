/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import { Panel, PanelGroup } from 'react-bootstrap';
import styles from './RetailersMobile.scss';
import { currencyFormat } from '../../../utils/formatHelper';
import { CANCELED, COMPLETED } from '../../../constants/retailerStatus';

function statusFormatter(processing_state) {
  let currentClass = styles.returned;
  let status = '';

  switch (processing_state) {
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

const RetailersMobile = ( { orders }) => {
    return (
      <PanelGroup accordion id="accordion-example">
        {
        orders && orders.map((item, i) => {
          return (
            <Panel key={item.id} eventKey={i}>
              <Panel.Heading>
                <Panel.Title toggle>
                  <img 
                    className={styles.logo}
                    alt='' 
                    src={require('./../../../images/Card.png')}
                  /><span>{item['retailer.name']}</span> 
                  <img 
                    className='arrow' 
                    alt='' 
                    src={require('./../../../images/arrow_back.png')}
                  />
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <div className={styles.table_data}>
                  <div className={styles.body_panel}>
                    <div>
                      <div>
                        <span className={styles.title}>Order#:</span>
                        <span>{item.retailer_order_id}</span>
                      </div>
                      <div>
                        <span className={styles.title}>Type:</span>
                        <span>{item.type}</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span className={styles.title}>Date#:</span>
                        <span>{item.created_at}</span>
                      </div>
                      <div>
                        <span className={styles.title}>Products:</span>
                        <span>{item.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.total_value}>
                    <span className={styles.title}>Total value:</span>
                    <span>{currencyFormat(item.items_total_value)}</span>
                  </div>
                  {statusFormatter(item.processing_state)}
                </div>
              </Panel.Body>
            </Panel>
          );
        })
      }
      </PanelGroup>
    );
};

export default RetailersMobile;

RetailersMobile.defaultProps = {
  orders: null,
};

RetailersMobile.propTypes = {
  orders: PropTypes.array,
};