import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData: { username: string; password: string }) => await api.register(userData)
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    error: '',
    success: false,
  },
  reducers: {
    clearRegisterError(state) {
      state.error = '';
    },
    clearRegisterSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed.';
      });
  },
});

export const { clearRegisterError, clearRegisterSuccess } = registerSlice.actions;
export const selectRegisterLoading = (state: any) => state.register.loading;
export const selectRegisterError = (state: any) => state.register.error;
export const selectRegisterSuccess = (state: any) => state.register.success;

export default registerSlice.reducer;
