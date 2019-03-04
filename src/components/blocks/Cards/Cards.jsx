import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classname';
import Card from '../../common/Card';
import styles from './Cards.scss';
import Pagination from '../../common/Pagination';

const Cards = ({ retailers, count, perPage, setPage, offset }) => {
  const pageCount = Math.ceil(count / perPage);
  const handlePageClick = (data) => {
    const offset = perPage * data.selected;
    setPage(offset);
  };

  const isSetHeight = value => perPage === value && count >= value;

  const heightClass = () => {
    if(isSetHeight(10)) return styles.perPage10;
    if(isSetHeight(20)) return styles.perPage20;

    return '';
  };

  return (
    <div className={styles.cards}>
      <div className={cn('row', 'vertical-indent', heightClass())}>
        {retailers && retailers.map((item) => {
          return <Card key={item.retailer.name} retailer={item.retailer} />;
        })}
      </div>
      {
        pageCount === 1 || pageCount === 0 ? 
          null :
          <Pagination 
            offset={offset} 
            pageCount={pageCount} 
            handlePageClick={handlePageClick} 
            currentPage={offset/perPage}
          />
      }
    </div>
  );
};

export default Cards;

Cards.propTypes = {
  count: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  retailers: PropTypes.array.isRequired,
  offset: PropTypes.number.isRequired,
};
