import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './../components/blocks/Footer';
import StartFooter from './../components/blocks/StartFooter';

const FooterRoutes = () => {
    return (
      <Switch>
        <Route path='/welcome' component={StartFooter} />
        <Route path='/forgot' component={StartFooter} />
        <Route path='/create-password' component={StartFooter} />
        <Route path='/signup' component={StartFooter} />
        <Route path='/signin' component={StartFooter} />
        <Route path='/signout' component={StartFooter} />
        <Route path='/newretailer' component={StartFooter} />
        <Route component={Footer} />
      </Switch>
    );
};

export default FooterRoutes;