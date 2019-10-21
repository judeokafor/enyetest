import {ADD_USER} from '../actionTypes';

const initialState = {
  users: []
}
export default function (state= initialState, { type, payload }) {
  switch (type) {
    case ADD_USER:
      state.users.push(payload)
      return { ...state, ...payload }
    default:
      return state;
  }
  
}