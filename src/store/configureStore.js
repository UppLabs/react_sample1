import { applyMiddleware, createStore, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import config from '../utils/config';
import { redirectMiddleware } from '../utils/redirectMiddleware';

export default function configureStore(initialState) {
  const middlewares = [
    redirectMiddleware,
    reduxThunk,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if (process.env.NODE_ENV !== config.env_production) {
    // middlewares.push(createLogger());
  }

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares),
    ),
  );

  if (process.env.NODE_ENV !== config.env_production) {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers');
        store.replaceReducer(nextRootReducer);
      });
    }
  }
 
  return store;
}