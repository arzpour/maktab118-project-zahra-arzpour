import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./features/filter.slice";
import { productReducer } from "./features/product.slice";
import storage from "redux-persist/es/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persist = persistReducer(persistConfig, productReducer);

const rootReducer = combineReducers({
  filter: filterReducer,
  product: persist,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
