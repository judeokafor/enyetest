import { put, takeLatest, takeEvery, call} from 'redux-saga/effects';
import { USER_URL } from "../constants";
import {USER_RECEIVED, GET_USER, USER_ADDED, ADD_USER} from "../actionTypes"
import {updateUsers, getUser} from '../actions';
import {firebaseLooper} from '../../misc/helpers'

function fetchUsersApi() {
  return fetch(USER_URL).then(response => response.json()); 
}
function addUsersApi(data) {
  return fetch(USER_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json()); 
}
function* getUserEffectSaga({payload}) {
  try {
    console.log('i am called get usereffectsaga')
    const users = yield call(fetchUsersApi, payload);
    yield put(updateUsers(firebaseLooper(users)))
  } catch (error) {
    console.error(error)
  }  
}
export function* postUserEffect({payload}) {
  try {
    console.log('calling post user effect')
    yield call(addUsersApi, payload);
    yield put(getUser());
  } catch (error) {
    console.error(error)
  }
}
export function* actionWatcher() {
  yield takeLatest(GET_USER, getUserEffectSaga);
  yield takeEvery(ADD_USER, postUserEffect)
}