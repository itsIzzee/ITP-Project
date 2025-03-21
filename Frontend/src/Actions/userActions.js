import { loginFail, 
    loginRequest, 
    loginSuccess, 
    clearError, 
    registerRequest, 
    registerSuccess, 
    registerFail,
    loadUserSuccess,
    loadUserRequest,
    loadUserFail, 
    logoutSuccess,
    logoutfail
} from "../Slices/authSlice"
import axios from 'axios'


//login user action
export const login = (email , password) => async (dispatch) => {

    try {
            dispatch(loginRequest())
           const { data } = await axios.post(`/api/v1/login`, {email , password})
            dispatch(loginSuccess(data))
        
    } catch (error) {
        
        dispatch(loginFail(error.response.data.message))
    }
} 

export const clearAuthError = dispatch => {
    dispatch(clearError())
}


//register user action
export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers : {
                'Content-type' : 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`/api/v1/register`, userData , config)
        dispatch(registerSuccess(data))
        
    } catch (error) {
        
        dispatch(registerFail(error.response.data.message))
    }
} 



//load user action (get user profile)
export const loaduser = async (dispatch) => {

    try {
        dispatch(loadUserRequest())
        

        const { data } = await axios.get(`/api/v1/myprofile`)
        dispatch(loadUserSuccess(data))
        
    } catch (error) {
        
        dispatch(loadUserFail(error.response.data.message))
    }
} 

//load user action (get user profile)
export const logout = async (dispatch) => {

    try {
        
        await axios.get(`/api/v1/logout`)
        dispatch(logoutSuccess())
        
    } catch (error) {
        
        dispatch(logoutfail)
    }
} 









