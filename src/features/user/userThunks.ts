import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMeAPI } from './userAPI';

export const fetchMe = createAsyncThunk(
    'user/fetchMe',
    async (_, { rejectWithValue }) => {
        try {
            const user = await getMeAPI();
            return user;
        } catch (error) {
            if (error instanceof Error) {
                // Return the error message as a rejected value
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);
