import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Retailer from '../../components/blocks/Retailer';
import Spinner from '../../components/common/Spinner';
import { putPermissions } from '../../store/actions/permissions';
import { postRetailerErpId } from '../../store/actions/retailer';

class RetailerContainer extends PureComponent {

  render() {
    const { 
        retailer,
        isLoading,
    } = this.props; 

    return isLoading ? <Spinner /> : ( Object.getOwnPropertyNames(retailer).length > 0 ?
      <Retailer {...this.props} />
     : null );
  }
}

const mapStateToProps = ({ retailer }) => {
  const { retailer: currentRetailer, retailer_id_in_source } = retailer.current;
  const { isLoading } = retailer;

  return {
    retailer: currentRetailer,
    retailer_id_in_source,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => (
  {
    putPermissions: (id, data) => dispatch(putPermissions(id, data)),
    saveErpId: (data, retailerId, id) => dispatch(postRetailerErpId(data, retailerId, id)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(
    RetailerContainer,
);


RetailerContainer.propTypes = {
    retailer: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};
