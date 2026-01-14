import React, {useState} from 'react';
import {
    Box, Typography, Grid, Paper, Button, Card, CardContent,
    CardActions, Chip, Stack, TextField, Dialog, DialogTitle, DialogContent,
    DialogActions, List, ListItem, ListItemText, Divider, LinearProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConstructionIcon from '@mui/icons-material/Construction';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function SampleSessionManagementPage() {
    const [open, setOpen] = useState(false);
    const [sessions, setSessions] = useState([
        {id: "s1", title: "The Kessel Run: Part 2", date: "2026-01-14", status: "PLANNED", players: 4},
        {id: "s0", title: "Escape from Mos Eisley", date: "2026-01-07", status: "COMPLETED", players: 5},
        {
            id: "s1",
            title: "The Kessel Run: Part 6",
            status: "PLANNED",
            prepProgress: 100,
            date: "2026-01-21"
        }
    ]);

    const handleCreateSession = () => {
        // Logic to POST to your Spring Boot /sessions endpoint
        setOpen(false);
    };

    return (
        <Box sx={{p: 4, bgcolor: '#0a0a0a', minHeight: '100vh', color: 'white'}}>
            <Stack direction="row" justifyContent="space-between" sx={{mb: 4}}>
                <Typography variant="h4" fontWeight="900">Session Manager</Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={() => setOpen(true)}>
                    Plan New Session
                </Button>
            </Stack>

            <Grid container spacing={3}>
                {/* ACTIVE/UPCOMING SESSIONS */}
                <Grid size={{xs: 12}}>
                    <Typography variant="h6" sx={{mb: 2, color: 'primary.main'}}>Upcoming Adventures</Typography>
                    <Grid container spacing={3}>
                        {sessions.filter(s => s.status === 'PLANNED').map(session => (
                            <Grid size={{ xs: 12, md: 4 }} key={session.id}>
                                <Card sx={{
                                    bgcolor: '#1a1a1a',
                                    color: 'white',
                                    borderRadius: 3,
                                    border: session.status === 'DRAFT' ? '1px dashed #555' : '1px solid #333'
                                }}>
                                    <CardContent>
                                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                            <Typography variant="h6">{session.title}</Typography>
                                            <Chip
                                                label={session.status}
                                                size="small"
                                                // Blue for Draft, Green for Ready (Planned)
                                                color={session.status === 'DRAFT' ? 'info' : 'success'}
                                            />
                                        </Stack>

                                        <Typography variant="caption" color="gray">Date: {session.date}</Typography>

                                        {/* PREP PROGRESS INDICATOR */}
                                        <Box sx={{ mt: 3 }}>
                                            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                                                <Typography variant="caption" color="gray">Prep Progress</Typography>
                                                <Typography variant="caption" color="gray">{session.prepProgress}%</Typography>
                                            </Stack>
                                            <LinearProgress
                                                variant="determinate"
                                                value={session.prepProgress}
                                                sx={{ height: 6, borderRadius: 3, bgcolor: '#333' }}
                                            />
                                        </Box>
                                    </CardContent>

                                    <CardActions sx={{ p: 2, pt: 0 }}>
                                        {session.status === 'DRAFT' ? (
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<ConstructionIcon />}
                                                sx={{ color: 'info.main', borderColor: 'info.main' }}
                                            >
                                                Continue Prep
                                            </Button>
                                        ) : (
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="success"
                                                startIcon={<PlayArrowIcon />}
                                            >
                                                Start Session
                                            </Button>
                                        )}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* HISTORICAL SESSIONS */}
                <Grid size={{xs: 12}} sx={{mt: 4}}>
                    <Paper sx={{bgcolor: '#1a1a1a', p: 0, borderRadius: 3, overflow: 'hidden'}}>
                        <Box sx={{p: 2, bgcolor: '#222'}}>
                            <Typography variant="h6">Session History</Typography>
                        </Box>
                        <List>
                            {sessions.filter(s => s.status === 'COMPLETED').map((session, index) => (
                                <React.Fragment key={session.id}>
                                    <ListItem secondaryAction={<Button size="small">View Logs</Button>}>
                                        <ListItemText
                                            primary={session.title}
                                            secondary={`${session.date} • ${session.players} Players Attended`}
                                            secondaryTypographyProps={{color: 'gray'}}
                                        />
                                    </ListItem>
                                    {index < sessions.length - 1 && <Divider sx={{bgcolor: '#333'}}/>}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            {/* CREATE SESSION MODAL */}
            <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{sx: {bgcolor: '#1a1a1a', color: 'white'}}}>
                <DialogTitle>Plan New Session</DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{mt: 1, minWidth: 400}}>
                        <TextField fullWidth label="Session Title" variant="filled"
                                   sx={{bgcolor: '#333', borderRadius: 1}} InputLabelProps={{style: {color: 'gray'}}}
                                   inputProps={{style: {color: 'white'}}}/>
                        <TextField fullWidth label="Target Date" type="date" variant="filled" defaultValue="2026-01-14"
                                   sx={{bgcolor: '#333', borderRadius: 1}}
                                   InputLabelProps={{shrink: true, style: {color: 'gray'}}}
                                   inputProps={{style: {color: 'white'}}}/>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{p: 3}}>
                    <Button onClick={() => setOpen(false)} sx={{color: 'gray'}}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreateSession}>Save Plan</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}