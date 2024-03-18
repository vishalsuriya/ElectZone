import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/UserReducers';
import {thunk} from "redux-thunk";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer,
  initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export default store;
