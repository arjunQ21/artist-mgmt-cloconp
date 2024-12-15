import { createSlice } from "@reduxjs/toolkit";
import { authTokenLocalSaveName } from "src/helpers/constants";



const authSlice = createSlice({
    name: "auth",
    initialState: null,
    reducers: {
        login: (state, action) => {
            // console.log("Login Payload: ", action.payload)
            if(!action.payload) throw new Error("Cannot Login with empty payload. ")
            state = action.payload;
            localStorage.setItem(authTokenLocalSaveName, action.payload.token);
            return state;
        },
        logout: (state) => {
            state = null;
            localStorage.setItem(authTokenLocalSaveName, null);
            return state;
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;