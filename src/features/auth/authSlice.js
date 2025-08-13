import { createSlice } from "@reduxjs/toolkit";
import { getLoggedInUser } from "./authThunks";

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.data;
            state.isAuthenticated = action.payload.success;
            state.isLoading = false;
            state.error = null;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getLoggedInUser.pending, (state) => {
            state.error = null;
            state.isLoading = true;
        }).addCase(getLoggedInUser.fulfilled, (state, action) => {
            if (action.payload.success) {
                state.user = action.payload.data;
                state.isAuthenticated = true;
                state.isLoading = false;
                state.error = null;
            } else {
                state.isLoading = false;
                state.error = action.payload.message;
            }
        }).addCase(getLoggedInUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Something went wrong!';
        })
    }
})
export const authSelector = (state) => state.auth;
export const { setUser, clearUser } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;