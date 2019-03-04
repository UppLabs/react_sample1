import React, { Component, Fragment } from 'react';
import cn from 'classname';
import SliderSlick from 'react-slick';
import '../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../node_modules/slick-carousel/slick/slick-theme.css';
import styles from './Slider.scss';

export default class Slider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dotsClass: 'slick-dots',
    };
    return (
      <Fragment>
        <div className={styles.wrapper_slider}>
          <SliderSlick {...settings}>
            <div className={styles.wrapper_slide}>
              <div className={styles.collection}>
                <h2 className={styles.title_first}>Winter is coming to Mellisa...</h2>
                <h2 className={styles.title_last}>Its time to stock up!</h2>
                <button>Replenish Holiday Collection</button>
              </div>
              <div className={styles.brand_logo}>
                <img alt='' src={require('../../../images/brands/mmm_white.png')} />
              </div>
              <img alt='' src={require('../../../images/slider/slide.png')} />
            </div>
            <div className={styles.wrapper_slide}>
              <div className={styles.collection}>
                <h2 className={styles.title_first}>Winter is coming to Mellisa...</h2>
                <h2 className={styles.title_last}>Its time to stock up!</h2>
                <button>Replenish Holiday Collection</button>
              </div>
              <div className={styles.brand_logo}>
                <img alt='' src={require('../../../images/brands/mmm_white.png')} />
              </div>
              <img alt='' src={require('../../../images/slider/slide.png')} />
            </div>
            <div className={styles.wrapper_slide}>
              <div className={styles.collection}>
                <h2 className={styles.title_first}>Winter is coming to Mellisa...</h2>
                <h2 className={styles.title_last}>Its time to stock up!</h2>
                <button>Replenish Holiday Collection</button>
              </div>
              <div className={styles.brand_logo}>
                <img alt='' src={require('../../../images/brands/mmm_white.png')} />
              </div>
              <img alt='' src={require('../../../images/slider/slide.png')} />
            </div>
          </SliderSlick>
        </div>
      </Fragment>
    );
  }
}