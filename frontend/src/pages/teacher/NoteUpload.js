import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNoteAction } from '../../redux/notes/notesActions';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';

const NoteUpload = ({ teacherId }) => {
    const dispatch = useDispatch();
    const { loading, error, successMessage } = useSelector((state) => state.notes);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        // if (!title || !teacherId) {
        //     alert('Please enter a title and ensure the teacher ID is provided.');
        //     return;
        // }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        //formData.append('teacherId', teacherId);
        if (selectedFile) {
            formData.append('file', selectedFile);
        }
        try {
            await dispatch(createNoteAction(formData));
            alert("Note uploaded successfully");
        } catch (error) {
            console.error("Error during note uploading:", error); // Add logging here
        }
        
        
        //dispatch(createNoteAction(formData));
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom>Upload Note</Typography>

            {successMessage && (
                <Typography color="success.main" sx={{ mb: 2 }}>
                    {successMessage}
                </Typography>
            )}
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    Error: {error}
                </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Content"
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    type="file"
                    onChange={handleFileChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    inputProps={{ style: { padding: '10px' } }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} /> : 'Upload Note'}
                </Button>
            </Box>
        </Box>
    );
};

export default NoteUpload;
