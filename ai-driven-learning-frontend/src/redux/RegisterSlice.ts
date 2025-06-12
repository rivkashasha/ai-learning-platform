import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async ({ id, name, phone }: { id: string; name: string; phone: string }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5089/api/User/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customId: id, name, phone })
      });
      if (!response.ok) {
        const errorMsg = await response.text();
        return thunkAPI.rejectWithValue(errorMsg || 'Registration failed.');
      }
      return await response.json();
    } catch (err) {
      return thunkAPI.rejectWithValue('Network error.');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    error: '',
    success: false,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = '';
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
        state.error = '';
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
