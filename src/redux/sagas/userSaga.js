import { put, takeLatest, call} from 'redux-saga/effects';
import { USER_URL } from "../constants";
import {USER_RECEIVED, GET_USER, USER_ADDED, USER_WATCHER} from "../actionTypes"
import {updateUsers} from '../actions'

function fetchUsersApi() {
  return fetch(USER_URL).then(response => response.json()); 
}
function addUsersApi(data) {
  return fetch(USER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
function* getUserEffectSaga({payload}) {
  try {
    const users = yield call(fetchUsersApi, payload)
    //dispatch action to change redux state i.e update users state
    yield put(updateUsers(users))
  } catch (error) {
    console.error(error)
  }
  
}
export function* actionWatcher() {
  yield takeLatest(USER_RECEIVED, getUserEffectSaga)
}