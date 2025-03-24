import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
  },
     
    },
    reducers: {
        loginRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccess(state, action){
            return {
            
                loading: false,
                isAuthenticated : true,
                user: action.payload.user
            }
        },
        loginFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearUserError(state, action){
            return {
                ...state,
                error:  null
        }

    },

    registerRequest(state, action){
        return {
            ...state,
            loading: true,
        }
    },
    registerSuccess(state, action){
        return {
        
            loading: false,
            isAuthenticated : true,
            user: action.payload.user
        }
    },
    registerFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },

    registerUserInfoRequest(state, action){
        return {
            ...state,
            loading: true,
            isUpdated : false
        }
    },
    registerUserInfoSuccess(state, action){
        return {
            ...state,
            loading: false,
            isUpdated : true,
            user : { ...state.user, ...action.payload },
        }
    },
    registerUserInfoFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },


    loadUserRequest(state, action){
        return {
            ...state,
            isAuthenticated: false,
            loading: true,
        }
    },
    loadUserSuccess(state, action){
        return {
        
            loading: false,
            isAuthenticated : true,
            user: action.payload.user
        }
    },
    loadUserFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },
    logoutSuccess(state, action){
        return {
        
            loading: false,
            isAuthenticated : false,
            user : null
            
        }
    },
    logoutfail(state, action){
        return {
            ...state,
            error:  action.payload
        }
    },
    updateProfileRequest(state, action){
        return {
            ...state,
            loading: true,
            isUpdated : false
        }
    },
    updateProfileSuccess(state, action){
        return {
            ...state,
            loading: false,
            user : action.payload.user,
            isUpdated : true
        }
    },
    updateProfileFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },
    updatePasswordRequest(state, action){
        return {
            ...state,
            loading: true,
            isUpdated : false
        }
    },
    updatePasswordSuccess(state, action){
        return {
            ...state,
            loading: false,
            isUpdated : true
        }
    },
    updatePasswordFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },


   forgotPasswordRequest(state, action){
        return {
            ...state,
            loading: true,
            message : null
           
        }
    },
    forgotPasswordSuccess(state, action){
        return {
            ...state,
            loading: false,
            message : action.payload.message
        }
    },
    forgotPasswordFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },

    resetPasswordRequest(state, action){
        return {
            ...state,
            loading: true
           
        }
    },
    resetPasswordSuccess(state, action){
        return {
            ...state,
            loading: false,
            isAuthenticated : true,
            user:action.payload.user
        }
    },
    resetPasswordFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },

    deleteAccountRequest(state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    deleteAccountSuccess(state, action) {
        return {
            ...state,
            loading: false,
            isAuthenticated: false, // User is no longer authenticated
            user: {}, // Clear user data
        };
    },
    deleteAccountFail(state, action) {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    },


    

   
}
});

const { actions, reducer } = authSlice;

export const { loginRequest,
    loginSuccess,
    loginFail,
    clearUserError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserSuccess,
    loadUserRequest,
    loadUserFail,
    logoutSuccess,
    logoutfail,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    forgotPasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    deleteAccountFail,
    deleteAccountRequest,
    deleteAccountSuccess,
    registerUserInfoFail,
    registerUserInfoRequest,
    registerUserInfoSuccess
} = actions;

export default reducer;

