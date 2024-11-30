import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAssignmentAction } from '../../redux/assignments/assignmentsActions';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

const AssignmentUpload = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.assignments);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);
        

        try {
            await dispatch(createAssignmentAction(formData));
            alert("Assignment created successfully");
        } catch (error) {
            console.error("Error during assignment creation:", error); // Add logging here
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>Upload Assignment</Typography>
            <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Description"
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                required
            />
            <Button
                variant="contained"
                component="label"
                sx={{ mt: 2 }}
            >
                Choose File
                <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    required
                />
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={Boolean(loading)}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Upload Assignment"}
            </Button>
            {error && <Typography color="error" sx={{ mt: 2 }}>Error: {error}</Typography>}
        </Box>
    );
};

export default AssignmentUpload;
