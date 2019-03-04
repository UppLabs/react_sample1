import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from '../containers/pages/HomeContainer';
import RetailersPageContainer from '../containers/pages/RetailersPageContainer';
import OrdersPageContainer from '../containers/pages/OrdersPageContainer';
import SignInContainer from '../containers/pages/SignInContainer';
import SignOutContainer from '../containers/pages/SignOutContainer';
import ProductsPageContainer from '../containers/pages/ProductsPageContainer';
import StatsPageContainer from '../containers/pages/StatsPageContainer';
import SingleRetailerPageContainer from '../containers/pages/SingleRetailerPageContainer';
import ReplenishOrdersPageContainer from '../containers/pages/ReplenishOrdersPageContainer';
import DropshipOrdersPageContainer from '../containers/pages/DropshipOrdersPageContainer';
import AccountPageContainer from '../containers/pages/AccountPageContainer';
import BrandPageContainer from '../containers/pages/BrandPageContainer';
import UsersPageContainer from '../containers/pages/UsersPageContainer';
import DropshipPageContainer from '../containers/pages/DropshipPageContainer';
import ReplenishProductsPageContainer from '../containers/pages/ReplenishProductsPageContainer';
// import WelcomePageContainer from '../containers/pages/WelcomePageContainer';
import ForgotPasswordContainer from '../containers/pages/ForgotPasswordContainer';
import WelcomePageContainer from '../containers/pages/WelcomePageContainer';
import CreateNewPasswordContainer from '../containers/pages/CreateNewPasswordContainer';
import DropshipProductCardPageContainer from '../containers/pages/DropshipProductCardPageContainer';
import ActivationPageContainer from '../containers/pages/ActivationPageContainer';
import SignUpContainer from '../containers/pages/SignUpContainer';
import CreateNewRetailerAccountPage from '../containers/pages/CreateNewRetailerAccountPage';
import CartContainer from '../containers/pages/CartContainer';

const MainRoutes = () => {
    return (
      <Switch>
        <Route
          path="/welcome"
          component={WelcomePageContainer}
        />
        <Route
          path='/forgot'
          component={ForgotPasswordContainer}
        />
        <Route
          path='/create-password'
          component={CreateNewPasswordContainer}
        />
        <Route
          path='/signup'
          component={SignUpContainer}
        />
        <Route
          path="/home"
          component={HomeContainer}
        />
        <Route
          path="/retailers"
          component={RetailersPageContainer}
        />
        <Route
          path="/orders"
          component={OrdersPageContainer}
        />
        <Route
          path="/signin"
          component={SignInContainer}
        />
        <Route
          path="/signout"
          component={SignOutContainer}
        />
        <Route
          path="/products"
          component={ProductsPageContainer}
        />
        <Route
          path="/retailer/:id"
          component={SingleRetailerPageContainer}
        />
        <Route
          path="/stats"
          component={StatsPageContainer}
        />
        <Route
          path="/dropship/orders"
          component={DropshipOrdersPageContainer}
        />
        <Route
          exact
          path="/dropship"
          component={DropshipPageContainer}
        />
        <Route
          exact
          path="/dropship/product/:model"
          component={DropshipProductCardPageContainer}
        />
        <Route 
          exact
          path="/dropship/cart"
          component={CartContainer}
        />
        <Route
          exact
          path="/replenish"
          component={ReplenishProductsPageContainer}
        />
        <Route
          exact
          path="/replenish/orders"
          component={ReplenishOrdersPageContainer}
        />
        <Route
          exact
          path="/replenish/products"
          component={ReplenishProductsPageContainer}
        />
        <Route
          exact
          path="/admin"
          component={AccountPageContainer}
        />
        <Route
          exact
          path="/admin/activation/:id"
          component={ActivationPageContainer}
        />
        <Route
          exact
          path="/admin/account"
          component={AccountPageContainer}
        />
        <Route
          exact
          path="/admin/brands"
          component={BrandPageContainer}
        />
        <Route
          exact
          path="/admin/users"
          component={UsersPageContainer}
        />
        <Route
          exact
          path="/newretailer"
          component={CreateNewRetailerAccountPage}
        />
        <Route
          exec
          path="/"
          component={HomeContainer}
        />
        {/* Not found */}
        <Route
          exact
          component={HomeContainer}
        />
      </Switch>
    );
};

export default MainRoutes;