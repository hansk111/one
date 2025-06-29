import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import { busApi } from "./bus/busApi";
import busReducer from "./bus/busSlice";
import { movieApi } from "./movie/movieApi";
import { apiSlice } from "./services/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    bus: busReducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [busApi.reducerPath]: busApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      movieApi.middleware,
      busApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

const rootReducer = combineReducers({
  auth: authReducer,
  bus: busReducer,
  [movieApi.reducerPath]: movieApi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [busApi.reducerPath]: busApi.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
