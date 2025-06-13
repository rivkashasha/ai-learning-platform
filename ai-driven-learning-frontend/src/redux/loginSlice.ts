import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (userData: { username: string; password: string }) => await api.login(userData)
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: "",
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    clearLoginError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed.";
      });
  },
});

export const { logout, clearLoginError } = loginSlice.actions;
export const selectLoginLoading = (state: any) => state.login.loading;
export const selectLoginError = (state: any) => state.login.error;
export const selectIsAuthenticated = (state: any) => state.login.isAuthenticated;
export const selectUser = (state: any) => state.login.user;

export default loginSlice.reducer;
