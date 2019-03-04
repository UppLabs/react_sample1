import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateNewRetailerAccount from '../../components/blocks/CreateNewRetailerAccount';
import StartPageLayout from '../../components/common/StartPageLayout';
import { postNewRetailer } from '../../store/actions/newRetailer';

class CreateNewRetailerAccountPage extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <StartPageLayout wallHeight='20'>
        <CreateNewRetailerAccount {...this.props} />
      </StartPageLayout>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submit: data => dispatch(postNewRetailer(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewRetailerAccountPage);

CreateNewRetailerAccountPage.propTypes = {
};
