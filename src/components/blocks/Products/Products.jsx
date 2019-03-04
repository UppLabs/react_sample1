import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../../common/ProductCard';
import WrapperColumnRetailers from '../../../components/grid-container/WrapperColumnRetailers';
import ThemeRetailer from '../../../components/theme/ThemeRetailer';

const Products = ( { products, checked, pageCount, handlePageClick, onCheckProduct, modal }) => {
  return (            
    <WrapperColumnRetailers pageCount={pageCount} handlePageClick={handlePageClick}>
      {products && products.map(item =>(
        <Fragment key={item.model}>
          <ThemeRetailer>
            <ProductCard
              product={item}
              onCheck={onCheckProduct}
              checked={checked}
              checkbox
              modal={modal}
            />
          </ThemeRetailer>
        </Fragment>
          ))}
    </WrapperColumnRetailers>
  );
};
export default Products;

Products.defaultProps = {
  checked: false,
  modal: false,
};

Products.propTypes = {
    checked: PropTypes.bool,
    products: PropTypes.array.isRequired,
    pageCount: PropTypes.number.isRequired,
    handlePageClick: PropTypes.func.isRequired,
    onCheckProduct: PropTypes.func.isRequired,
    modal: PropTypes.bool,
};
