//Create login & register action

import {createAsyncThunk} from '@reduxjs/toolkit';
import API from './../../../services/API';
// import {toast } from 'react-toastify';

//login
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({role,email,password}, {rejectWithValue}) => {
        try {
            //destructure data present in API
            const { data } = await API.post("/auth/login", { role, email, password });
            //store token
            if(data.success){
                alert(data.message);
                localStorage.setItem('token', data.token);
                window.location.replace('/');  
            }
            return data;
        } catch (error) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
);

//register
export const userRegister = createAsyncThunk(
    'auth/register',
    async ({name,role,email,password,organisationName,hospitalName,website,address,phone}, {rejectWithValue}) => {
        try {
            //destructure data
            const {data} = await API.post('/auth/register', {name,role,email,password,organisationName,hospitalName,website,address,phone});
            if(data?.success)
            {
                alert('User Registered Successfully')
                // toast.success('User Registered Successfully')
                window.location.replace('/login');      //redirect to login page
            }
        } catch (error) {
            console.log(error)
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message);
            }else{
                return rejectWithValue(error.message);
            }
        }
    }
);

//current user
export const getCurrentUser = createAsyncThunk (
    'auth/getCurrentUser',
    async({rejectWithValue}) => {
        try {
            const res = await API.get('/auth/current-user')
                if(res?.data){
                    return res?.data;
                }
            }
        catch (error) {
            console.log(error)
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message);
            }else{
                return rejectWithValue(error.message);
            }
        }
    }
);