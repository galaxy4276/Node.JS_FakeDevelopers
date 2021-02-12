import {applyMiddleware, combineReducers, createStore} from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import userReducer, {userSaga} from './user';

const reducer = combineReducers({
 user: userReducer,
});
function* rootSaga() {
 yield all([userSaga()]);
}
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware)
));
sagaMiddleware.run(rootSaga);

export default store;