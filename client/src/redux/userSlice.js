import React from 'react'
import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    user: null,
    error: false,
    loading : false,
}
const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers: {
  loginStart : (state) =>{
      state.loading = true;

  },
   loginSuccess : (state,action) => {
        state.loading= false;
        state.user = action.payload
  },
  loginFailure : (state)=>{
       state.error = true;
       state.loading=false;
  },
  logout : (state)=> {
    return initialState
  }
}
})

export const {loginStart,loginFailure,loginSuccess,logout} = userSlice.actions;

export default userSlice.reducer