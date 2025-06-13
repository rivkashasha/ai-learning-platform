import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import historyReducer from './historySlice';
import newPromptReducer from './newPromptSlice';
import registerReducer from './registerSlice';
import loginReducer from './loginSlice';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    history: historyReducer,
    newPrompt: newPromptReducer,
    register: registerReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
