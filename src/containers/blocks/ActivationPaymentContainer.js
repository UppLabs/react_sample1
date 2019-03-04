import React, { PureComponent, Fragment } from 'react';
import ActivationPayment from '../../components/blocks/ActivationPayment';
import Toolbar from '../../components/common/Toolbar';

class ActivationPaymentContainer extends PureComponent {
   render() {
      return (
        <Fragment>
          <Toolbar name="Payment" />
          <ActivationPayment />
        </Fragment>
      );
   }
}

export default ActivationPaymentContainer;