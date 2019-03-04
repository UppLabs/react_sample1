import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import styles from './Brands.scss';
import WrapperColumnBrandReplenish from '../../grid-container/WrapperColumnBrandReplenish';

// <InfiniteScroll
    //     pageStart={0}
    //     loadMore={() => this.loadFunc()}
    //     threshold={-20}
    //     hasMore={true || false}
    //     loader={<div className={styles.loader} key={0}><span>Loading ...</span></div>}
    //   >
        // <WrapperColumnBrandReplenish>
        //   {
        //     brands.map(function(item, i) {
        //       return (
        //         <div key={i} className='product_brand'>
        //           <div className={styles.brand}>
        //             {item.name}
        //             <img alt='' src={item.img} />
        //           </div>
        //         </div>
        //         );
        //     })
        //   }
      //   </WrapperColumnBrandReplenish>
      // </InfiniteScroll>

class Brands extends Component {
  componentDidMount() {
  }

  loadFunc() {
    this.props.loadingBrands();
  }

  handleSwitch(name, img) {
    this.props.filterName(name, img);
  }

  render() {
    const { brands, filterName } = this.props;
    console.log(brands);
    return (
      <WrapperColumnBrandReplenish>
        {
            brands.map(function(item, i) {
              return (
                <div
                  key={i} onClick={() => this.handleSwitch(item.supplier.name, item.supplier.small_logo_path)}
                  className='product_brand'
                >
                  <Link to='replenish/products'>
                    <div className={styles.brand}>
                      <img alt='' src={item.supplier.logo_path} />
                    </div>
                  </Link>
                </div>
                );
            }.bind(this))
          }
      </WrapperColumnBrandReplenish>
      );
  }
}

export default Brands;

Brands.defaultProps = {
  brands: [],
};

Brands.propTypes = {
  brands: PropTypes.array,
  loadingBrands: PropTypes.func.isRequired,
  filterName: PropTypes.func.isRequired,
};
