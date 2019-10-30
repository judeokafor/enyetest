import {ADD_USER, GET_USER, UPDATE_USER} from '../actionTypes';

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
    default:
      return state;
  }
  
}