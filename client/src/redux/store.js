import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import videoReducer from './videoSlice';
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
import storage from 'redux-persist/lib/storage'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const rootreducer = combineReducers( {user : userReducer,video : videoReducer})
  const persistedReducer = persistReducer(persistConfig,rootreducer)
const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export default store;

// storage 
//  user 
//  currentUser, loading,error 