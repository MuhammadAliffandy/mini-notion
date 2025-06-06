import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userId",
    initialState: {
        value: "",
    },
    reducers: {
        setUserId: (state, action) => {
            const userId = action.payload;
            state.value = userId;
        },
    },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
