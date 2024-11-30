import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes, downloadNoteAction } from '../../redux/notes/notesActions';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

const NoteList = () => {
    const dispatch = useDispatch();
    const { notes, loading, error } = useSelector((state) => state.notes);

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch]);

    const handleDownload = (noteId) => {
        dispatch(downloadNoteAction(noteId));
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom>Notes</Typography>
            {notes && notes.length > 0 ? (
                notes.map((note) => (
                    <Box key={note._id} sx={{ padding: 2, marginBottom: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                        <Typography variant="h6">{note.title}</Typography>
                        <Typography variant="body1">{note.content}</Typography>
                        <Typography variant="body2" color="textSecondary">Uploaded: {new Date(note.createdAt).toLocaleString()}</Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ mt: 1 }}
                            onClick={() => handleDownload(note._id)}
                        >
                            Download Note
                        </Button>
                    </Box>
                ))
            ) : (
                <Typography>No notes available</Typography>
            )}
        </Box>
    );
};

export default NoteList;
