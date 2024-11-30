import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAssignmentAction, submitAnswerAction, getAssignments } from '../../redux/assignments/assignmentsActions';
import { Box, Typography, Button, CircularProgress, TextField } from '@mui/material';

const AssignmentList = ({ studentId }) => {
    const dispatch = useDispatch();
    const { assignments, loading, error } = useSelector((state) => state.assignments);
    const [selectedFile, setSelectedFile] = useState(null);
    const [assignmentId, setAssignmentId] = useState('');

    useEffect(() => {
        dispatch(getAssignments());
    }, [dispatch]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        if (!selectedFile || !assignmentId) {
            alert('Please select a file and an assignment.');
            return;
        }
        const formData = new FormData();
        formData.append('answerFile', selectedFile);
        formData.append('assignmentId', assignmentId);
        formData.append('studentId', studentId);
        dispatch(submitAnswerAction(formData));
    };

    const handleDownload = (filePath) => {
        window.open(filePath, '_blank');
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom>Assignments</Typography>
            {assignments && assignments.length > 0 ? (
                assignments.map((assignment) => (
                    <Box key={assignment._id} sx={{ padding: 2, marginBottom: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                        <Typography variant="h6">{assignment.title}</Typography>
                        <Typography variant="body1">{assignment.description}</Typography>
                        <Typography variant="body2" color="textSecondary">Due Date: {new Date(assignment.dueDate).toLocaleString()}</Typography>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            sx={{ mt: 1 }} 
                            onClick={() => handleDownload(assignment.filePath)}
                        >
                            Download Assignment
                        </Button>

                        <Box component="form" onSubmit={handleSubmitAnswer} sx={{ mt: 2 }}>
                            <TextField
                                type="file"
                                onChange={handleFileChange}
                                required
                                fullWidth
                                sx={{ mb: 2 }}
                                inputProps={{ style: { padding: '10px' } }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => setAssignmentId(assignment._id)}
                                sx={{ mt: 1 }}
                            >
                                Submit Answer
                            </Button>
                        </Box>
                    </Box>
                ))
            ) : (
                <Typography>No assignments available</Typography>
            )}
        </Box>
    );
};

export default AssignmentList;
