import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getAllUsers();
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch users");
    }
  }
);

export const fetchAllPrompts = createAsyncThunk(
  "admin/fetchAllPrompts",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getAllPrompts();
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch prompts");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    prompts: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearAdminError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPrompts.fulfilled, (state, action) => {
        state.loading = false;
        state.prompts = action.payload;
      })
      .addCase(fetchAllPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearAdminError } = adminSlice.actions;
export const selectAdminUsers = (state: any) => state.admin.users;
export const selectAdminPrompts = (state: any) => state.admin.prompts;
export const selectAdminLoading = (state: any) => state.admin.loading;
export const selectAdminError = (state: any) => state.admin.error;
export default adminSlice.reducer;
