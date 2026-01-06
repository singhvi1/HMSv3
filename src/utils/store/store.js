import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice"
import roomsReducer from "./roomsSlice"
import issuesReducer from "./issuesSlice"
import leaveReducer from "./leaveSlice"
import loggedinUserReducer from "./logedinUser"
import hostelReducer from "./hostelSlice"
import announcementsSlice from "./announcementsSlice"
import studentProfileReducer from "./studentProfile"
const store = configureStore({
    reducer: {
        studentProfile: studentProfileReducer,
        loggedinUser: loggedinUserReducer,
        hostel: hostelReducer,
        announcements: announcementsSlice,
        students: studentReducer,
        rooms: roomsReducer,
        issues: issuesReducer,
        leaves: leaveReducer,
    }
})

export default store;