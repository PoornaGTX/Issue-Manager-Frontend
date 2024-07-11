import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../utils/consts';
import { IssueSliceType, ErrorResponse, issue } from '../../utils/types';
import authFetch from '../../utils/AuthFetch';

const initialState: IssueSliceType = {
  issues: [],
  issue: {} as issue,
  isLoading: false,
  alertText: '',
  alertType: '',
  showAlert: false,
  errorMsg: 'is currently empty',
  type: 'Personal',
  search: '',
  filter: 'all',
  statuses: [],
  priorities: [],
};

export const getAllIssues = createAsyncThunk<IssueSliceType>('Issue/getAllIssues', async (searchText, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as { Issue: { type: string; search: string; filter: string } };
    const { type, search, filter } = state.Issue;

    let url = `${BASE_URL}/issue?type=${type}&filter=${filter}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    const resp = await authFetch.get(url);
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

export const createIssue = createAsyncThunk<
  IssueSliceType,
  { title: string; description: string; status: string; priority: string; startDate: string; dueDate: string; assignee: any }
>('Issue/createIssue', async (issueData, thunkAPI) => {
  try {
    const resp = await authFetch.post(`${BASE_URL}/issue`, issueData);
    thunkAPI.dispatch(getAllIssues());
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

export const getIssue = createAsyncThunk<IssueSliceType, { id: string }>('Issue/getIssue', async (id, thunkAPI) => {
  try {
    const resp = await authFetch.get(`${BASE_URL}/issue/${id}`);
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

export const updateIssue = createAsyncThunk<
  IssueSliceType,
  { id: string; title: string; description: string; status: string; priority: string; startDate: string; dueDate: string }
>('Issue/updateIssue', async (issueData, thunkAPI) => {
  try {
    const resp = await authFetch.patch(`${BASE_URL}/issue/${issueData.id}`, issueData);
    thunkAPI.dispatch(getAllIssues());
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

export const deleteIssue = createAsyncThunk<IssueSliceType, { id: string }>('Issue/deleteIssue', async (id, thunkAPI) => {
  try {
    const resp = await authFetch.delete(`${BASE_URL}/issue/${id}`);
    thunkAPI.dispatch(getAllIssues());
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

export const getStats = createAsyncThunk<IssueSliceType>('Issue/getStats', async (id, thunkAPI) => {
  try {
    const resp = await authFetch.get(`${BASE_URL}/issue/stats`);
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

const IssueSlice = createSlice({
  name: 'Issue',
  initialState,
  reducers: {
    searchType: (state, { payload }) => {
      state.type = payload ? payload.type : '';
    },
    searchParam: (state, { payload }) => {
      state.search = payload ? payload.searchParam : '';
    },
    searchFilter: (state, { payload }) => {
      state.filter = payload ? payload.searchFilter : '';
    },
  },

  extraReducers: (builder) => {
    builder
      //create issue
      .addCase(createIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIssue.fulfilled, (state, action: PayloadAction<IssueSliceType>) => {
        state.isLoading = false;
        state.showAlert = true;
        state.alertText = 'Issue created successfully!';
        state.alertType = 'success';
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
        state.showAlert = true;
        state.alertText = action.payload as string;
        state.alertType = 'error';
      })

      //get issues
      .addCase(getAllIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllIssues.fulfilled, (state, action: PayloadAction<IssueSliceType>) => {
        state.isLoading = false;
        state.showAlert = true;
        state.alertType = 'success';
        state.issues = action.payload.issues;
      })
      .addCase(getAllIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
        state.showAlert = true;
        state.alertText = action.payload as string;
        state.alertType = 'error';
      })

      //getIssue
      .addCase(getIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIssue.fulfilled, (state, action: PayloadAction<IssueSliceType>) => {
        state.isLoading = false;
        state.showAlert = true;
        state.alertType = 'success';
        state.issue = action.payload.issue;
      })
      .addCase(getIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
        state.showAlert = true;
        state.alertText = action.payload as string;
        state.alertType = 'error';
      })

      //updateIssue
      .addCase(updateIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateIssue.fulfilled, (state, action: PayloadAction<IssueSliceType>) => {
        state.isLoading = false;
        state.showAlert = true;
        state.alertType = 'success';
      })
      .addCase(updateIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
        state.showAlert = true;
        state.alertText = action.payload as string;
        state.alertType = 'error';
      })

      //deleteIssue
      .addCase(deleteIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIssue.fulfilled, (state, action: PayloadAction<IssueSliceType>) => {
        state.isLoading = false;
        state.showAlert = true;
        state.alertText = 'Issue deleted successfully!';
        state.alertType = 'success';
      })
      .addCase(deleteIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
        state.showAlert = true;
        state.alertText = action.payload as string;
        state.alertType = 'error';
      })

      //getStats
      .addCase(getStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStats.fulfilled, (state, action: PayloadAction<IssueSliceType>) => {
        state.isLoading = false;
        state.showAlert = true;
        state.alertType = 'success';
        state.statuses = action.payload.statuses;
        state.priorities = action.payload.priorities;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
        state.showAlert = true;
        state.alertText = action.payload as string;
        state.alertType = 'error';
      });
  },
});

export const { searchType, searchParam, searchFilter } = IssueSlice.actions;
export default IssueSlice.reducer;
