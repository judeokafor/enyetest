import {ADD_USER, UPDATE_USER} from '../actionTypes';

const initialState = {
  users: [],
  loading: false,
}
export default function (state= initialState, { type, payload }) {
  switch (type) {
    case ADD_USER:
      return { ...state, loading: true, ...payload }
    case UPDATE_USER:
      console.log(payload, 'payload from update users')
      return {...state,  users: payload, loading: false }
    default:
      return state;
  }
  
}