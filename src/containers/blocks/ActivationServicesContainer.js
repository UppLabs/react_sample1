import React, { PureComponent, Fragment } from 'react';
import Toolbar from '../../components/common/Toolbar';
import ActivationServices from '../../components/blocks/ActivationServices';

class ActivationServicesContainer extends PureComponent {
   render() {
      return (
        <Fragment>
          <Toolbar name="Services" />
          <ActivationServices />
        </Fragment>
      );
   }
}

export default ActivationServicesContainer;