import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetcher } from '@/utils/fetcher';

export const getLoggedInUser = createAsyncThunk('auth/me', async () => {
    const credentials = await apiFetcher('/auth/me');
    console.log(credentials)
    return credentials;
});
