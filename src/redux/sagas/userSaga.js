import { put, takeEvery, call, take, fork} from 'redux-saga/effects';
import { USER_URL } from "../constants";
import { ADD_USER} from "../actionTypes"
import {updateUsers} from '../actions';
import { firebaseUser } from "../../firebase";
import { eventChannel } from 'redux-saga';

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
export function* postUserEffect({payload}) {
  try {
    yield call(addUsersApi, payload);
  } catch (error) {
    console.error(error)
  }
}
function* startListener() {
  const channel = new eventChannel((emitter) => {
    firebaseUser.on("value", snapshot => {
      console.log('data from snapshot emmiter', snapshot.val())
      emitter({ data: snapshot.val() || {} });
    });
    return () => {
      firebaseUser.off();
    };
  });

  while (true) {
    const { data } = yield take(channel);
    const userdata = data !== null ? Object.keys(data).map((value, i) => data[value]) : [];
    const newUserData = userdata.map(element => element.hasOwnProperty('id') ? {id: element.id, ...element.user} : {...element.user})
    console.log(newUserData, 'new data')
    yield put(updateUsers(newUserData));
  }
}

export function* actionWatcher() {
  yield fork(startListener);
  yield takeEvery(ADD_USER, postUserEffect)
}