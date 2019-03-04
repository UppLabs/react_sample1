import React, { Component } from 'react';
import styles from './Dropship.scss';
import Hero from '../../../components/common/Hero';

class Dropship extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
  
    const divStyle = {
      backgroundImage: 'url('+ require('../../../images/dropship-hero.jpg')+')',
    };
    
    return (
      <div className={styles['dropship']}>
        <Hero divStyle={divStyle} >
          <h1>Approve products for dropshipping</h1>
          <a href="#" className="btn btn-white-bordered">Approve 50 unapproved products</a>
        </Hero>
      </div>
     
    );
  }
}

export default Dropship;
