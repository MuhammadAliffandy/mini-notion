import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
    name: "note",
    initialState: {
        value: "",
    },
    reducers: {
        setNoteId: (state, action) => {
            const noteId = action.payload;
            state.value = noteId;
        },
    },
});

export const { setNoteId } = noteSlice.actions;
export default noteSlice.reducer;
