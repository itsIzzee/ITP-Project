import { createSlice } from "@reduxjs/toolkit";


const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        loading: false,
        isAuthenticatedSeller : false,
     
    },
    reducers: {
        loginRequestSeller(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccessSeller(state, action){
            return {
            
                loading: false,
                isAuthenticatedSeller : true,
                seller: action.payload.seller
            }
        },
        loginFailSeller(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearSellError(state, action){
            return {
                ...state,
                error:  null
        }

    },
    registerRequestSeller(state, action){
        return {
            ...state,
            loading: true,
        }
    },
    registerSuccessSeller(state, action){
        return {
        
            loading: false,
            isAuthenticatedSeller : true,
            seller: action.payload.seller
        }
    },
    registerFailSeller(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },
    loadSellerRequest(state, action){
        return {
            ...state,
            isAuthenticatedSeller : false,
            loading: true,
        }
    },
    loadSellerSuccess(state, action){
        return {
        
            loading: false,
            isAuthenticatedSeller : true,
            user: action.payload.user
        }
    },
    loadSellerFail(state, action){
        return {
            ...state,
            loading: false,
            error:  action.payload
        }
    },
    logoutSellerSuccess(state, action){
        return {
        
            loading: false,
            isAuthenticatedSeller : false,
            
        }
    },
    logoutSellerfail(state, action){
        return {
            ...state,
            error:  action.payload
        }
    },
   
}
});

const { actions, reducer } = sellerSlice;

export const { loginRequestSeller
    ,loginSuccessSeller
    ,loginFailSeller
    ,clearSellError,
    registerRequestSeller,
    registerSuccessSeller,
    registerFailSeller,
    loadSellerRequest,
    loadSellerSuccess,
    loadSellerFail,
    logoutSellerSuccess,
    logoutSellerfail
} = actions;

export default reducer;

