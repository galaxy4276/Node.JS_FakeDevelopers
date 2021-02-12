import {createAction, handleActions} from "redux-actions";
import {takeLatest, call, put, all, fork} from 'redux-saga/effects';
import * as userAPI from '../api/user';


// 리덕스 액션
const LOGIN_USER = 'LOGIN_USER';
const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = (user) => ({ type: LOGIN_USER, user });
export const logoutUser = createAction(LOGOUT_USER);

// 리덕스 사가
function* loginUserSaga(action) {
  try {
    const user = yield call(userAPI.postUserLogin, action.user);
    yield put({
      type: LOGIN_USER_SUCCESS,
      user
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOGIN_USER_FAILED,
      error: e
    });
  }
}

function* watchLoginUserSaga() {
  yield takeLatest(LOGIN_USER, loginUserSaga);
}

export function* userSaga() {
  yield all([
    fork(watchLoginUserSaga),
  ]);
}


// 초기 상태
const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
}

// 리듀서
const reducer = handleActions({
  [LOGIN_USER]: (state, action) => ({

  }),
  [LOGIN_USER_FAILED]: (state, action) => ({

  }),
  [LOGOUT_USER]: (state, action) => ({

  }),
}, INITIAL_STATE);

export default reducer;