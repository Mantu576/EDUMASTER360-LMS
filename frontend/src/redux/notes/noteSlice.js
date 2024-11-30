import { createSlice } from '@reduxjs/toolkit';

const noteSlice = createSlice({
    name: 'notes',
    initialState: { notes: [], loading: false, error: null },
    reducers: {
        noteRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        noteSuccess: (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.notes = action.payload; // For fetch actions
            }
        },
        noteFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { noteRequest, noteSuccess, noteFailed } = noteSlice.actions;
export const noteReducer= noteSlice.reducer;
