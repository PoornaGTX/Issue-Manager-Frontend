import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../utils/consts';
import { usersSlice, ErrorResponse } from '../../utils/types';
import authFetch from '../../utils/AuthFetch';

const initialState = {
  users: [],
  isLoading: false,
  alertText: '',
  alertType: '',
  showAlert: false,
  errorMsg: 'is currently empty',
};

export const getUsers = createAsyncThunk<usersSlice, { company: string }>('Users/getUsers', async (company, thunkAPI) => {
  try {
    const resp = await authFetch.get(`${BASE_URL}/user?company=${company}`);
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response) {
        console.log(err.response.data);
        return thunkAPI.rejectWithValue(err.response.data.msg);
      }
    }
    throw error;
  }
});

const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    displayAlet: (state) => {
      state.showAlert = true;
      state.alertType = 'error';
      state.alertText = 'Please provide all values';
    },
    hideAlert: (state) => {
      state.showAlert = false;
      state.alertType = '';
      state.alertText = '';
    },
  },

  extraReducers: (builder) => {
    builder
      //getUsers
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<usersSlice>) => {
        state.isLoading = false;
        state.showAlert = true;
        state.users = action.payload.users;
        state.alertType = 'success';
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
        state.showAlert = true;
        state.alertText = action.payload as string;
        state.alertType = 'error';
      });
  },
});

export const { hideAlert, displayAlet } = UsersSlice.actions;
export default UsersSlice.reducer;
