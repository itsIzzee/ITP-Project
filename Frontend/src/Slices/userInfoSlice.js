// slices/userInfoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    loading: false,
    userInfo: null,
    error: null,
  },
  reducers: {
    createUserInfoRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createUserInfoSuccess(state, action) {
      return {
        ...state,
        loading: false,
        userInfo: action.payload.userInfo,
      };
    },
    createUserInfoFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    getUserInfoRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getUserInfoSuccess(state, action) {
      return {
        ...state,
        loading: false,
        userInfo: action.payload.userInfo,
      };
    },
    getUserInfoFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateUserInfoRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateUserInfoSuccess(state, action) {
      return {
        ...state,
        loading: false,
        userInfo: action.payload.userInfo,
      };
    },
    updateUserInfoFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteUserInfoRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteUserInfoSuccess(state, action) {
      return {
        ...state,
        loading: false,
        userInfo: null,
      };
    },
    deleteUserInfoFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearUserInfoError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

const { actions, reducer } = userInfoSlice;

export const {
  createUserInfoRequest,
  createUserInfoSuccess,
  createUserInfoFail,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFail,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFail,
  deleteUserInfoRequest,
  deleteUserInfoSuccess,
  deleteUserInfoFail,
  clearUserInfoError,
} = actions;

export default reducer;