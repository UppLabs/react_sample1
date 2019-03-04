import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageLayout from '../../components/common/PageLayout';
import UserCard from '../../components/blocks/UserCard';
import AddEditUserModal from '../../components/blocks/AddEditUserModal';
import Hero from '../../components/common/Hero';
import ServicesPageLayout from '../../components/common/ServicesPageLayout';
import { getAdminUsers, deleteAdminUsers, putAdminUsers } from '../../store/actions/adminUsers';
import Spinner from '../../components/common/Spinner';

class AccountPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      user: {},
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  openModal = (id) => {
    if(!id) {
      this.setState({
        user: {},
      });
    }
    
    this.setState({
      open: true,
    });
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const divStyle = {
      backgroundImage: 'url('+ require('../../images/admin-hero.jpg')+')',
    };
    
    const { 
      data, 
      isLoading, 
      submit, 
      deleteUser, 
    } = this.props;
    
    return (
      <ServicesPageLayout>
        <Hero panel divStyle={divStyle} >
          <h1>USERS</h1>
        </Hero>
        {/* <Panel fix>
        <ActionLinkTop title="ADD USER" onClick={() => this.openModal()} />
      </Panel> */}
        <PageLayout>
          { isLoading ? <Spinner /> : 
          <Fragment>
            {
                data.map(value => (<UserCard
                  key={value.retailer_id} data={value}
                  editModal={this.openModal}
                  submit={submit}
                  deleteUser={deleteUser}
                />)) 
              }
            <AddEditUserModal 
              user={this.state.user}
              open={this.state.open} onClose={this.closeModal}
            />
          </Fragment> 
          }
        </PageLayout>
      </ServicesPageLayout>   
    );
  }
}

const mapStateToProps = (state) => {
  const { data, isLoading } = state.adminUsers;
  return {
    data,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getAdminUsers()),
  submit: (userId, data) => dispatch(putAdminUsers(userId, data)),
  deleteUser: userId => dispatch(deleteAdminUsers(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageContainer);

AccountPageContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUsers: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
