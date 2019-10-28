import {ADD_USER, GET_USER, USER_RECEIVED, UPDATE_USER} from '../actionTypes';
import { eventChannel } from 'redux-saga';

const initialState = {
  users: [],
  loading: false,
}
export default function (state= initialState, { type, payload }) {
  switch (type) {
    case ADD_USER:
      return { ...state, loading: true, ...payload }
    case GET_USER:
      return { ...state, loading: true }
    case UPDATE_USER:
      return { ...state, users: payload, loading: false }
    case USER_RECEIVED:
      return { ...state, users: payload, loading: false }
    default:
      return state;
  }
  
}