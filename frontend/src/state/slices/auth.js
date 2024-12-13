import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth",
    initialState: null,
    reducers: {
        login: (state, action) => {
            console.log("Login Payload: ", action.payload)
            if(!action.payload) throw new Error("Cannot Login with empty payload. ")
            state = action.payload;
            return state;
        },
        logout: (state) => {
            state = null;
            return state;
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;