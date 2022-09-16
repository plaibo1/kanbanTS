import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./todo-reducer";
import scramReducer from "./scram-reducer";

import storage from 'redux-persist/lib/storage'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['scramApp']
}

const rootReducer = combineReducers({
  todoPage: todoReducer,
  scramApp: scramReducer
})

const ScramAppPersistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: ScramAppPersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
