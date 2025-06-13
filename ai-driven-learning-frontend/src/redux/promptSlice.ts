import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

type LessonType = string | { response: string; [key: string]: any };
type HistoryItemType = {
    id?: string | number;
    categoryName?: string;
    category_id?: string;
    subCategoryName?: string;
    sub_category_id?: string;
    promptText?: string;
    response?: string;
    createdAt?: string;
    [key: string]: any;
};

interface PromptState {
    prompt: string;
    lesson: LessonType | null;
    loading: boolean;
    error: string | null;
    showPromptForm: boolean;
    showHistory: boolean;
    history: HistoryItemType[] | null;
}

const initialState: PromptState = {
    prompt: "",
    lesson: null,
    loading: false,
    error: null,
    showPromptForm: true,
    showHistory: false,
    history: null,
};

export const fetchLesson = createAsyncThunk(
    "prompt/fetchLesson",
    async (
        { userId, category, subCategory, prompt }: { userId: string; category: string; subCategory: string; prompt: string },
        { rejectWithValue }
    ) => {
        try {
            return await api.submitPrompt({
                customId: userId,
                categoryName: category,
                subCategoryName: subCategory,
                promptText: prompt
            });
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to generate lesson.");
        }
    }
);

export const fetchHistory = createAsyncThunk(
    "prompt/fetchHistory",
    async (userId: string, { rejectWithValue }) => {
        try {
            return await api.getUserHistory(userId);
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to fetch history");
        }
    }
);

const promptSlice = createSlice({
    name: "prompt",
    initialState,
    reducers: {
        setPrompt(state, action: any) {
            state.prompt = action.payload;
        },
        setShowPromptForm(state, action: any) {
            state.showPromptForm = action.payload;
        },
        setShowHistory(state, action: any) {
            state.showHistory = action.payload;
        },
        clearLesson(state) {
            state.lesson = null;
        },
        clearError(state) {
            state.error = null;
        },
        clearHistory(state) {
            state.history = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.lesson = null;
            })
            .addCase(fetchLesson.fulfilled, (state, action) => {
                state.loading = false;
                state.lesson = action.payload;
                state.error = null;
                if (action.meta && action.meta.arg) {
                    const { category, subCategory, prompt, userId } = action.meta.arg;
                    state.history = [
                        {
                            id: Date.now(),
                            category_id: category,
                            sub_category_id: subCategory,
                            promptText: prompt,
                            response: typeof action.payload === "string" ? action.payload : action.payload?.response,
                            createdAt: new Date().toISOString(),
                            userId
                        },
                        ...(state.history || [])
                    ];
                }
            })
            .addCase(fetchLesson.rejected, (state, action) => {
                state.loading = false;
                state.lesson = null;
                state.error = action.payload as string || "Sorry, there was a problem generating your lesson. Please try again later.";
            })
            .addCase(fetchHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload;
            })
            .addCase(fetchHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || action.error.message || "Failed to fetch history";
            });
    },
});

export const selectPrompt = (state: any) => state.prompt.prompt;
export const selectLesson = (state: any) => state.prompt.lesson;
export const selectLoading = (state: any) => state.prompt.loading;
export const selectError = (state: any) => state.prompt.error;
export const selectShowPromptForm = (state: any) => state.prompt.showPromptForm;
export const selectShowHistory = (state: any) => state.prompt.showHistory;
export const selectHistory = (state: any) => state.prompt.history;

export const {
    setPrompt,
    setShowPromptForm,
    setShowHistory,
    clearLesson,
    clearError,
    clearHistory
} = promptSlice.actions;

export default promptSlice.reducer;
