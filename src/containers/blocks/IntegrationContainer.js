import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toolbar from '../../components/common/Toolbar';
import Spinner from '../../components/common/Spinner';
import Integration from '../../components/blocks/Integration';
import IntegrationModal from '../../components/blocks/IntegrationModal/IntegrationModal';

class IntegrationContainer extends PureComponent {
  state = {
    open: false,
  }

  openModal = () => {
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
    const { open } = this.state;

    return (
      <div>
        <IntegrationModal open={open} onClose={this.closeModal} />
        <Toolbar name="Integration" />
        <Integration open={this.openModal} {...this.props} />
      </div>
    );
    // return this.props.isLoading ? <Spinner /> : ( this.props.retailers.length > 0 ?
    //   <div>
    //     <Toolbar name="Accepted invitation and requires your approval" />
    //     <StoresTable {...this.props} />
    //   </div>
    // : null);
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationContainer);

IntegrationContainer.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
};
