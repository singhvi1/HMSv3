import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice"
import roomsReducer from "./roomsSlice"
import issuesReducer from "./issuesSlice"
import loggedinUserReducer from "./logedinUser"
const store=configureStore({
    reducer:{
        students:studentReducer,
        rooms: roomsReducer,
        issues: issuesReducer,
        loggedinUser:loggedinUserReducer,
    }
})

export default store;