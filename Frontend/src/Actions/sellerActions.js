import { loginFailSeller
    , loginRequestSeller, 
    loginSuccessSeller,
     clearSellError ,
     registerSuccessSeller,
     registerRequestSeller,
     registerFailSeller,
     loadSellerSuccess,
     loadSellerRequest,
     loadSellerFail,
     logoutSellerfail,
     logoutSellerSuccess
    } from "../Slices/sellerSlice"
import axios from 'axios'




export const loginSeller = (email , password) => async (dispatch) => {

    try {
            dispatch(loginRequestSeller())
           const { data } = await axios.post(`/api/v1/loginSeller`, {email , password})
            dispatch(loginSuccessSeller(data))
        
    } catch (error) {
        
        dispatch(loginFailSeller(error.response.data.message))
    }
} 

export const clearSellerError = dispatch => {
    dispatch(clearSellError())
}


export const registerSeller = (sellerData) => async (dispatch) => {

    try {
        dispatch(registerRequestSeller())
        const config = {
            headers : {
                'Content-type' : 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`/api/v1/registerSeller`, sellerData , config)
        dispatch(registerSuccessSeller(data))
        
    } catch (error) {
        
        dispatch(registerFailSeller(error.response.data.message))
    }
} 




export const loadSeller = async (dispatch) => {

    try {
        dispatch(loadSellerRequest())
        

        const { data } = await axios.get(`/api/v1/myprofileSeller`)
        dispatch(loadSellerSuccess(data))
        
    } catch (error) {
        
        dispatch(loadSellerFail(error.response.data.message))
    }
} 

//load user action (get user profile)
export const logoutSeller = async (dispatch) => {

    try {
        
        await axios.get(`/api/v1/logoutSeller`)
        dispatch(logoutSellerSuccess())
        
    } catch (error) {
        
        dispatch(logoutSellerfail)
    }
} 