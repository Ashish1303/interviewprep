import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from './topicsSlice';

export const store = configureStore({
  reducer: { topics: topicsReducer },
});

store.subscribe(() => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(
      'interview-prep-progress',
      JSON.stringify(store.getState().topics.completedBySection),
    );
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
