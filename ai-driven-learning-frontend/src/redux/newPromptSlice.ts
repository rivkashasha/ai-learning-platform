import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const submitPrompt = createAsyncThunk(
  "newPrompt/submitPrompt",
  async (
    data: { customId: string; categoryName: string; subCategoryName: string; promptText: string },
    { rejectWithValue }
  ) => {
    try {
      return await api.submitPrompt(data);
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to generate lesson");
    }
  }
);

const newPromptSlice = createSlice({
  name: "newPrompt",
  initialState: {
    loading: false,
    error: null as string | null,
    lesson: null as any
  },
  reducers: {
    clearLesson(state) {
      state.lesson = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPrompt.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lesson = null;
      })
      .addCase(submitPrompt.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = action.payload;
      })
      .addCase(submitPrompt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearLesson } = newPromptSlice.actions;
export const selectLesson = (state: any) => state.newPrompt.lesson;
export const selectPromptLoading = (state: any) => state.newPrompt.loading;
export const selectPromptError = (state: any) => state.newPrompt.error;
export default newPromptSlice.reducer;
