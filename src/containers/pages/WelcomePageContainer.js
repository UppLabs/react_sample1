import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import StartPageLayout from '../../components/common/StartPageLayout';
import Welcome from '../../components/pages/Welcome';

class WelcomePageContainer extends PureComponent {
  render() {
    return (
      <Fragment>
        <StartPageLayout wallHeight='60'>
          <Welcome />
        </StartPageLayout>   
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePageContainer);
