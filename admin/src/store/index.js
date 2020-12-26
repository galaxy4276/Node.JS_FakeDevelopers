import {compose, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const configureStore = () => {
  const middlewares = [];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(enhancer);
  return store;
}