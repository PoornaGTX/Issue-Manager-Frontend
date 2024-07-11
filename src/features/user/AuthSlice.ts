import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../utils/consts';
import { UserType, UserSlice, ErrorResponse } from '../../utils/types';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
  token: token,
  user: user ? JSON.parse(user) : null,
  isLoading: false,
  alertText: '',
  alertType: '',
  showAlert: false,
  errorMsg: 'is currently empty',
};

export const register = createAsyncThunk<UserSlice, { email: string; password: string; name: string; company: string; position: string }>(
  'Auth/register',
  async (credentials, thunkAPI) => {
    try {
      const resp = await axios.post(`${BASE_URL}/auth/register`, credentials);
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
  }
);

export const login = createAsyncThunk<UserSlice, { email: string; password: string }>('Auth/login', async (credentials, thunkAPI) => {
  try {
    const resp = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response) {
        return thunkAPI.rejectWithValue(err.response.data.msg);
      }
    }
    throw error;
  }
});

const addUserToLocalStorage = (user: UserType, token: string) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

const removeFromTheLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const AuthSlice = createSlice({
  name: 'Auth',
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
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.alertType = '';
      state.alertText = '';
      removeFromTheLocalStorage();
    },
  },

  extraReducers: (builder) => {
    builder
      //register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<UserSlice>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.showAlert = true;
        state.alertText = 'register Successful! Redirecting';
        state.alertType = 'success';
        addUserToLocalStorage(action.payload.user, action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
        state.showAlert = true;
        state.alertText = action.payload as string;
        state.alertType = 'error';
      })

      //login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserSlice>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.showAlert = true;
        state.alertText = 'Login Successful! Redirecting';
        state.alertType = 'success';
        addUserToLocalStorage(action.payload.user, action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
        state.showAlert = true;
        state.alertText = action.payload as string;
        state.alertType = 'error';
      });
  },
});

export const { hideAlert, displayAlet, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
