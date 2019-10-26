import {ADD_USER, GET_USER, USER_RECEIVED} from '../actionTypes';
import { eventChannel } from 'redux-saga';

const initialState = {
  users: []
}
export default function (state= initialState, { type, payload }) {
  switch (type) {
    case ADD_USER:
      state.users.push(payload)
      return { ...state, ...payload }
    case GET_USER:
      return { ...state, loading: true }
    case USER_RECEIVED:
      return { ...state, users: payload, loading: false }
    default:
      return state;
  }
  
}