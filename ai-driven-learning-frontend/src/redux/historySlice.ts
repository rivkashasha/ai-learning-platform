import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const fetchUserHistory = createAsyncThunk(
  "history/fetchUserHistory",
  async (customId: string, { rejectWithValue }) => {
    try {
      return await api.getUserHistory(customId);
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch history");
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    loading: false,
    error: null as string | null,
    items: [] as any[]
  },
  reducers: {
    clearHistory(state) {
      state.items = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearHistory } = historySlice.actions;
export const selectHistory = (state: any) => state.history.items;
export const selectHistoryLoading = (state: any) => state.history.loading;
export const selectHistoryError = (state: any) => state.history.error;
export default historySlice.reducer;
