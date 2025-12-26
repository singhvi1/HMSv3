import { createSlice } from "@reduxjs/toolkit";

const loggedinUser=createSlice({
    name:"loggedinUser",
    initialState:null,
    reducers:{
        setLoggedinUser:(_state,action)=>{
            return action.payload;
        },
        removeLoggedinUser:()=>{
            return null;
        }

    }
})
export const {setLoggedinUser,removeLoggedinUser}=loggedinUser.actions;
export default loggedinUser.reducer;