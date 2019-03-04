import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

// import 'bootstrap/dist/css/bootstrap.min.css'
const store = configureStore();

render(  
  <Provider store={store}>
    <div style={{ 'position': 'relative', 'paddingBottom': '120px', 'minHeight': '100%' }} className='app'>
      <App />
    </div>
  </Provider>,
document.getElementById('root'));

registerServiceWorker();
