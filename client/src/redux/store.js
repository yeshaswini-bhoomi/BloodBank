//conatins the reducer funtion
import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice';

const store = configureStore({
    //can contain more than 1 reducer
    reducer:{
        auth: authSlice.reducer,
        
    }
})

export default store;
