import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toolbar from '../../components/common/Toolbar';
import Cards from '../../components/blocks/Cards';
import { 
  getAcceptedInvitationRetailers, 
  setAcceptedInvitationRetailersOffset, 
} from '../../store/actions/acceptedInvitationRetailers';
import Spinner from '../../components/common/Spinner';

class AcceptedInvitationRetailersContainer extends PureComponent {

  componentDidMount = () => {
    this.props.getAcceptedInvitationRetailers();
  };

  render() {
    return this.props.isLoading ? <Spinner /> : ( this.props.retailers.length > 0 ?
      <div>
        <Toolbar name="Accepted invitation and requires your approval" />
        <Cards
          {...this.props}
        />
      </div>
    : null);
  }
}

const mapStateToProps = (state) => {
    const { data, count, perPage, isLoading, offset } = state.acceptedInvitationRetailers;
    return {
      retailers: data,
      count,
      perPage,
      isLoading,
      offset,
    };
  };

  const mapDispatchToProps = dispatch => ({
    getAcceptedInvitationRetailers: () => dispatch(getAcceptedInvitationRetailers()),
    setPage: offset => dispatch(setAcceptedInvitationRetailersOffset(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedInvitationRetailersContainer);

AcceptedInvitationRetailersContainer.propTypes = {
  retailers: PropTypes.array.isRequired,
  getAcceptedInvitationRetailers: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
