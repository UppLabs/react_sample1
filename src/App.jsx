import React from 'react';
import { Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import 'typeface-roboto';
import '../node_modules/antd/dist/antd.css';
import './stylesheets/css/devup-ic/style.css';
import './stylesheets/css/fonts.css';
import './stylesheets/scss/custom-media-grid.scss';
import './stylesheets/scss/retailers-media-grid.scss';
import './stylesheets/scss/media-grid-products.scss';
import './stylesheets/scss/brands-replenish-media-grid.scss';
import './stylesheets/scss/App.scss';
import './stylesheets/css/panels-collapse.css';
import './stylesheets/css/scrollbar.css';
import '../node_modules/antd/dist/antd.less';
import './stylesheets/scss/slider-input.scss';
import MainRoutes from './routes/MainRoutes';
import HeaderRoutes from './routes/HeaderRoutes';
import FooterRoutes from './routes/FooterRoutes'; 
import history from './utils/history';
import Alert from './containers/common/Alert';

const App = () => (
  <Router history={history}>
    <div id="mainContainer">
      <Alert />
      <HeaderRoutes />
      <MainRoutes />
      <FooterRoutes />
    </div>
  </Router>
);

export default hot(module)(App);
