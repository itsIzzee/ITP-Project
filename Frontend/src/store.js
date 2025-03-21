import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from './Slices/authSlice'
import sellerReducer from './Slices/sellerSlice'

const reducer = combineReducers({
  // Your reducers here
  authState : authReducer,
  sellerState : sellerReducer
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true, // Enable Redux DevTools
});

export default store;
