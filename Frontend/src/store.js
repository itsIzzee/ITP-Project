import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from './Slices/authSlice'

const reducer = combineReducers({
  // Your reducers here
  authState : authReducer
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true, // Enable Redux DevTools
});

export default store;
