import axios from 'axios';
import { noteRequest, noteSuccess, noteFailed } from './noteSlice';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

// Create a new note (for teachers)
export const createNoteAction = (formData) => async (dispatch) => {
    dispatch(noteRequest());
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const { data } = await axios.post(`${baseURL}/Teacher/NoteCreate`, formData, config);
        dispatch(noteSuccess(data));
    } catch (error) {
        dispatch(noteFailed(error.response ? error.response.data.message : error.message));
    }
};

// Fetch notes (for students)
export const getNotes = () => async (dispatch) => {
    dispatch(noteRequest());
    try {
        const { data } = await axios.get(`${baseURL}/Notes`);
        dispatch(noteSuccess(data));
    } catch (error) {
        dispatch(noteFailed(error.response ? error.response.data.message : error.message));
    }
};

// Download a specific note
export const downloadNoteAction = (noteId) => async (dispatch) => {
    dispatch(noteRequest());
    try {
        const response = await axios.get(`${baseURL}/Notes/${noteId}/download`, {
            responseType: 'blob', // Needed to handle the binary data for file downloads
        });
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', 'note.pdf'); // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        dispatch(noteSuccess());
    } catch (error) {
        dispatch(noteFailed(error.response ? error.response.data.message : error.message));
    }
};
