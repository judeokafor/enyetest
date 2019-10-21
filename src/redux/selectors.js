export const getUsersState = store => store.users;
export const getAllUsers = store => getUsersState(store) ? getUsersState(store).users : [];
