import cn from 'classname';
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Card.scss';
import { datediff, parseDate, formatter } from '../../../utils/dateHelper';

const Card  = ({ retailer, history }) => {
  const goToApprovalRetailer = (event, id) => {
    if (event.target.tagName === 'A') {
      return false;
    } else {
      history.push('/retailer/'+ id);
    }
  };
  
  return (
    <div
      onClick={(event) => {goToApprovalRetailer(event, retailer.id);}}
      className='column'
    >
      <div className={cn(styles.shadow, styles.card)}>
        <div className={styles.logo}>
          <img alt="" src={retailer.square_logo_path} />
          <p>{retailer.name}</p>
        </div>
        <div className={styles.desc}>
          <p>
            {`Request approval ${
              datediff( 
                parseDate(formatter.format(new Date(retailer.created_at))),
                parseDate(formatter.format(new Date())),
            )} days ago`} 
          </p>
          <p>
            <Link target="_blank" to={`//${retailer.website}`} >{retailer.website}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Card);

Card.propTypes = {
  retailer: PropTypes.shape({
    square_logo_path: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};