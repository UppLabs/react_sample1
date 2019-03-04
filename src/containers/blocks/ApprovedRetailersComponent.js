import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toolbar from '../../components/common/Toolbar';
import Cards from '../../components/blocks/Cards';
import { getApprovedRetailers, setApprovedRetailersOffset } from '../../store/actions/approvedRetailers';
import Spinner from '../../components/common/Spinner';

class ApprovedRetailersContainer extends PureComponent {
  componentDidMount = () => {
    this.props.getAcceptedInvitationRetailers();
  };

  render() {
    return this.props.isLoading ? <Spinner /> : ( this.props.retailers.length > 0 ?
      <div>
        <Toolbar name="Approved retailers" />
        <Cards
          {...this.props}
        />
      </div>
    : null);
  }
}

const mapStateToProps = (state) => {
    const { data, count, perPage, isLoading, offset } = state.approvedRetailers;

    return {
      retailers: data,
      count,
      perPage,
      isLoading,
      offset,
    };
  };

  const mapDispatchToProps = dispatch => ({
    getAcceptedInvitationRetailers: () => dispatch(getApprovedRetailers()),
    setPage: offset => dispatch(setApprovedRetailersOffset(offset)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ApprovedRetailersContainer);

ApprovedRetailersContainer.propTypes = {
  retailers: PropTypes.array.isRequired,
  getAcceptedInvitationRetailers: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
