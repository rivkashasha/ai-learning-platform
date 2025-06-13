import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const fetchCategories = createAsyncThunk(
  "dashboard/fetchCategories",
  async () => await api.getCategories()
);

export const fetchSubCategories = createAsyncThunk(
  "dashboard/fetchSubCategories",
  async (categoryName: string) => await api.getSubCategories(categoryName)
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    categories: [],
    subCategories: [],
    selectedCategory: "",
    selectedSubCategory: "",
    loading: false,
    error: "",
  },
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
      state.selectedSubCategory = "";
    },
    setSelectedSubCategory(state, action) {
      state.selectedSubCategory = action.payload;
    },
    clearError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load categories.";
      })
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.subCategories = [];
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load subcategories.";
      });
  },
});

export const {
  setSelectedCategory,
  setSelectedSubCategory,
  clearError,
} = dashboardSlice.actions;

export const selectCategories = (state: any) => state.dashboard.categories;
export const selectSubCategories = (state: any) => state.dashboard.subCategories;
export const selectSelectedCategory = (state: any) => state.dashboard.selectedCategory;
export const selectSelectedSubCategory = (state: any) => state.dashboard.selectedSubCategory;
export const selectDashboardLoading = (state: any) => state.dashboard.loading;
export const selectDashboardError = (state: any) => state.dashboard.error;

export default dashboardSlice.reducer;
