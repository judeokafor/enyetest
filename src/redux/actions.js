import {ADD_USER, GET_USER} from './actionTypes';
export const addUser = (payload) => ({
  type: ADD_USER,
  payload
});
export const updateUsers = (payload) => ({
  type: GET_USER,
  payload
});


