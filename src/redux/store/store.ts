import { configureStore } from "@reduxjs/toolkit";
import { recipe_slice_api } from "../api/recipe_slice_api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [recipe_slice_api.reducerPath]: recipe_slice_api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipe_slice_api.middleware),
});

setupListeners(store.dispatch);
