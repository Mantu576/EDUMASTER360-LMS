import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    assignments: [],
    loading: false,
    error: null,
};

const assignmentSlice = createSlice({
    name: 'assignments',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.loading = false;
            state.assignments = action.payload;
        },
        getFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { getRequest, getSuccess, getFailed } = assignmentSlice.actions;
export const assignmentReducer= assignmentSlice.reducer;
