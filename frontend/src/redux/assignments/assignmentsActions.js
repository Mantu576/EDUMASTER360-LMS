import axios from 'axios';
import { getRequest, getSuccess, getFailed } from '../assignments/assignmentSlice';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

// Create a new assignment (for teachers)
export const createAssignmentAction = (formData) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const { data } = await axios.post(`${baseURL}/Teacher/AssignmentCreate`, formData, config);
        dispatch(getSuccess(data));
    } catch (error) {
        dispatch(getFailed(error.response ? error.response.data.message : error.message));
    }

};

// Fetch assignments (for students)
export const getAssignments = () => async (dispatch) => {
    dispatch(getRequest());
    try {
        const { data } = await axios.get(`${baseURL}/Assignments`);
        dispatch(getSuccess(data));
    } catch (error) {
        dispatch(getFailed(error.response ? error.response.data.message : error.message));
    }
};

// Submit student's answer (for students)
export const submitAnswerAction = (formData) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const { data } = await axios.post(`${baseURL}/Assignments/SubmitAnswer`, formData, config);
        dispatch(getSuccess(data));
    } catch (error) {
        dispatch(getFailed(error.response ? error.response.data.message : error.message));
    }
};
