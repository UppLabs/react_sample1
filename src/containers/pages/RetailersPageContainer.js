import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Panel from '../../components/common/Panel';
import DropDownFilter from '../../components/filters/DropDownFilter';
import { retailersFilter } from '../../constants/filters';
import SortOrderFilter from '../../components/filters/SortOrderFilter';
import Wall from '../../components/common/Wall';
import PageLayout from '../../components/common/PageLayout';
import AcceptedInvitationRetailersContainer from '../blocks/AcceptedInvitationRetailersContainer';
import ApprovedRetailersComponent from '../blocks/ApprovedRetailersComponent';
import IsMobile from './../../containers/common/IsMobile';
import InviteRetailerModal from '../../components/blocks/InviteRetailerModal/InviteRetailerModal';
import Button from '../../components/common/Button';
import SearchRetailers from '../../components/blocks/SearchRetailers';
import { 
  setRetailersOrder, 
  setRetailersOrderField, 
  sendRetailersInvitation, 
} from '../../store/actions/pageFilters';
import { searchAllRetailers } from '../../store/actions/searchAllRetailers';

class RetailersPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  inviteRetailerModalOpen = () => {
    this.setState({
      open: true,
    });
  }

  inviteRetailerModalClose = () => {
    this.setState({
      open: false,
    });
  }

  sendEmail = (emails) => {
    this.props.sendEmail && this.props.sendEmail(emails);
    
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <Fragment>
        <Panel
          width={480} identifier='retalers'
          mobile='retalers_mobile'
        >
          <IsMobile
            desctop={
              <Fragment>
                <Wall />
                <SearchRetailers search={this.props.searchAllRetailers} />
                <Wall />
                <DropDownFilter 
                  currentIndex={1} values={retailersFilter} 
                  onChange={field => this.props.setOrderField(field)}
                  staticPoint
                />
                <Wall />
                <SortOrderFilter onChange={order => this.props.setOrder(order)} />
                <Button
                  margin alignSelf 
                  text="INVITE RETAILERS" onClick={() => this.inviteRetailerModalOpen()}
                />
              </Fragment>
        }
            mobile={
              <Fragment>
                <Button text="INVITE RETAILERS" onClick={() => this.inviteRetailerModalOpen()} />
                <SortOrderFilter onChange={() => alert('change order')} />
              </Fragment>
        }
            width={480}
          />
        </Panel>
        <PageLayout>
          <InviteRetailerModal
            open={this.state.open} onClose={this.inviteRetailerModalClose}
            sendEmail={this.sendEmail}
          />
          <AcceptedInvitationRetailersContainer />
          <ApprovedRetailersComponent />
        </PageLayout>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    retailersCount: +state.approveNewRetailers.count,
    productsCount: +state.assignNewProducts.count,
    returnsCount: +state.manageReturns.count,
  };
};

const mapDispatchToProps = dispatch => ({
  setOrder: order => dispatch(setRetailersOrder(order)),
  setOrderField: field => dispatch(setRetailersOrderField(field)),
  searchAllRetailers: search => dispatch(searchAllRetailers(search)),
  sendEmail: emails => dispatch(sendRetailersInvitation(emails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RetailersPageContainer);

RetailersPageContainer.propTypes = {
  setOrder: PropTypes.func.isRequired,
  setOrderField: PropTypes.func.isRequired,
  searchAllRetailers: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
};
