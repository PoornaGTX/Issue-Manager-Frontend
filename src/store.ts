import { configureStore } from '@reduxjs/toolkit';
import AuthSliceReducer from './features/user/AuthSlice';
import IssueSliceReducer from './features/issue/IssueSlice';
import UsersliceReducer from './features/user/UsersSlice';

export const store = configureStore({
  reducer: {
    Auth: AuthSliceReducer,
    Issue: IssueSliceReducer,
    Users: UsersliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
