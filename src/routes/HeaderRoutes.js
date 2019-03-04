import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuContainer from '../containers/blocks/MenuContainer';
import StartMenuContainer from '../containers/blocks/StartMenuContainer';
import ServicesMenuContainer from '../containers/common/ServicesMenuContainer';

const HeaderRoutes = () => {
    return (
      <Switch>
        <Route 
          exec path="/dropship"
          history={BrowserRouter}
          render={props => (<ServicesMenuContainer {...props} />)}
        />
        <Route
          exec path="/replenish"
          history={BrowserRouter}
          render={props => (<ServicesMenuContainer {...props} />)}
        />
        <Route 
          exec path="/admin"
          history={BrowserRouter} 
          render={props => (<ServicesMenuContainer {...props} />)} 
        />
        <Route
          exec path='/welcome'
          component={StartMenuContainer}
        />
        <Route
          exec path='/forgot'
          component={StartMenuContainer}
        />
        <Route
          exec path='/create-password'
          component={StartMenuContainer}
        />
        <Route
          exec path='/signup'
          component={StartMenuContainer}
        />
        <Route
          exec path='/signin'
          component={StartMenuContainer}
        />
        <Route
          exec path='/signout'
          component={StartMenuContainer}
        />
        <Route
          exec path='/newretailer'
          component={StartMenuContainer}
        />
        <Route history={BrowserRouter} component={MenuContainer} />
      </Switch>
    );
};

export default HeaderRoutes;