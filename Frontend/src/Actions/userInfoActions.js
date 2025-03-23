// actions/userInfoActions.js
import axios from "axios";
import {
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
  clearUserInfoError
} from "../Slices/userInfoSlice";

// Create User Info
export const createUserInfo = (userInfoData) => async (dispatch) => {
  try {
    dispatch(createUserInfoRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/userInformation", userInfoData, config);
    dispatch(createUserInfoSuccess(data));
  } catch (error) {
    dispatch(createUserInfoFail(error.response.data.message));
  }
};

// Get User Info
export const getUserInfo = () => async (dispatch) => {
  try {
    dispatch(getUserInfoRequest());
    const { data } = await axios.get("/api/v1/userInformation");
    dispatch(getUserInfoSuccess(data));
  } catch (error) {
    dispatch(getUserInfoFail(error.response.data.message));
  }
};

// Update User Info
export const updateUserInfo = (userInfoData) => async (dispatch) => {
  try {
    dispatch(updateUserInfoRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put("/api/v1/userInformation", userInfoData, config);
    dispatch(updateUserInfoSuccess(data));
  } catch (error) {
    dispatch(updateUserInfoFail(error.response.data.message));
  }
};

// Delete User Info
export const deleteUserInfo = () => async (dispatch) => {
  try {
    dispatch(deleteUserInfoRequest());
    await axios.delete("/api/v1/userInformation");
    dispatch(deleteUserInfoSuccess());
  } catch (error) {
    dispatch(deleteUserInfoFail(error.response.data.message));
  }
};

// Clear Errors
export const clearUserInfoErrors = (dispatch) => {
  dispatch(clearUserInfoError());
};