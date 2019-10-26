import { all } from 'redux-saga/effects';
import { actionWatcher } from "./userSaga";

export default function* rootSaga() {
  yield all([
  actionWatcher(),
  ]);
}