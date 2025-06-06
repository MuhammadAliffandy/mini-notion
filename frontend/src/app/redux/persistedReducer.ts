import { persistReducer } from "redux-persist";
import storage from "./storage";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import userReducer from "./slices/userSlices";
import noteReducer from "./slices/noteSlices";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    note: noteReducer
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
