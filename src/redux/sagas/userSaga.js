import { put, takeLatest, takeEvery, call, take, fork} from 'redux-saga/effects';
import { USER_URL } from "../constants";
import { GET_USER, ADD_USER} from "../actionTypes"
import {updateUsers, getUser} from '../actions';
import {firebaseLooper} from '../../misc/helpers'
import { firebaseUsers } from "../../firebase";
import { eventChannel } from 'redux-saga';

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
    console.log('calling usereffectsaga')
    const users = yield call(fetchUsersApi, payload);
    console.log('firebaselooper users',firebaseLooper(users));
    yield put(updateUsers(firebaseLooper(users)));
  } catch (error) {
    console.error(error)
  }  
}
export function* postUserEffect({payload}) {
  try {
    console.log('calling post user effect');
    yield call(addUsersApi, payload);
    yield put(getUser());
  } catch (error) {
    console.error(error)
  }
}
function* startListener() {
  const channel = new eventChannel(emiter => {
    console.log('new emmiter')
    firebaseUsers.on("value", snapshot => {
      console.log('snapshot', snapshot.val())
      emiter({ data: snapshot.val() || {} });
    });

    return () => {
      firebaseUsers.off();
    };
  });

  while (true) {
    const { data } = yield take(channel);
    console.log('data from listener event', data)
    yield put(updateUsers(firebaseLooper(data)))
  }
}

export function* actionWatcher() {
  yield fork(startListener);
  yield takeLatest(GET_USER, getUserEffectSaga);
  yield takeEvery(ADD_USER, postUserEffect)
}