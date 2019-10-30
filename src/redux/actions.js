import {ADD_USER, UPDATE_USER, GET_USER} from './actionTypes';
export const addUser = (payload) => ({
  type: ADD_USER,
  payload
});
export const updateUsers = (payload) => ({
  type: UPDATE_USER,
  payload
});

export const getUser = () => ({
  type: GET_USER
})


