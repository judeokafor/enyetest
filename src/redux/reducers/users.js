import {ADD_USER} from '../actionTypes';

const initialState = {
  users: []
}
export default function (state= initialState, action) {
  switch (action.type) {
    case ADD_USER:
      const {content} = action.payload;
      state.users.push(content)
      return {
        ...state,
      }
    default:
      return state;
  }
  
  
}